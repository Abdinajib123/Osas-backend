import Payment from '../models/peymentModel.js';
import StudentAdmission from '../models/sutudentAdmissionModel.js';
import { customAlphabet } from 'nanoid';

const generateTransactionId = () => {
  const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);
  return `txn_${nanoid()}`; // e.g. txn_5G8K2D
};

export const getAllPayments = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = '-createdAt', search = '' } = req.query;
    const query = {};
    if (search) {
      query.$or = [
        { 'personalInfo.fullname': { $regex: search, $options: 'i' } },
        { 'contactInfo.email': { $regex: search, $options: 'i' } },
        { 'contactInfo.phone': { $regex: search, $options: 'i' } },
        { 'paymentInfo.transaction': { $regex: search, $options: 'i' } }
      ];
    }
    
    const payments = await Payment.find(query)
      .populate('studentAdmissionId', 'fullname email phone')
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean();
      
    const total = await Payment.countDocuments(query);
    res.status(200).json({
      success: true,
      data: {
        payments,
        pagination: {
          total,
          page: Number(page),
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('studentAdmissionId', 'fullname email phone')
      .lean();
      
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json({
      success: true,
      data: payment
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPayment = async (req, res) => {
  try {
    const {
      studentAdmissionId,
      personalInfo,
      contactInfo,
      educationalBackground,
      academicInfo,
      paymentInfo
    } = req.body;

    // Validate required fields
    if (!studentAdmissionId || !personalInfo || !contactInfo || !educationalBackground || !academicInfo || !paymentInfo) {
      return res.status(400).json({ 
        success: false,
        message: 'Missing required fields for student admission payment' 
      });
    }

    // Check if student admission exists
    const studentAdmission = await StudentAdmission.findById(studentAdmissionId);
    if (!studentAdmission) {
      return res.status(404).json({ 
        success: false,
        message: 'Student admission not found' 
      });
    }

    // Check if payment already exists for this admission
    const existingPayment = await Payment.findOne({ studentAdmissionId });
    if (existingPayment) {
      return res.status(400).json({ 
        success: false,
        message: 'Payment already exists for this student admission' 
      });
    }

    const newPayment = new Payment({
      studentAdmissionId,
      personalInfo,
      contactInfo,
      educationalBackground,
      academicInfo,
      paymentInfo: {
        ...paymentInfo,
        transaction: generateTransactionId(),
        isPaid: paymentInfo.isPaid || false,
        paymentStatus: paymentInfo.paymentStatus || 'pending'
      },
      applicationStatus: 'submitted',
      stepsCompleted: {
        step1_personal: true,
        step2_contact: true,
        step3_educational: true,
        step4_academic: true,
        step5_payment: true
      }
    });

    const savedPayment = await newPayment.save();

    // Update student admission with payment reference
    studentAdmission.paymentId = savedPayment._id;
    await studentAdmission.save();

    res.status(201).json({
      success: true,
      message: 'Student admission payment created successfully',
      data: savedPayment
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

export const updatePayment = async (req, res) => {
  try {
    const { 
      personalInfo, 
      contactInfo, 
      educationalBackground, 
      academicInfo, 
      paymentInfo,
      applicationStatus 
    } = req.body;

    const updateFields = {};
    
    if (personalInfo) updateFields.personalInfo = personalInfo;
    if (contactInfo) updateFields.contactInfo = contactInfo;
    if (educationalBackground) updateFields.educationalBackground = educationalBackground;
    if (academicInfo) updateFields.academicInfo = academicInfo;
    if (paymentInfo) updateFields.paymentInfo = paymentInfo;
    if (applicationStatus) updateFields.applicationStatus = applicationStatus;

    const updatedPayment = await Payment.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
    ).populate('studentAdmissionId', 'fullname email phone');

    if (!updatedPayment) {
      return res.status(404).json({ 
        success: false,
        message: 'Payment not found' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Payment updated successfully',
      data: updatedPayment
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

export const deletePayment = async (req, res) => {
  try {
    const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
    if (!deletedPayment) {
      return res.status(404).json({ 
        success: false,
        message: 'Payment not found' 
      });
    }
    
    // Remove payment reference from student admission
    await StudentAdmission.findByIdAndUpdate(
      deletedPayment.studentAdmissionId,
      { $unset: { paymentId: 1 } }
    );
    
    res.status(200).json({ 
      success: true,
      message: 'Payment deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};
import StudentAdmission from "../models/sutudentAdmissionModel.js";

// Get all student admissions
export const getStudentAdmissions = async (req, res) => {
  try {
    const admissions = await StudentAdmission.find();
    res.status(200).json({ success: true, data: admissions });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch student admissions",
      error: e.message,
    });
  }
};

// Get a specific student admission by ID
export const getStudentAdmissionById = async (req, res) => {
  try {
    const admission = await StudentAdmission.findById(req.params.id);
    if (admission) {
      res.status(200).json({ success: true, data: admission });
    } else {
      res.status(404).json({ success: false, message: "Student admission not found" });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch student admission",
      error: e.message,
    });
  }
};

// Create a new student admission
export const createStudentAdmission = async (req, res) => {
  try {
    const {
      fullname,
      address,
      mothername,
      place_of_birth,
      phone,
      email,
      emergency_phone,
      school,
      graduation_year,
      grade,
      certificate_or_exam_result,
      faculty,
      department,
      mode,
      entry_date,
      payment,
    } = req.body;

    if (
      !fullname ||
      !address ||
      !mothername ||
      !place_of_birth ||
      !phone ||
      !email ||
      !emergency_phone ||
      !school ||
      !graduation_year ||
      !grade ||
      !certificate_or_exam_result ||
      !faculty ||
      !department ||
      !mode ||
      !entry_date ||
      payment === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    const createdAdmission = await StudentAdmission.create({
      fullname,
      address,
      mothername,
      place_of_birth,
      phone,
      email,
      emergency_phone,
      school,
      graduation_year,
      grade,
      certificate_or_exam_result,
      faculty,
      department,
      mode,
      entry_date,
      payment,
    });

    res.status(201).json({
      success: true,
      message: "Student admission created successfully!",
      data: createdAdmission,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Failed to create student admission",
      error: e.message,
    });
  }
};

// Update an existing student admission
export const updateStudentAdmission = async (req, res) => {
  try {
    const admission = await StudentAdmission.findById(req.params.id);

    if (admission) {
      Object.assign(admission, req.body); // updates fields dynamically
      const updatedAdmission = await admission.save();
      res.status(200).json({
        success: true,
        message: "Student admission updated successfully!",
        data: updatedAdmission,
      });
    } else {
      res.status(404).json({ success: false, message: "Student admission not found" });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Failed to update student admission",
      error: e.message,
    });
  }
};

// Delete a student admission
export const deleteStudentAdmission = async (req, res) => {
  try {
    const admission = await StudentAdmission.findByIdAndDelete(req.params.id);
    if (admission) {
      res.status(200).json({
        success: true,
        message: "Student admission deleted successfully!",
        data: admission,
      });
    } else {
      res.status(404).json({ success: false, message: "Student admission not found" });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Failed to delete student admission",
      error: e.message,
    });
  }
};

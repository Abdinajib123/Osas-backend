import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  // Reference to student admission
  studentAdmissionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudentAdmission',
    required: true
  },
  
  // Step 1: Personal Information
  personalInfo: {
    fullname: {
      type: String,
      required: true,
      trim: true
    },
    address: {
      type: String,
      required: true
    },
    mothername: {
      type: String,
      required: true
    },
    place_of_birth: {
      type: String,
      required: true
    }
  },
  
  // Step 2: Contact Information
  contactInfo: {
    phone: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    emergency_phone: {
      type: String,
      required: true
    }
  },
  
  // Step 3: Educational Background
  educationalBackground: {
    school: {
      type: String,
      required: true
    },
    graduation_year: {
      type: Number,
      required: true
    },
    grade: {
      type: String,
      required: true
    },
    certificate_or_exam_result: {
      type: String,
      required: true
    },
    fileName: String,
    originalFileName: String
  },
  
  // Step 4: Academic Information
  academicInfo: {
    faculty: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    mode: {
      type: String,
      enum: ["Full-time", "Part-time"],
      required: true
    },
    entry_date: {
      type: Date,
      required: true
    }
  },
  
  // Step 5: Payment Information
  paymentInfo: {
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    paymentDate: {
      type: Date,
      default: Date.now
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ['CASH', 'EVCPLUS', 'BANK_TRANSFER', 'ONLINE']
    },
    transaction: {
      type: String,
      required: true
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
      default: 'pending'
    }
  },
  
  // Application Status
  applicationStatus: {
    type: String,
    enum: ['draft', 'submitted', 'under_review', 'approved', 'rejected'],
    default: 'draft'
  },
  
  // Completion tracking for each step
  stepsCompleted: {
    step1_personal: { type: Boolean, default: false },
    step2_contact: { type: Boolean, default: false },
    step3_educational: { type: Boolean, default: false },
    step4_academic: { type: Boolean, default: false },
    step5_payment: { type: Boolean, default: false }
  }
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
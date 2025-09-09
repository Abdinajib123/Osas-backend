import mongoose from "mongoose";

const studentAdmissionSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    mothername: {
      type: String,
      required: true,
    },
    place_of_birth: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    emergency_phone: {
      type: String,
      required: true,
    },
    school: {
      type: String,
      required: true,
    },
    graduation_year: {
      type: Number,
      required: true,
    },
    grade: {
      type: String,
      required: true,
    },
    certificate_or_exam_result: {
      type: String,
      required: true,
    },
    faculty: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      enum: ["Full-time", "Part-time", "Distance"], // example modes
      required: true,
    },
    entry_date: {
      type: Date,
      required: true,
    },
    payment: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

const StudentAdmission = mongoose.model("StudentAdmission", studentAdmissionSchema);

export default StudentAdmission;

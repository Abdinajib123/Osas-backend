import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    dept_name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculties", // reference to Faculties model
      required: true,
    },
  },
  { timestamps: true }
);

const Department = mongoose.model("Department", departmentSchema);

export default Department;

// controllers/departmentController.js
import mongoose from "mongoose";
import Department from "../models/departmentModel.js";
import Faculties from "../models/fucultiesModel.js";

// Get all departments (with faculty details)
export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find().populate("faculty");
    res.status(200).json({ success: true, data: departments });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch departments",
      error: e.message,
    });
  }
};

// Get one department by ID (with faculty details)
export const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id).populate("faculty");
    if (!department) {
      return res.status(404).json({ success: false, message: "Department not found" });
    }
    res.status(200).json({ success: true, data: department });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch department",
      error: e.message,
    });
  }
};

// Create a new department
export const createDepartment = async (req, res) => {
  try {
    const { dept_name, faculty } = req.body;

    if (!dept_name || !faculty) {
      return res.status(400).json({
        success: false,
        message: "dept_name and faculty are required!",
      });
    }

    // Validate faculty ObjectId
    if (!mongoose.Types.ObjectId.isValid(faculty)) {
      return res.status(400).json({ success: false, message: "Invalid faculty ID" });
    }

    // Ensure the referenced faculty exists
    const facultyDoc = await Faculties.findById(faculty);
    if (!facultyDoc) {
      return res.status(404).json({ success: false, message: "Faculty not found" });
    }

    const createdDepartment = await Department.create({ dept_name, faculty });

    res.status(201).json({
      success: true,
      message: "Department created successfully!",
      data: await createdDepartment.populate("faculty"),
    });
  } catch (e) {
    // Handle duplicate key error for unique dept_name
    if (e.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Department name already exists",
        error: e.message,
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to create department",
      error: e.message,
    });
  }
};

// Update an existing department
export const updateDepartment = async (req, res) => {
  try {
    const { dept_name, faculty } = req.body;

    // If faculty provided, validate it and ensure it exists
    if (faculty) {
      if (!mongoose.Types.ObjectId.isValid(faculty)) {
        return res.status(400).json({ success: false, message: "Invalid faculty ID" });
      }
      const facultyDoc = await Faculties.findById(faculty);
      if (!facultyDoc) {
        return res.status(404).json({ success: false, message: "Faculty not found" });
      }
    }

    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ success: false, message: "Department not found" });
    }

    if (dept_name !== undefined) department.dept_name = dept_name;
    if (faculty !== undefined) department.faculty = faculty;

    const updatedDepartment = await department.save();

    res.status(200).json({
      success: true,
      message: "Department updated successfully!",
      data: await updatedDepartment.populate("faculty"),
    });
  } catch (e) {
    if (e.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Department name already exists",
        error: e.message,
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to update department",
      error: e.message,
    });
  }
};

// Delete a department
export const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) {
      return res.status(404).json({ success: false, message: "Department not found" });
    }
    res.status(200).json({
      success: true,
      message: "Department deleted successfully!",
      data: department,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Failed to delete department",
      error: e.message,
    });
  }
};

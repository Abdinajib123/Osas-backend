import Faculties from "../models/fucultiesModel.js"; 

// Get all faculties
export const getFaculties = async (req, res) => {
  try {
    const faculties = await Faculties.find();
    res.status(200).json({ success: true, data: faculties });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch faculties",
      error: e.message,
    });
  }
};

// Get a specific faculty by ID
export const getFacultyById = async (req, res) => {
  try {
    const faculty = await Faculties.findById(req.params.id);
    if (faculty) {
      res.status(200).json({ success: true, data: faculty });
    } else {
      res.status(404).json({ success: false, message: "Faculty not found" });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch faculty",
      error: e.message,
    });
  }
};

// Create a new faculty
export const addFaculty = async (req, res) => {
  try {
    const { fuc_name, dean } = req.body;

    if (!fuc_name || !dean) {
      return res.status(400).json({
        success: false,
        message: "Faculty Name and Dean are required!",
      });
    }

    const createdFaculty = await Faculties.create({
      fuc_name,
      dean,
    });

    res.status(201).json({
      success: true,
      message: "Faculty created successfully!",
      data: createdFaculty,
    });
  } catch (e) {
    if (e.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Faculty name already exists",
        error: e.message,
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to create faculty",
      error: e.message,
    });
  }
};

// Update an existing faculty
export const updateFaculty = async (req, res) => {
  try {
    const { fuc_name, dean } = req.body;

    if (!fuc_name || !dean) {
      return res.status(400).json({
        success: false,
        message: "Faculty Name and Dean are required!",
      });
    }

    const faculty = await Faculties.findById(req.params.id);

    if (faculty) {
      faculty.fuc_name = fuc_name;
      faculty.dean = dean;

      const updatedFaculty = await faculty.save();
      res.status(200).json({
        success: true,
        message: "Faculty updated successfully!",
        data: updatedFaculty,
      });
    } else {
      res.status(404).json({ success: false, message: "Faculty not found" });
    }
  } catch (e) {
    if (e.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Faculty name already exists",
        error: e.message,
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to update faculty",
      error: e.message,
    });
  }
};

// Delete a faculty
export const deleteFaculty = async (req, res) => {
  try {
    const faculty = await Faculties.findByIdAndDelete(req.params.id);
    if (faculty) {
      res.status(200).json({
        success: true,
        message: "Faculty deleted successfully!",
        data: faculty,
      });
    } else {
      res.status(404).json({ success: false, message: "Faculty not found" });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Failed to delete faculty",
      error: e.message,
    });
  }
};

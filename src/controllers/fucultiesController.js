import Faculties from "../models/facultiesModel.js";

// Add new faculty
export const addFaculty = async (req, res) => {
  try {
    const { fuc_name, dean } = req.body;
    const faculty = new Faculties({ fuc_name, dean });
    await faculty.save();
    res.status(201).json({ message: "Faculty created", faculty });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all faculties
export const getFaculties = async (req, res) => {
  try {
    const faculties = await Faculties.find();
    res.json(faculties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update faculty
export const updateFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const { fuc_name, dean } = req.body;
    const faculty = await Faculties.findByIdAndUpdate(
      id,
      { fuc_name, dean },
      { new: true }
    );
    if (!faculty) return res.status(404).json({ error: "Faculty not found" });
    res.json({ message: "Faculty updated", faculty });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete faculty
export const deleteFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const faculty = await Faculties.findByIdAndDelete(id);
    if (!faculty) return res.status(404).json({ error: "Faculty not found" });
    res.json({ message: "Faculty deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
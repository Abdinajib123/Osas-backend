import Program from "../models/programModel.js";

// Add new program
export const addProgram = async (req, res) => {
  try {
    const { code, title, level, duration } = req.body;
    const program = new Program({ code, title, level, duration });
    await program.save();
    res.status(201).json({ message: "Program created", program });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all programs
export const getPrograms = async (req, res) => {
  try {
    const programs = await Program.find();
    res.json(programs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update program
export const updateProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, title, level, duration } = req.body;
    const program = await Program.findByIdAndUpdate(
      id,
      { code, title, level, duration },
      { new: true }
    );
    if (!program) return res.status(404).json({ error: "Program not found" });
    res.json({ message: "Program updated", program });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete program
export const deleteProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const program = await Program.findByIdAndDelete(id);
    if (!program) return res.status(404).json({ error: "Program not found" });
    res.json({ message: "Program deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

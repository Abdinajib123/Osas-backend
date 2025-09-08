import mongoose from "mongoose";

const programSchema = new mongoose.Schema({
  code:     { type: String, required: true, unique: true },
  title:    { type: String, required: true },
  level:    { type: String, required: true },
  duration: { type: String, required: true }
});

const Program = mongoose.model("Program", programSchema);

export default Program;
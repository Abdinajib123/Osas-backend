import mongoose from "mongoose";

const facultiesSchema = new mongoose.Schema({
  fuc_name: { type: String, required: true, unique: true },
  dean:     { type: String, required: true }
});

const Faculties = mongoose.model("Faculties", facultiesSchema);

export default Faculties;
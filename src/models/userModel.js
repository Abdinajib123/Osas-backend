import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, required: true, enum: ['admin', 'student', 'staff'], default: 'student' }
});

const User = mongoose.model("User", userSchema);

export default User;
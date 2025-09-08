import express from "express";
import {
  addUser,
  getUsers,
  updateUser,
  deleteUser,
  loginUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", addUser);      // Register new user
router.post("/login", loginUser);       // Login user
router.get("/getUsers", getUsers);              // Get all users
router.put("/:id", updateUser);         // Update user by ID
router.delete("/:id", deleteUser);      // Delete user by ID

export default router;
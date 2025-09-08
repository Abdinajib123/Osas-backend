import express from "express";
import {
  addProgram,
  getPrograms,
  updateProgram,
  deleteProgram,
} from "../controllers/programController.js";

const router = express.Router();

router.post("/", addProgram);           // Add new program
router.get("/getPrograms", getPrograms);         // Get all programs
router.put("/:id", updateProgram);      // Update program by ID
router.delete("/:id", deleteProgram);   // Delete program by ID

export default router;
import express from "express";
import {
  addFaculty,
  getFaculties,
  updateFaculty,
  deleteFaculty,
} from "../controllers/fucultiesController.js";

const router = express.Router();

router.post("/", addFaculty);           // Add new faculty
router.get("/", getFaculties);          // Get all faculties
router.put("/:id", updateFaculty);      // Update faculty by ID
router.delete("/:id", deleteFaculty);   // Delete faculty by ID

export default router;
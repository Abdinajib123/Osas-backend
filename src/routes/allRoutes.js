import express from "express";

// USERS
import {
  addUser,
  getUsers,
  updateUser,
  deleteUser,
  loginUser,
} from "../controllers/userController.js";

// FACULTIES
import {
  addFaculty,
  getFaculties,
  updateFaculty,
  deleteFaculty,
} from "../controllers/fucultiesController.js"; // if the file is actually misspelled, keep this import name

// PROGRAMS
import {
  addProgram,
  getPrograms,
  updateProgram,
  deleteProgram,
} from "../controllers/programController.js";

const router = express.Router();


router.post("/register", addUser);    // POST   /api/users/register
router.post("/login", loginUser);     // POST   /api/users/login
router.get("/getUsers", getUsers);            // GET    /api/users
router.put("/:id", updateUser);       // PUT    /api/users/:id
router.delete("/:id", deleteUser);    // DELETE /api/users/:id


router.post("/addFaculty", addFaculty);      // POST   /api/faculties
router.get("/getFaculties", getFaculties);     // GET    /api/faculties
router.put("/:id", updateFaculty); // PUT    /api/faculties/:id
router.delete("/:id", deleteFaculty); // DELETE /api/faculties/:id


router.post("/addProgram", addProgram);         // POST   /api/programs
router.get("/getPrograms", getPrograms);         // GET    /api/programs
router.put("/:id", updateProgram);    // PUT    /api/programs/:id
router.delete("/:id", deleteProgram); // DELETE /api/programs/:id



export default router;

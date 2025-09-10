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
import { processPayment } from "../../peyment.js";

import {
  createStudentAdmission,
  getStudentAdmissions,
  getStudentAdmissionById,
  updateStudentAdmission,
  deleteStudentAdmission,
} from "../controllers/studentAdmissionController.js";

// PAYMENTS
import {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
} from "../controllers/peymentController.js";

import {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
} from "../controllers/departemtController.js";

import Program from "../models/programModel.js";
import Faculties from "../models/fucultiesModel.js";
import Department from "../models/departmentModel.js";
import StudentAdmission from "../models/sutudentAdmissionModel.js";
import User from "../models/userModel.js";

import upload from "../../utils/multer.js";

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
// Namespaced variants
router.put("/faculties/:id", updateFaculty);
router.delete("/faculties/:id", deleteFaculty);


router.post("/addProgram", addProgram);         // POST   /api/programs
router.get("/getPrograms", getPrograms);         // GET    /api/programs
router.put("/:id", updateProgram);    // PUT    /api/programs/:id
router.delete("/:id", deleteProgram); // DELETE /api/programs/:id

// Expect form-data with field name: certificatePhoto (image)
router.post("/addStudentAdmission", upload.single("certificatePhoto"), createStudentAdmission);   // POST   /api/student-admissions
router.get("/getStudentAdmissions", getStudentAdmissions);     // GET    /api/student-admissions
router.get("/student-admissions/:id", getStudentAdmissionById);                   // GET    /api/student-admissions/:id
router.put("/student-admissions/:id", updateStudentAdmission);                    // PUT    /api/student-admissions/:id
router.delete("/student-admissions/:id", deleteStudentAdmission);                 // DELETE /api/student-admissions/:id

// Payments
router.get("/getPayments", getAllPayments);           // GET    /api/payments
router.get("/getPayment/:id", getPaymentById);        // GET    /api/payments/:id
router.post("/addPayment", createPayment);            // POST   /api/payments
router.put("/updatePayment/:id", updatePayment);      // PUT    /api/payments/:id
router.delete("/deletePayment/:id", deletePayment);   // DELETE /api/payments/:id


router.post("/addDepartment", createDepartment);   // POST   /api/departments/addDepartment
router.get("/getDepartments", getDepartments);     // GET    /api/departments/getDepartments
router.get("/:id", getDepartmentById);             // GET    /api/departments/:id
router.put("/:id", updateDepartment);              // PUT    /api/departments/:id
router.delete("/:id", deleteDepartment); 
// Namespaced variants
router.put("/departments/:id", updateDepartment);
router.delete("/departments/:id", deleteDepartment);

// Dashboard stats
router.get("/dashboard/stats", async (_req, res) => {
  try {
    const [users, programs, faculties, departments, admissions, students] = await Promise.all([
      User.countDocuments(),
      Program.countDocuments(),
      Faculties.countDocuments(),
      Department.countDocuments(),
      StudentAdmission.countDocuments(),
      StudentAdmission.countDocuments(),
    ]);
    res.json({
      users,
      programs,
      faculties,
      departments,
      admissions,
      students,
    });
  } catch (e) {
    res.status(500).json({ error: e.message || 'Failed to load stats' });
  }
});

// External payment gateway
router.post("/processPayment", processPayment);



export default router;

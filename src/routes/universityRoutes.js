import express from "express";
import {
  getAllUniversities,
  getAdmissionAvailableUniversities,
  getUniversityById,
  createUniversity,
  updateUniversity,
  deleteUniversity,
  getHighlightedUniversities
} from "../controllers/universityController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

//Get all universities (sorted by rating)
router.get("/", getAllUniversities);

// Get highlighted universities (sorted by rating)
router.get("/highlighted", getHighlightedUniversities);

//Get universities with active admission (sorted by admissionStart)
router.get("/admission/active", getAdmissionAvailableUniversities);

//Get single university by ID
router.get("/:id", getUniversityById);

//Create new university
router.post("/create", createUniversity);

//Update university
router.put("/update/:id", updateUniversity);

//Delete university
router.delete("/:id", deleteUniversity);

export default router;

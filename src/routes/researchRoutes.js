import express from "express";
import {
  getAllResearch,
  getResearchById,
  createResearch,
  updateResearch,
  deleteResearch
} from "../controllers/researchController.js";

const router = express.Router();

// GET all research papers
router.get("/", getAllResearch);

// GET single research paper by ID
router.get("/:id", getResearchById);

// POST create new research paper
router.post("/create", createResearch);

// PUT update research paper by ID
router.put("/update/:id", updateResearch);

// DELETE research paper by ID
router.delete("/:id", deleteResearch);

export default router;

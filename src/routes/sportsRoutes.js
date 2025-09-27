import express from "express";
import { createSport, deleteSport, getAllSports, getSportById, updateSport } from "../controllers/sportsController.js";


const router = express.Router();

// GET all sports
router.get("/", getAllSports);

// GET single sport by ID
router.get("/:id", getSportById);

// POST create new sport
router.post("/create", createSport);

// PUT update sport by ID
router.put("/update/:id", updateSport);

// DELETE sport by ID
router.delete("/:id", deleteSport);

export default router;

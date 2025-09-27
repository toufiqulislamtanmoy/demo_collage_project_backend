import express from "express";
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} from "../controllers/eventController.js";

const router = express.Router();

// GET all events
router.get("/", getAllEvents);

// GET single event by ID
router.get("/:id", getEventById);

// POST create new event
router.post("/create", createEvent);

// PUT update event by ID
router.put("/update/:id", updateEvent);

// DELETE event by ID
router.delete("/:id", deleteEvent);

export default router;

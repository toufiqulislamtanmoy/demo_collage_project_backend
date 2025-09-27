import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { createReview, getAllReviews, getCollegeReviews } from "../controllers/reviewsController.js";


const router = express.Router();

// Add a review
router.post("/", getAllReviews);
router.post("/create", protect, createReview);

// Get all reviews for a college
router.get("/:collegeId", getCollegeReviews);

export default router;

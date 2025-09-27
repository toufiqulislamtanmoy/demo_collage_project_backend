// routes/admissionRoutes.js
import express from "express";
import { addReview, createAdmission, getMyAdmissions } from "../controllers/admissionController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create",protect, createAdmission);

// Get admissions of logged-in user
router.get("/my-college", protect,getMyAdmissions);

// Add review to a college
router.post("/review/:collegeId",protect, addReview);

export default router;

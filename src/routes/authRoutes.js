import express from "express";
import {
  registerUser,
  loginUser,
  updateProfile,
  forgotPassword,
  resetPassword,
  socialLogin,
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/social-login", socialLogin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.put("/update-profile", protect, updateProfile);
export default router;

import express from "express";
import { upload } from "../middlewares/uploadMiddleware.js";
import { uploadImage } from "../controllers/uploadImageController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/image", upload.single("file"), uploadImage);

export default router;

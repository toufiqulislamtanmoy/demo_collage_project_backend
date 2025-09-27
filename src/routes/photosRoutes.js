import express from "express";
import {
  getAllPhotos,
  getPhotoById,
  createPhoto,
  updatePhoto,
  deletePhoto
} from "../controllers/photosController.js";

const router = express.Router();

// GET all photos
router.get("/", getAllPhotos);

// GET single photo
router.get("/:id", getPhotoById);

// POST create new photo
router.post("/create", createPhoto);

// PUT update photo
router.put("/update/:id", updatePhoto);

// DELETE photo
router.delete("/:id", deletePhoto);

export default router;

import Photo from "../models/photoModel.js";
import University from "../models/universityModel.js";

// Get all photos
export const getAllPhotos = async (req, res) => {
  try {
    const photos = await Photo.find().populate("university", "name");
    res.status(200).json({
      status: "success",
      reason: "Fetched all photos successfully",
      status_code: 200,
      data: photos
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      reason: err.message,
      status_code: 500,
      data: null
    });
  }
};

// Get single photo by ID
export const getPhotoById = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id).populate("university", "name");
    if (!photo) {
      return res.status(404).json({
        status: "failed",
        reason: "Photo not found",
        status_code: 404,
        data: null
      });
    }
    res.status(200).json({
      status: "success",
      reason: "Fetched photo successfully",
      status_code: 200,
      data: photo
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      reason: err.message,
      status_code: 500,
      data: null
    });
  }
};

// Create a new photo
export const createPhoto = async (req, res) => {
  try {
    const { image, caption, type, university } = req.body;

    const uni = await University.findById(university);
    if (!uni) {
      return res.status(404).json({
        status: "failed",
        reason: "University not found",
        status_code: 404,
        data: null
      });
    }

    const newPhoto = new Photo({ image, caption, type, university });
    const savedPhoto = await newPhoto.save();

    // Push photo reference to university.photos array
    uni.photos.push(savedPhoto._id);
    await uni.save();

    res.status(201).json({
      status: "success",
      reason: "Photo created successfully",
      status_code: 201,
      data: savedPhoto
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      reason: err.message,
      status_code: 400,
      data: null
    });
  }
};

// Update photo
export const updatePhoto = async (req, res) => {
  try {
    const updatedPhoto = await Photo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedPhoto) {
      return res.status(404).json({
        status: "failed",
        reason: "Photo not found",
        status_code: 404,
        data: null
      });
    }
    res.status(200).json({
      status: "success",
      reason: "Photo updated successfully",
      status_code: 200,
      data: updatedPhoto
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      reason: err.message,
      status_code: 400,
      data: null
    });
  }
};

// Delete photo
export const deletePhoto = async (req, res) => {
  try {
    const deletedPhoto = await Photo.findByIdAndDelete(req.params.id);
    if (!deletedPhoto) {
      return res.status(404).json({
        status: "failed",
        reason: "Photo not found",
        status_code: 404,
        data: null
      });
    }

    // Remove reference from university.photos array
    await University.findByIdAndUpdate(
      deletedPhoto.university,
      { $pull: { photos: deletedPhoto._id } }
    );

    res.status(200).json({
      status: "success",
      reason: "Photo deleted successfully",
      status_code: 200,
      data: deletedPhoto
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      reason: err.message,
      status_code: 500,
      data: null
    });
  }
};

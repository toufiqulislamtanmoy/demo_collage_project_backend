import University from "../models/universityModel.js";
import Event from "../models/eventModel.js";
import Sport from "../models/sportModel.js";
import Research from "../models/researchModel.js";
import Photo from "../models/photoModel.js";

//  Get all universities
export const getAllUniversities = async (req, res) => {
  try {
    const universities = await University.find()
      .sort({ rating: -1 })
      .populate("events sports researchPapers photos");

    res.status(200).json({
      status: "success",
      reason: "Fetched all universities successfully",
      status_code: 200,
      data: universities,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      reason: err.message || "Failed to fetch universities",
      status_code: 500,
      data: null,
    });
  }
};

//  Get universities with active admission
export const getAdmissionAvailableUniversities = async (req, res) => {
  try {
    const today = new Date();

    const universities = await University.find({
      admissionStart: { $lte: today },
      admissionEnd: { $gte: today },
    })
      .sort({ admissionStart: 1 })
      .populate("events sports researchPapers photos");

    res.status(200).json({
      status: "success",
      reason: "Fetched universities with active admission successfully",
      status_code: 200,
      data: universities,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      reason:
        err.message || "Failed to fetch universities with active admission",
      status_code: 500,
      data: null,
    });
  }
};

//  Get single university by ID
export const getUniversityById = async (req, res) => {
  try {
    const university = await University.findById(req.params.id).populate(
      "events sports researchPapers photos"
    );

    if (!university) {
      return res.status(404).json({
        status: "failed",
        reason: "University not found",
        status_code: 404,
        data: null,
      });
    }

    res.status(200).json({
      status: "success",
      reason: "Fetched university details successfully",
      status_code: 200,
      data: university,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      reason: err.message || "Failed to fetch university details",
      status_code: 500,
      data: null,
    });
  }
};

//  Create new university
export const createUniversity = async (req, res) => {
  try {
    const newUniversity = new University(req.body);
    const savedUniversity = await newUniversity.save();

    res.status(201).json({
      status: "success",
      reason: "University created successfully",
      status_code: 201,
      data: savedUniversity,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      reason: err.message || "Failed to create university",
      status_code: 400,
      data: null,
    });
  }
};

//  Update university
export const updateUniversity = async (req, res) => {
  try {
    const updatedUniversity = await University.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedUniversity) {
      return res.status(404).json({
        status: "failed",
        reason: "University not found",
        status_code: 404,
        data: null,
      });
    }

    res.status(200).json({
      status: "success",
      reason: "University updated successfully",
      status_code: 200,
      data: updatedUniversity,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      reason: err.message || "Failed to update university",
      status_code: 400,
      data: null,
    });
  }
};

//  Delete university
export const deleteUniversity = async (req, res) => {
  try {
    const deletedUniversity = await University.findByIdAndDelete(req.params.id);

    if (!deletedUniversity) {
      return res.status(404).json({
        status: "failed",
        reason: "University not found",
        status_code: 404,
        data: null,
      });
    }

    res.status(200).json({
      status: "success",
      reason: "University deleted successfully",
      status_code: 200,
      data: deletedUniversity,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      reason: err.message || "Failed to delete university",
      status_code: 500,
      data: null,
    });
  }
};

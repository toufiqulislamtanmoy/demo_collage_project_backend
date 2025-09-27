import Sport from "../models/sportModel.js";
import University from "../models/universityModel.js";

//  Get all sports
export const getAllSports = async (req, res) => {
  try {
    const sports = await Sport.find().populate("university");
    res.status(200).json({
      status: "success",
      reason: "Fetched all sports successfully",
      status_code: 200,
      data: sports
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

//  Get single sport by ID
export const getSportById = async (req, res) => {
  try {
    const sport = await Sport.findById(req.params.id).populate("university");
    if (!sport) {
      return res.status(404).json({
        status: "failed",
        reason: "Sport not found",
        status_code: 404,
        data: null
      });
    }
    res.status(200).json({
      status: "success",
      reason: "Fetched sport successfully",
      status_code: 200,
      data: sport
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

//  Create new sport
export const createSport = async (req, res) => {
  try {
    const { name, university } = req.body;

    // Check if university exists
    const uni = await University.findById(university);
    if (!uni) {
      return res.status(404).json({
        status: "failed",
        reason: "University not found",
        status_code: 404,
        data: null
      });
    }

    const newSport = new Sport({ name, university });
    const savedSport = await newSport.save();

    // Add sport reference to university.sports array
    uni.sports.push(savedSport._id);
    await uni.save();

    res.status(201).json({
      status: "success",
      reason: "Sport created successfully",
      status_code: 201,
      data: savedSport
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

//  Update sport
export const updateSport = async (req, res) => {
  try {
    const updatedSport = await Sport.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedSport) {
      return res.status(404).json({
        status: "failed",
        reason: "Sport not found",
        status_code: 404,
        data: null
      });
    }
    res.status(200).json({
      status: "success",
      reason: "Sport updated successfully",
      status_code: 200,
      data: updatedSport
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

//  Delete sport
export const deleteSport = async (req, res) => {
  try {
    const deletedSport = await Sport.findByIdAndDelete(req.params.id);
    if (!deletedSport) {
      return res.status(404).json({
        status: "failed",
        reason: "Sport not found",
        status_code: 404,
        data: null
      });
    }

    // Remove reference from university.sports array
    await University.findByIdAndUpdate(
      deletedSport.university,
      { $pull: { sports: deletedSport._id } }
    );

    res.status(200).json({
      status: "success",
      reason: "Sport deleted successfully",
      status_code: 200,
      data: deletedSport
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

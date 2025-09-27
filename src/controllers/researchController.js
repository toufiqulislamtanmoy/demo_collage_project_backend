import Research from "../models/researchModel.js";
import University from "../models/universityModel.js";

//  Get all research papers
export const getAllResearch = async (req, res) => {
  try {
    const researchPapers = await Research.find().populate("university", "name"); 

    res.status(200).json({
      status: "success",
      reason: "Fetched all research papers successfully",
      status_code: 200,
      data: researchPapers,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      reason: err.message,
      status_code: 500,
      data: null,
    });
  }
};

//  Get single research paper by ID
export const getResearchById = async (req, res) => {
  try {
    const research = await Research.findById(req.params.id).populate(
      "university",
      "name"
    );

    if (!research) {
      return res.status(404).json({
        status: "failed",
        reason: "Research paper not found",
        status_code: 404,
        data: null,
      });
    }

    res.status(200).json({
      status: "success",
      reason: "Fetched research paper successfully",
      status_code: 200,
      data: research,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      reason: err.message,
      status_code: 500,
      data: null,
    });
  }
};

//  Create new research paper
export const createResearch = async (req, res) => {
  try {
    const {
      title,
      abstract,
      authors,
      publicationDate,
      journal,
      totalDownloads,
      totalPages,
      category,
      link,
      keywords,
      university,
    } = req.body;

    // Check if university exists
    const uni = await University.findById(university);
    if (!uni) {
      return res.status(404).json({
        status: "failed",
        reason: "University not found",
        status_code: 404,
        data: null,
      });
    }

    const newResearch = new Research({
      title,
      abstract,
      authors,
      publicationDate,
      journal,
      totalDownloads,
      totalPages,
      category,
      link,
      keywords,
      university,
    });

    const savedResearch = await newResearch.save();

    // Add research reference to university.researchPapers array
    uni.researchPapers.push(savedResearch._id);
    await uni.save();

    res.status(201).json({
      status: "success",
      reason: "Research paper created successfully",
      status_code: 201,
      data: savedResearch,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      reason: err.message,
      status_code: 400,
      data: null,
    });
  }
};

//  Update research paper
export const updateResearch = async (req, res) => {
  try {
    const updatedResearch = await Research.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedResearch) {
      return res.status(404).json({
        status: "failed",
        reason: "Research paper not found",
        status_code: 404,
        data: null,
      });
    }

    res.status(200).json({
      status: "success",
      reason: "Research paper updated successfully",
      status_code: 200,
      data: updatedResearch,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      reason: err.message,
      status_code: 400,
      data: null,
    });
  }
};

//  Delete research paper
export const deleteResearch = async (req, res) => {
  try {
    const deletedResearch = await Research.findByIdAndDelete(req.params.id);

    if (!deletedResearch) {
      return res.status(404).json({
        status: "failed",
        reason: "Research paper not found",
        status_code: 404,
        data: null,
      });
    }

    // Remove reference from university.researchPapers array
    await University.findByIdAndUpdate(deletedResearch.university, {
      $pull: { researchPapers: deletedResearch._id },
    });

    res.status(200).json({
      status: "success",
      reason: "Research paper deleted successfully",
      status_code: 200,
      data: deletedResearch,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      reason: err.message,
      status_code: 500,
      data: null,
    });
  }
};

import Review from "../models/reviewsModel.js";
import University from "../models/universityModel.js";

export const createReview = async (req, res) => {
  const { college, review, rating } = req.body;
  const userId = req.user._id;

  if (!college || !review || !rating) {
    return res
      .status(400)
      .json({ status: "error", reason: "All fields are required" });
  }

  try {
    const newReview = await Review.create({
      college,
      user: userId,
      review,
      rating,
    });

    res.status(201).json({
      status: "success",
      data: newReview,
      message: "Review added successfully!",
    });
  } catch (err) {
    res.status(500).json({ status: "error", reason: err.message });
  }
};

// Get reviews for a college
export const getCollegeReviews = async (req, res) => {
  try {
    const { collegeId } = req.params;
    const reviews = await Review.find({ college: collegeId })
      .populate("user", "name email") // get user's name & email
      .sort({ createdAt: -1 });

    res.status(200).json({ status: "success", data: reviews });
  } catch (err) {
    res.status(500).json({ status: "error", reason: err.message });
  }
};



export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user", "name email photo")      
      .populate("college", "name")   
      .sort({ createdAt: -1 });            

    res.status(200).json({
      status: "success",
      data: reviews,
    });
  } catch (err) {
    res.status(500).json({ status: "error", reason: err.message });
  }
};


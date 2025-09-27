import Admission from "../models/admissionModel.js";
import University from "../models/universityModel.js";
export const createAdmission = async (req, res) => {
  try {
    const {
      candidateName,
      subject,
      email,
      phone,
      dob,
      image,
      address,
      college,
      submitted_by,
    } = req.body;

    if (
      !candidateName ||
      !subject ||
      !email ||
      !phone ||
      !dob ||
      !image ||
      !address ||
      !college
    ) {
      return res
        .status(400)
        .json({ status: "error", reason: "All fields are required" });
    }

    // Create new admission
    const newAdmission = await Admission.create({
      candidateName,
      subject,
      email,
      phone,
      dob,
      image,
      address,
      college,
      submitted_by,
    });

    await University.findByIdAndUpdate(
      college,
      { $inc: { totalStudent: 1 } },
      { new: true }
    );

    res.status(201).json({
      status: "success",
      data: newAdmission,
      message: "Admission submitted successfully!",
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ status: "error", reason: err.message || "Server error" });
  }
};

// Get admissions of the logged-in user
export const getMyAdmissions = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const myAdmissions = await Admission.find({
      submitted_by: userEmail,
    }).populate("college", "name image rating location totalStudent");

    res.status(200).json({
      status: "success",
      data: myAdmissions,
    });
  } catch (err) {
    res.status(500).json({ status: "error", reason: err.message });
  }
};

// Add review to a college
export const addReview = async (req, res) => {
  try {
    const { collegeId } = req.params;
    const { rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ status: "error", reason: "Invalid rating" });
    }

    const college = await University.findById(collegeId);
    if (!college)
      return res
        .status(404)
        .json({ status: "error", reason: "College not found" });

    // Add review
    if (!college.reviews) college.reviews = [];
    college.reviews.push({
      user: req.user.email,
      rating,
      comment,
      createdAt: new Date(),
    });

    await college.save();

    res.status(201).json({
      status: "success",
      message: "Review added successfully",
      data: college.reviews,
    });
  } catch (err) {
    res.status(500).json({ status: "error", reason: err.message });
  }
};

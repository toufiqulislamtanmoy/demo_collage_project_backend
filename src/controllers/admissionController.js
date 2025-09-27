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

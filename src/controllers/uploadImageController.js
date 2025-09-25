import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";


export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: "Fail", reason: "No file uploaded" });
    }

    const result = await uploadToCloudinary(req.file.buffer, "collages/images");

    res.status(200).json({
      status: "Success",
      data: result, // contains { url, public_id }
    });
  } catch (err) {
    next(err);
  }
};

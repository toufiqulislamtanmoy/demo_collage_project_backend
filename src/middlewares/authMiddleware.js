import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { system_config } from "../config/system.config.js";

export const protect = async (req, res, next) => {
  const { jwtSecret } = system_config;
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({status: "Failed", status_code: 401, reason: "No token" });

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      const message = {
        status: "Failed",
        reason: "User not found or deactivated",
        status_code: 404,
      };
      return res.status(404).json(message);
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      status: "Failed",
      reason: "Invalid Token",
      status_code: 401,
    });
  }
};

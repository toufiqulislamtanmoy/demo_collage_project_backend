import { stat } from "fs";
import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";
import crypto from "crypto";
export const registerUser = async (req, res, next) => {
  const { name, email, password, ...data } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      const message = {
        status: "Failed",
        reason: "User already exists",
        status_code: 400,
      };
      return res.status(400).json(message);
    }

    const user = await User.create({ name, email, password, ...data });
    res.status(201).json({
      status: "Success",
      status_code: 201,
      reason: "User created successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const message = {
        status: "Failed",
        reason: "User not found",
        status_code: 401,
      };
      return res.status(401).json(message);
    } else if (!(await user.matchPassword(password))) {
      const message = {
        status: "Failed",
        reason: "Email or password is incorrect",
        status_code: 401,
      };
      return res.status(401).json(message);
    }
    res.json({
      status: "Success",
      status_code: 200,
      reason: "User logged in successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user || !user.isActive) {
      const message = {
        status: "Failed",
        reason: "User not found or deactivated",
        status_code: 404,
      };
      return res.status(404).json(message);
    }

    user.name = req.body.name || user.name;
    user.avatar = req.body.avatar || user.avatar;

    await user.save();

    res.json({
      status: "Success",
      status_code: 200,
      reason: "Profile updated successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    console.log("error", err);
    next(err);
  }
};

const generateResetToken = () => {
  const token = crypto.randomBytes(32).toString("hex");
  const hashed = crypto.createHash("sha256").update(token).digest("hex");
  return { token, hashed };
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: "Failed",
        reason: "User not found",
        status_code: 404,
      });
    }

    const { token, hashed } = generateResetToken();

    user.resetPasswordToken = hashed;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    const frontendBaseUrl =
      process.env.FRONTEND_BASE_URL || "http://localhost:3000";
    const resetLink = `${frontendBaseUrl}/reset-password/${token}`;

    res.json({
      status: "Success",
      status_code: 200,
      reason: "Password reset link has been generated",
      data: {
        message: "Password reset link has been generated",
        resetLink,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;

  const hashed = crypto.createHash("sha256").update(token).digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken: hashed,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res
        .status(400)
        .json({ status: "Failed", message: "Invalid or expired token" });

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({
      status: "Success",
      message: "Password has been reset successfully",
    });
  } catch (err) {
    next(err);
  }
};

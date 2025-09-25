import mongoose from "mongoose";
import { system_config } from "./system.config.js";
import chalk from "chalk";

const connectDB = async () => {
  const { mongoUri } = system_config;
  try {
    await mongoose.connect(mongoUri);
    console.log(chalk.green("✅ MongoDB connected"));
  } catch (error) {
    console.error(chalk.red("❌ MongoDB connection failed:", error.message));
    process.exit(1);
  }
};

export default connectDB;

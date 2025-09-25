import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { system_config } from "./system.config.js";

dotenv.config();

const {
  cloudinary: { cloud_name, api_key, api_secret },
} = system_config;

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

export default cloudinary;

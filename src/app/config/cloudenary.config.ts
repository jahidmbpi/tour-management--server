import { v2 as cloudinary } from "cloudinary";
import { envVars } from "./env";
cloudinary.config({
  cloud_name: envVars.CLUDENARY.CLUDENARY_CLOUD_NAME,
  api_key: envVars.CLUDENARY.CLUDENARY_API_KEY,
  api_secret: envVars.CLUDENARY.CLUDENARY_API_SECRET,
});

export const cloudinaryUpload = cloudinary;

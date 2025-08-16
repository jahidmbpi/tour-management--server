import { v2 as cloudinary } from "cloudinary";
import { envVars } from "./env";
import AppError from "../errorHalper/AppError";
cloudinary.config({
  cloud_name: envVars.CLUDENARY.CLUDENARY_CLOUD_NAME,
  api_key: envVars.CLUDENARY.CLUDENARY_API_KEY,
  api_secret: envVars.CLUDENARY.CLUDENARY_API_SECRET,
});

export const deleteImageCloudenary = async (url: string) => {
  try {
    const regex = /\/v\d+\/(.*?)\.(jpg|jpeg|png|gif|webp)$/i;
    const Match = url.match(regex);

    if (Match && Match[1]) {
      const public_id = Match[1];
      await cloudinary.uploader.destroy(public_id);
      console.log(`file${public_id} is deleted success`);
    }
  } catch (error) {
    console.log(error);
    throw new AppError(401, "not match");
  }
};

export const cloudinaryUpload = cloudinary;

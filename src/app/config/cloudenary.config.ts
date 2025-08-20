/* eslint-disable @typescript-eslint/no-explicit-any */
import { v2 as cloudinary } from "cloudinary";
import { envVars } from "./env";
import AppError from "../errorHalper/AppError";
import stream from "stream";
cloudinary.config({
  cloud_name: envVars.CLUDENARY.CLUDENARY_CLOUD_NAME,
  api_key: envVars.CLUDENARY.CLUDENARY_API_KEY,
  api_secret: envVars.CLUDENARY.CLUDENARY_API_SECRET,
});

export const buffreCloudenaryUpload = async (
  buffer: Buffer,
  fileName: string
) => {
  try {
    return new Promise((resolve, reject) => {
      const public_id = `pdf/${fileName}-${Date.now()}`;

      const bufferStream = new stream.PassThrough();
      bufferStream.end(buffer);

      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          public_id,
          folder: "pdf",
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        }
      );

      bufferStream.pipe(uploadStream);
    });
  } catch (error: any) {
    console.error(error);
    throw new AppError(401, `error uploading file ${error.message}`);
  }
};

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

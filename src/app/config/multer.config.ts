/* eslint-disable no-useless-escape */
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinaryUpload } from "./cloudenary.config";
import multer from "multer";

const storege = new CloudinaryStorage({
  cloudinary: cloudinaryUpload,
  params: {
    public_id: (req, file) => {
      console.log("this is multer file", file);
      const fileName = file.originalname
        .toLocaleLowerCase()
        .replace(/\s+/g, "-")
        .replace(/\./g, "-")
        .replace(/[^a-z0-9\-\.]/g, "");

      const extension = file.originalname.split(".").pop();
      const finalUniqueFileName =
        Math.random().toString(36).substring(2) +
        "-" +
        Date.now() +
        "-" +
        fileName +
        "." +
        extension;
      return finalUniqueFileName;
    },
  },
});
export const multerUpload = multer({ storage: storege });

import mongoose from "mongoose";
import { Tgeneric } from "../interfaces/error.types";

export const handleCastError = (err: mongoose.Error.CastError): Tgeneric => {
  console.log(err);
  return {
    statusCode: 400,
    message: "Invalid MongoDB ObjectId. Please provide a valid ID.",
  };
};

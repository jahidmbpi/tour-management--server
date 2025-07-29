/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TErrorResponse, Tgeneric } from "../interfaces/error.types";

export const handleValidationError = (
  err: mongoose.Error.ValidationError
): Tgeneric => {
  const errorSources: TErrorResponse[] = [];

  Object.values(err.errors).forEach((error: any) => {
    errorSources.push({
      path: error.path,
      message: error.message,
    });
  });

  return {
    statusCode: 400,
    message: "Validation error",
    errorSources,
  };
};

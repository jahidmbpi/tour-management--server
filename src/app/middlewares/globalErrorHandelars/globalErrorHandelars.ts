/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { envVars } from "../../config/env";
import AppError from "../../errorHalper/AppError";
import { ZodError } from "zod"; // ✅ ZodError import
import { TErrorResponse } from "../../interfaces/error.types";
import { handleDuplicateError } from "../../helpers/handelDuplicateError";
import { handleZodError } from "../../helpers/handleZodError";
import { handleCastError } from "../../helpers/handleCastError";
import { handleValidationError } from "../../helpers/handleValidationError";
import { deleteImageCloudenary } from "../../config/cloudenary.config";

export const globalErrorhandelar = async (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorSources: TErrorResponse[] = [];

  if (req.file) {
    await deleteImageCloudenary(req.file.path);
  }

  // MongoDB duplicate key error
  if (err.code === 11000) {
    const simplified = handleDuplicateError(err);
    statusCode = simplified.statusCode;
    message = simplified.message;
  }
  if (
    req.files &&
    Array.isArray(req.files) &&
    (req.files as Express.Multer.File[]).length > 0
  ) {
    const imageUrls = (req.files as Express.Multer.File[]).map(
      (file) => file.path
    );

    await Promise.all(imageUrls.map((url) => deleteImageCloudenary(url)));
  }

  // Zod validation error
  else if (err instanceof ZodError) {
    const simplified = handleZodError(err);
    statusCode = simplified.statusCode;
    message = simplified.message;
    errorSources = simplified.errorSources || [];
  }

  // Cast error (invalid ObjectId)
  else if (err.name === "CastError") {
    const simplified = handleCastError(err);
    statusCode = simplified.statusCode;
    message = simplified.message;
  }

  // Mongoose validation error
  else if (err.name === "ValidationError") {
    const simplified = handleValidationError(err);
    statusCode = simplified.statusCode;
    message = simplified.message;
    errorSources = simplified.errorSources || [];
  }

  // Custom AppError
  else if (err instanceof AppError) {
    statusCode = err.statuscode;
    message = err.message;
  }

  // Generic Error
  else if (err instanceof Error) {
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err: envVars.NODE_ENV === "development" ? err : undefined,
    stack: envVars.NODE_ENV === "development" ? err.stack : undefined,
  });
};

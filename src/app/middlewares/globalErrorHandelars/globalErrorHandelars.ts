import { NextFunction, Request, Response } from "express";

import { envVars } from "../../config/env";
import AppError from "../../errorHalper/AppError";
import { object } from "zod";

export const globalErrorhandelar = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errorSource: any = [];
  let statusCode = 500;
  let massage = `something went wrong!! ${err}`;

  if (err.code === 11000) {
    const matchedArray = err.message.match(/"([^"]*)"/);
    statusCode = 400;
    massage =
      matchedArray && matchedArray[1]
        ? `${matchedArray[1]} already exists`
        : "Duplicate field value already exists";
  } else if (err.name === "CastError") {
    statusCode = 400;
    massage = "invalid mongoose ObjectId.please provide a valid id ";
  } else if (err instanceof AppError) {
    statusCode = err.statuscode;
    massage = err.message;
  } else if (err instanceof Error) {
    statusCode = 500;
    massage = err.message;
  } else if (err.name === "ValidationError") {
    statusCode = 400;
    const errors = object.values(err.errors);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors.array.forEach((element: any) =>
      errorSource.push({
        path: element.path,
        massage: element.message,
      })
    );
    massage = err.message;
  }

  res.status(statusCode).json({
    success: false,
    massage,
    errorSource,
    err,
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
  });
};

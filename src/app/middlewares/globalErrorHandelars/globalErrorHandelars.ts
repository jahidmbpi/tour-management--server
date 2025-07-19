import { NextFunction, Request, Response } from "express";

import { envVars } from "../../config/env";

export const globalErrorhandelar = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const statusCode = 500;
  const massage = `something went wrong!! ${err}`;

  res.status(statusCode).json({
    success: false,
    massage,
    err,
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
  });
};

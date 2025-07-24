/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";

import catchAsync from "../../utilse/catchAsync";
import sendResponse from "../../utilse/sendResponse";
import { Request, Response, NextFunction } from "express";
import { authService } from "./auth.service";

const credentialLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await authService.credentialLogin(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      massage: "User logged in successfully",
      data: loginInfo,
    });
  }
);
const getnewAccessTocken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;

    const tokenInfo = await authService.getnewAccessTocken(refreshToken);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      massage: "User logged in successfully",
      data: tokenInfo,
    });
  }
);
export const authControllers = {
  credentialLogin,
  getnewAccessTocken,
};

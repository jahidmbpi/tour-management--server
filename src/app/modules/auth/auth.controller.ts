/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";

import catchAsync from "../../utilse/catchAsync";
import sendResponse from "../../utilse/sendResponse";
import { Request, Response, NextFunction } from "express";
import { authService } from "./auth.service";
import { setAuthCookie } from "../../utilse/setCookie";

const credentialLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await authService.credentialLogin(req.body);
    setAuthCookie(res, {
      accessToken: loginInfo.accesstocken,
    });
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
    setAuthCookie(res, tokenInfo);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      massage: "new access tocken retrived successfully",
      data: tokenInfo,
    });
  }
);
const logOut = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("accesstocken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.clearCookie("refreshTocken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      massage: "User logged out successfully",
      data: null,
    });
  }
);

const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const decodedTocken = req.user;
    const newUpdatedPassword = await authService.resetPassword(
      oldPassword,
      newPassword,
      decodedTocken
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      massage: "User logged out successfully",
      data: null,
    });
  }
);
export const authControllers = {
  credentialLogin,
  getnewAccessTocken,
  logOut,
  resetPassword,
};

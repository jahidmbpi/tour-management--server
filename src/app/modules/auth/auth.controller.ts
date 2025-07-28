/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";

import catchAsync from "../../utilse/catchAsync";
import sendResponse from "../../utilse/sendResponse";
import { Request, Response, NextFunction } from "express";
import { authService } from "./auth.service";
import { setAuthCookie } from "../../utilse/setCookie";
import AppError from "../../errorHalper/AppError";
import { createUserToken } from "../../utilse/userTockent";
import { envVars } from "../../config/env";

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

    if (!req.user) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized request");
    }

    const decodedToken = req.user;

    const updatedPassword = await authService.resetPassword(
      oldPassword,
      newPassword,
      decodedToken // এখন TypeScript satisfied
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      massage: "Password updated successfully",
      data: updatedPassword,
    });
  }
);

const googleCallback = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let redirectTo = req.query.state ? (req.query.state as string) : "";

    if (redirectTo.startsWith("/")) {
      redirectTo = redirectTo.slice(1);
    }

    const user = req.user;

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    const tokenInfo = await createUserToken(user);

    setAuthCookie(res, tokenInfo);

    res.redirect(`${envVars.FRONTANT_URL}/${redirectTo}`);
  }
);

export const authControllers = {
  credentialLogin,
  getnewAccessTocken,
  logOut,
  resetPassword,
  googleCallback,
};

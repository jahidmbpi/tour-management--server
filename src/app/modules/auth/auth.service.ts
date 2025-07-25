/* eslint-disable @typescript-eslint/no-unused-vars */
import bcryptjs from "bcryptjs";
import httpStatus from "http-status";
import { isActive, IUser } from "../../../user/user.interface";
import AppError from "../../errorHalper/AppError";
import { User } from "../../../user/user.model";
import jwt, { JwtPayload } from "jsonwebtoken";
import { genaretetocken, verifyTocken } from "../../utilse/jwt";
import { envVars } from "../../config/env";

import {
  createNewAccessTockenWithrefeshTocken,
  createUserToken,
} from "../../utilse/userTockent";

const credentialLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;

  const isUserExist = await User.findOne({ email }).lean();

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User doesn't exist");
  }

  const userTocken = createUserToken(isUserExist);

  const isPasswordMatch = await bcryptjs.compare(
    password as string,
    isUserExist.password as string
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, "Incorrect password");
  }

  // delete isUserExist.password;
  const { password: _password, ...rest } = isUserExist;

  return {
    accesstocken: userTocken.accessToken,
    refreshTocken: userTocken.refreshToken,
    user: rest,
  };
};
const getnewAccessTocken = async (refreshToken: string) => {
  const accessTokenInfo = await createNewAccessTockenWithrefeshTocken(
    refreshToken
  );

  return {
    accessToken: accessTokenInfo.accessTocken,
  };
};
const resetPassword = async (
  oldPassword: string,
  newPassword: string,
  decodedTocken: JwtPayload
) => {
  const user = await User.findById(decodedTocken.userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const isOldPasswordMatch = await bcryptjs.compare(
    oldPassword,
    user.password as string
  );

  if (!isOldPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, "Old password does not match");
  }

  const newhashedPassword = await bcryptjs.hash(
    newPassword,
    Number(envVars.BYCRIPT_SALT_ROUND)
  );

  user.password = newhashedPassword;
  await user.save();

  return {
    message: "Password updated successfully",
  };
};

export const authService = {
  credentialLogin,
  getnewAccessTocken,
  resetPassword,
};

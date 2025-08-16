/* eslint-disable @typescript-eslint/no-unused-vars */
import bcryptjs from "bcryptjs";
import httpStatus from "http-status";
import { IAuthProvider, isActive, IUser } from "../user/user.interface";
import AppError from "../../errorHalper/AppError";
import { User } from "../user/user.model";
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
const changePassword = async (
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

const setPassword = async (userId: string, plainPassword: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (
    user.password &&
    user.auths.some((providerObject) => providerObject.provider == "google")
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You have already set you password. Now you can change the password from your profile password update"
    );
  }
  const newhashedPassword = await bcryptjs.hash(
    plainPassword,
    Number(envVars.BYCRIPT_SALT_ROUND)
  );

  const credentialProvider: IAuthProvider = {
    provider: "credential",
    providerID: user.email,
  };
  const auth: IAuthProvider[] = [...user.auths, credentialProvider];
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
  changePassword,
  setPassword,
};

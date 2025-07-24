/* eslint-disable @typescript-eslint/no-unused-vars */
import bcryptjs from "bcryptjs";
import httpStatus from "http-status";
import { isActive, IUser } from "../../../user/user.interface";
import AppError from "../../errorHalper/AppError";
import { User } from "../../../user/user.model";
import jwt, { JwtPayload } from "jsonwebtoken";
import { genaretetocken, verifyTocken } from "../../utilse/jwt";
import { envVars } from "../../config/env";
import { createUserToken } from "../../utilse/userTockent";

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
  const verifyRefreshtocken = verifyTocken(
    refreshToken,
    envVars.JWT_REFRESH_SECRECT
  ) as JwtPayload;

  const isUserExist = await User.findOne({
    email: verifyRefreshtocken.email,
  }).lean();

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User doesn't exist");
  }

  if (isUserExist.isActive === isActive.BLOCKED) {
    throw new AppError(httpStatus.BAD_REQUEST, "user  is blocked");
  }
  if (isUserExist.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "user  is blocked");
  }

  const userTocken = createUserToken(isUserExist);

  // delete isUserExist.password;
  const { password: _password, ...rest } = isUserExist;

  return {
    accesstocken: userTocken.accessToken,
  };
};

export const authService = {
  credentialLogin,
  getnewAccessTocken,
};

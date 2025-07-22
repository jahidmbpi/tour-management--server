/* eslint-disable @typescript-eslint/no-unused-vars */
import bcryptjs from "bcryptjs";
import httpStatus from "http-status";
import { IUser } from "../../../user/user.interface";
import AppError from "../../errorHalper/AppError";
import { User } from "../../../user/user.model";
import jwt from "jsonwebtoken";
import { genaretetocken } from "../../utilse/jwt";
import { envVars } from "../../config/env";

const credentialLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;

  const isUserExist = await User.findOne({ email }).lean();

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User doesn't exist");
  }

  const isPasswordMatch = await bcryptjs.compare(
    password as string,
    isUserExist.password as string
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, "Incorrect password");
  }

  const jwtPayload = {
    userId: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };
  const accesTocken = genaretetocken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRE
  );

  const refreshTocken = genaretetocken(
    jwtPayload,
    envVars.JWT_REFRESH_SECRECT,
    envVars.JWT_REFRESH_EXPIRES
  );
  delete isUserExist.password;
  return {
    accesTocken,
    refreshTocken,
    user: isUserExist,
  };
};

export const authService = {
  credentialLogin,
};

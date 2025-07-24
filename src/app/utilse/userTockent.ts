import httpStatus from "http-status";
import { isActive, IUser } from "../../user/user.interface";
import { envVars } from "../config/env";
import AppError from "../errorHalper/AppError";
import { genaretetocken, verifyTocken } from "./jwt";
import { User } from "../../user/user.model";
import { JwtPayload } from "jsonwebtoken";

export const createUserToken = (user: Partial<IUser>) => {
  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = genaretetocken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRE
  );

  const refreshToken = genaretetocken(
    jwtPayload,
    envVars.JWT_REFRESH_SECRECT,
    envVars.JWT_REFRESH_EXPIRES
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const createNewAccessTockenWithrefeshTocken = async (
  refreshTocken: string
) => {
  const verifyRefreshtocken = verifyTocken(
    refreshTocken,
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

  // delete isUserExist.password;

  const JwtPayload = {
    userId: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };
  const accessTocken = genaretetocken(
    JwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRE
  );

  return {
    accessTocken,
  };
};

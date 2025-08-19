/* eslint-disable @typescript-eslint/no-explicit-any */
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
import sendEmail from "../../utilse/sendmail";

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
  payload: Record<string, any>,
  decodedToken: JwtPayload
) => {
  if (payload.id != decodedToken.userId) {
    throw new AppError(401, "You can not reset your password");
  }

  const isUserExist = await User.findById(decodedToken.userId);
  if (!isUserExist) {
    throw new AppError(401, "User does not exist");
  }

  const hashedPassword = await bcryptjs.hash(
    payload.newPassword,
    Number(envVars.BYCRIPT_SALT_ROUND)
  );

  isUserExist.password = hashedPassword;

  await isUserExist.save();
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

const forgotPassword = async (email: string) => {
  const isUserExist = await User.findOne({ email });

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User does not exist");
  }
  if (!isUserExist.isVerified) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is not verified");
  }
  if (
    isUserExist.isActive === isActive.BLOCKED ||
    isUserExist.isActive === isActive.INACTIVE
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `User is ${isUserExist.isActive}`
    );
  }
  if (isUserExist.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is deleted");
  }

  const jwtPayload = {
    userId: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };

  const resetToken = jwt.sign(jwtPayload, envVars.JWT_ACCESS_SECRET, {
    expiresIn: "10m",
  });

  const resetUILink = `${envVars.FRONTANT_URL}/reset-password?id=${isUserExist._id}&token=${resetToken}`;

  sendEmail({
    to: isUserExist.email,
    subject: "Password Reset",
    template: "forgetPassword",
    templateData: {
      name: isUserExist.name,
      resetUILink,
    },
  });
};

export const authService = {
  credentialLogin,
  getnewAccessTocken,
  resetPassword,
  changePassword,
  setPassword,
  forgotPassword,
};

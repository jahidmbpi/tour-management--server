import httpStatus from "http-status";
import AppError from "../../errorHalper/AppError";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import bcryptjs from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";

export const createUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;

  if (!email || !password) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Email and password are required"
    );
  }

  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exists");
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  const authProvider: IAuthProvider = {
    provider: "credential",
    providerID: email,
  };
  const user = await User.create({
    email,
    auths: [authProvider],
    password: hashedPassword,
    ...rest,
  });

  return user;
};
const getAllUser = async () => {
  const users = await User.find({});
  return users;
};

const updateUser = async (
  userId: string,
  payload: Partial<IUser>,
  decodedTocken: JwtPayload
) => {
  const ifUserExist = await User.findById(userId);
  if (!ifUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "user not found");
  }
  if (payload.role) {
    if (decodedTocken.role === Role.USER || decodedTocken.role === Role.GUIDE) {
      throw new AppError(httpStatus.FORBIDDEN, "you are not authorized");
    }
    if (
      decodedTocken.role !== Role.SUPER_ADMIN &&
      decodedTocken.role !== Role.ADMIN
    ) {
      throw new AppError(httpStatus.FORBIDDEN, "you are not authorized");
    }
  }

  if (payload.isActive || payload.isDeleted || payload.isVerified) {
    if (decodedTocken.role === Role.USER || decodedTocken.role === Role.GUIDE) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
    }
  }

  const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });
  return newUpdatedUser;
};

const userServicecs = {
  createUser,
  getAllUser,
  updateUser,
};
export default userServicecs;

import httpStatus from "http-status";
import AppError from "../app/errorHalper/AppError";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import bcryptjs from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";

const createUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;

  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exists");
  }
  const hashedpassword = await bcryptjs.hash(password as string, 10);

  const authProvider: IAuthProvider = {
    provider: "credential",
    providerID: email as string,
  };

  const user = await User.create({
    email,
    auths: [authProvider],
    password: hashedpassword,

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
  if (payload.role) {
    const ifUserExist = await User.findById(userId);
    if (ifUserExist) {
      throw new AppError(httpStatus.NOT_FOUND, "user not found");
    }

    // if (ifUserExist.isDeleted || ifUserExist.isActive === isActive.BLOCKED) {
    //   throw new AppError(httpStatus.FORBIDDEN, "this user con not be updated");
    // }
    if (decodedTocken.Role === Role.USER || decodedTocken.Role === Role.GUIDE) {
      throw new AppError(httpStatus.FORBIDDEN, "ypu are not authorized");
    }
    if (
      decodedTocken.Role === Role.SUPER_ADMIN &&
      decodedTocken.Role === Role.ADMIN
    ) {
      throw new AppError(httpStatus.FORBIDDEN, "ypu are not authorized");
    }

    if (payload.isActive || payload.isDeleted || payload.isVerified) {
      throw new AppError(httpStatus.FORBIDDEN, "you are not authorized");
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

import httpStatus from "http-status";
import AppError from "../app/errorHalper/AppError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import bcryptjs from "bcryptjs";

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

const userServicecs = {
  createUser,
  getAllUser,
};
export default userServicecs;

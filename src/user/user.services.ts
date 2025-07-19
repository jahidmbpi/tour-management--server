import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (payload: Partial<IUser>) => {
  const { name, email } = payload;
  const user = await User.create({
    name,
    email,
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

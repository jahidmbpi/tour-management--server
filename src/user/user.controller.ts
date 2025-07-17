import { Request, Response } from "express";
import { User } from "./user.model";
import hthpStatus from "http-status";
const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({
      name,
      email,
    });
    res.status(hthpStatus.CREATED).json({
      success: true,
      massage: "user create success",
      creteduser: user,
    });
  } catch (error) {
    res.status(hthpStatus.BAD_REQUEST).json({
      massage: "something went wrong ",
      error,
    });
  }
};

export const userControlers = {
  createUser,
};

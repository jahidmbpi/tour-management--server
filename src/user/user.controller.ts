import { Request, Response } from "express";

import hthpStatus from "http-status";
import userServicecs from "./user.services";
const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userServicecs.createUser(req.body);
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

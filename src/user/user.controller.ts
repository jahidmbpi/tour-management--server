import { Request, Response, NextFunction } from "express";

import hthpStatus from "http-status";
import userServicecs from "./user.services";
import catchAsync from "../app/utilse/catchAsync";
import sendResponse from "../app/utilse/sendResponse";
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userServicecs.createUser(req.body);
    res.status(hthpStatus.CREATED).json({
      success: true,
      massage: "user create success",
      creteduser: user,
    });
  } catch (error) {
    next(error);
  }
};

const getAlluser = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await userServicecs.getAllUser();
    sendResponse(res, {
      success: true,
      statusCode: hthpStatus.OK,
      massage: " get all user  succesfully",
      data: users,
    });
  }
);

export const userControlers = {
  createUser,
  getAlluser,
};

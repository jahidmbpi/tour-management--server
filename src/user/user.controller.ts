import { Request, Response, NextFunction } from "express";

import hthpStatus from "http-status";
import userServicecs from "./user.services";
import catchAsync from "../app/utilse/catchAsync";
import sendResponse from "../app/utilse/sendResponse";
import { verifyTocken } from "../app/utilse/jwt";
import { envVars } from "../app/config/env";
import { JwtPayload } from "jsonwebtoken";
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
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id;
  const tocken = req.headers.authorization;
  const verifTocken = verifyTocken(
    tocken as string,
    envVars.JWT_ACCESS_SECRET
  ) as JwtPayload;
  const paload = req.body;
  try {
    const user = await userServicecs.updateUser(userId, paload, verifTocken);
    res.status(hthpStatus.CREATED).json({
      success: true,
      massage: "user create success",
      creteduser: user,
    });
  } catch (error) {
    next(error);
  }
};

export const userControlers = {
  createUser,
  getAlluser,
  updateUser,
};

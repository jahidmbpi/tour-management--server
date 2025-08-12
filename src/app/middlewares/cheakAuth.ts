import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status";
import AppError from "../errorHalper/AppError";
import { envVars } from "../config/env";
import { Role, isActive } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";

export const checkAuth = (...allowedRoles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
        throw new AppError(403, "No Token Recieved");
      }

      if (!envVars.JWT_ACCESS_SECRET) {
        throw new AppError(500, "JWT secret is not configured");
      }

      const verifyToken = jwt.verify(
        accessToken,
        envVars.JWT_ACCESS_SECRET
      ) as JwtPayload;

      const isUserExist = await User.findOne({
        email: verifyToken.email,
      }).lean();
      if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User does not exist");
      }

      if (isUserExist.isActive === isActive.BLOCKED) {
        throw new AppError(httpStatus.BAD_REQUEST, "User is blocked");
      }

      if (isUserExist.isDeleted) {
        throw new AppError(httpStatus.BAD_REQUEST, "User is deleted");
      }

      const userRole = verifyToken.role;

      if (!allowedRoles.includes(userRole)) {
        throw new AppError(403, "You are not permitted for this route");
      }

      req.user = verifyToken;

      next();
    } catch (error) {
      next(error);
    }
  };
};

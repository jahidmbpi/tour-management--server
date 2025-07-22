import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../errorHalper/AppError";
import { envVars } from "../config/env";
import { Role } from "../../user/user.interface";

// Modified version of checkAuth that accepts allowed roles
export const checkAuth = (...allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new AppError(401, "Access token is missing or malformed");
      }

      const accessToken = authHeader.split(" ")[1];

      if (!envVars.JWT_ACCESS_SECRET) {
        throw new AppError(500, "JWT secret is not configured");
      }

      const verifyToken = jwt.verify(
        accessToken,
        envVars.JWT_ACCESS_SECRET
      ) as JwtPayload;

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

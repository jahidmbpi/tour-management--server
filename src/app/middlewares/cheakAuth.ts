import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../errorHalper/AppError";
import { envVars } from "../config/env";
import { Role } from "../../user/user.interface";

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

    if (userRole !== Role.ADMIN && userRole !== Role.SUPER_ADMIN) {
      throw new AppError(403, "You are not permitted for this route");
    }

    // Optional: attach user info to req.user
    // req.user = verifyToken;

    next();
  } catch (error) {
    next(error);
  }
};

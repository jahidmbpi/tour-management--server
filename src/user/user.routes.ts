import { Router } from "express";
import { userControlers } from "./user.controller";
import { validateRequest } from "../app/utilse/validateRequest";
import { createUserZodSchema } from "./user.validation";

const router = Router();
router.post(
  "/register",
  validateRequest(createUserZodSchema),
  userControlers.createUser
);
router.get("/allUser", userControlers.getAlluser);

export const UserRoutes = router;

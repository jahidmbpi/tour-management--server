import { Router } from "express";
import { userControlers } from "./user.controller";
import { validateRequest } from "../app/utilse/validateRequest";
import { createUserZodSchema } from "./user.validation";
import { checkAuth } from "../app/middlewares/cheakAuth";

const router = Router();

router.post(
  "/register",
  validateRequest(createUserZodSchema),
  userControlers.createUser
);
router.get("/allUser", checkAuth, userControlers.getAlluser);

export const UserRoutes = router;

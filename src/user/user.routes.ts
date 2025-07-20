import { Router } from "express";
import { userControlers } from "./user.controller";
import { validateRequest } from "../app/utilse/validateRequest";
import { createUserZodSchema } from "./user.validation";
import { checkAuth } from "../app/middlewares/cheakAuth";
import { Role } from "./user.interface";

const router = Router();

router.post(
  "/register",
  validateRequest(createUserZodSchema),
  userControlers.createUser
);
router.get(
  "/allUser",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  userControlers.getAlluser
);
router.patch(
  "/:id",
  checkAuth(...Object.values(Role)),

  userControlers.updateUser
);

export const UserRoutes = router;

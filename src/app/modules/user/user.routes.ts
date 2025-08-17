import { Router } from "express";
import { userControlers } from "./user.controller";
import { validateRequest } from "../../utilse/validateRequest";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";
import { checkAuth } from "../../middlewares/cheakAuth";
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
router.get("/me", checkAuth(...Object.values(Role)), userControlers.getMe);
router.patch(
  "/:id",
  validateRequest(updateUserZodSchema),
  checkAuth(...Object.values(Role)),

  userControlers.updateUser
);

export const UserRoutes = router;

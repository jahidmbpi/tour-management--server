import { Router } from "express";
import { authControllers } from "./auth.controller";
import { checkAuth } from "../../middlewares/cheakAuth";

import { Role } from "../../../user/user.interface";

const router = Router();

router.post("/login", authControllers.credentialLogin);
router.post("/refresh-tocken", authControllers.getnewAccessTocken);
router.post("/logout", authControllers.logOut);
router.post(
  "/reset-password",
  checkAuth(...Object.values(Role)),
  authControllers.resetPassword
);

export const AuthRoute = router;

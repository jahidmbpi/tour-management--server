import { Request, Response, Router } from "express";
import { authControllers } from "./auth.controller";
import { checkAuth } from "../../middlewares/cheakAuth";

import { Role } from "../../../user/user.interface";
import passport from "passport";

const router = Router();

router.post("/login", authControllers.credentialLogin);
router.post("/refresh-tocken", authControllers.getnewAccessTocken);
router.post("/logout", authControllers.logOut);
router.post(
  "/reset-password",
  checkAuth(...Object.values(Role)),
  authControllers.resetPassword
);

router.get("/google", (req: Request, res: Response) => {
  passport.authenticate("google", { scope: ["profile", "email"] })(req, res);
});

router.get("/google/callback", authControllers.googleCallback);

export const AuthRoute = router;

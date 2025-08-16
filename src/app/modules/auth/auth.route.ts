import { Request, Response, Router } from "express";
import { authControllers } from "./auth.controller";
import { checkAuth } from "../../middlewares/cheakAuth";

import { Role } from "../user/user.interface";
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
router.post(
  "/change-password",
  checkAuth(...Object.values(Role)),
  authControllers.changePassword
);
router.post(
  "/set-password",
  checkAuth(...Object.values(Role)),
  authControllers.setPassword
);

router.get("/google", (req: Request, res: Response) => {
  const redirect = req.query.redirect || "/";
  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: redirect as string,
  })(req, res);
});

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  authControllers.googleCallback
);

export const AuthRoute = router;

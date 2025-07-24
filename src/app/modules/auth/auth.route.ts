import { Router } from "express";
import { authControllers } from "./auth.controller";

const router = Router();

router.post("/login", authControllers.credentialLogin);
router.post("/refresh-tocken", authControllers.getnewAccessTocken);
router.post("/logout", authControllers.logOut);
export const AuthRoute = router;

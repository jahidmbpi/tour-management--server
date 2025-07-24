import { Router } from "express";
import { authControllers } from "./auth.controller";

const router = Router();

router.post("/login", authControllers.credentialLogin);
router.post("/refresh-tocken", authControllers.getnewAccessTocken);
export const AuthRoute = router;

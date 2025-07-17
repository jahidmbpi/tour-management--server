import { Router } from "express";
import { userControlers } from "./user.controller";

const router = Router();
router.post("/register", userControlers.createUser);

export const UserRoutes = router;

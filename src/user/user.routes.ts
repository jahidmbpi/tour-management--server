import { Router } from "express";
import { userControlers } from "./user.controller";

const router = Router();
router.post("/register", userControlers.createUser);
router.get("/allUser", userControlers.getAlluser);

export const UserRoutes = router;

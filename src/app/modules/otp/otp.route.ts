import { Router } from "express";
import { otpController } from "./otp.controllers";
const router = Router();

router.post("/send", otpController.sendOtp);

export const otpRoute = router;

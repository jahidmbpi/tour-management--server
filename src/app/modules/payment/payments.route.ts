import { Router } from "express";
import { paymentController } from "./payment.controllers";

const router = Router();

router.post("/success", paymentController.successPayment);

export const paymentRoute = router;

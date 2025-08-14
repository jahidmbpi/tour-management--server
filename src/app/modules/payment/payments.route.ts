import { Router } from "express";
import { paymentController } from "./payment.controllers";

const router = Router();
router.post("/init-payment/:bookingId", paymentController.initPayment);
router.post("/success", paymentController.successPayment);
router.post("/fail", paymentController.faildPayment);
router.post("/cancel", paymentController.cenceleddPayment);

export const paymentRoute = router;

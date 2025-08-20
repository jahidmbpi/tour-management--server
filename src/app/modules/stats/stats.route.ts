import { Router } from "express";
import { statsController } from "./stats.controllers";
import { checkAuth } from "../../middlewares/cheakAuth";
import { Role } from "../user/user.interface";

const router = Router();

router.get(
  "/user",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  statsController.getuser
);
router.get(
  "/tour",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  statsController.getTour
);
router.get(
  "/booking",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  statsController.getBooking
);
router.get(
  "/payment",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  statsController.getPayment
);
export const statsRoute = router;

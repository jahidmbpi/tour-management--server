import { Router } from "express";
import { bookingController } from "./booking.controllers";
import { checkAuth } from "../../middlewares/cheakAuth";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../utilse/validateRequest";
import { bookingZodSchema } from "./booking.validation";

const router = Router();

router.post(
  "/create",
  checkAuth(...Object.values(Role)),
  validateRequest(bookingZodSchema),
  bookingController.createBooking
);

//create booking.....  aita sobai korte parbe

//get all booking........ aita admin and super admin korte parbe

//get my booking----sobai access korte parbe
// get single booking but aita sudo nijer ta nije dekhte parbe
// upadate bookin status for specific bokking

export const bookingRoutes = router;

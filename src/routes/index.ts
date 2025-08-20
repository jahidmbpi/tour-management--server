import { AuthRoute } from "../app/modules/auth/auth.route";
import { bookingRoutes } from "../app/modules/booking/booking.route";
import { divisionRoute } from "../app/modules/devision/division.routes";
import { paymentRoute } from "../app/modules/payment/payments.route";
import { tourTypeRoutes } from "../app/modules/tour-type/tourType.routes";
import { tourRoutes } from "../app/modules/tour/tour.route";
import { UserRoutes } from "../app/modules/user/user.routes";
import { Router } from "express";
import { otpRoute } from "../app/modules/otp/otp.route";
import { statsRoute } from "../app/modules/stats/stats.route";

const router = Router();
const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoute,
  },
  {
    path: "/tour",
    route: tourRoutes,
  },
  {
    path: "/division",
    route: divisionRoute,
  },
  {
    path: "/tourType",
    route: tourTypeRoutes,
  },
  {
    path: "/booking",
    route: bookingRoutes,
  },
  {
    path: "/payment",
    route: paymentRoute,
  },
  {
    path: "/otp",
    route: otpRoute,
  },
  {
    path: "stats",
    route: statsRoute,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;

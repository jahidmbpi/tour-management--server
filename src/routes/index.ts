import { AuthRoute } from "../app/modules/auth/auth.route";
import { divisionRoute } from "../app/modules/devision/division.routes";
import { tourRoutes } from "../app/modules/tour/tour.route";
import { UserRoutes } from "./../user/user.routes";
import { Router } from "express";

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
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;

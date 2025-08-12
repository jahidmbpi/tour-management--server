import { AuthRoute } from "../app/modules/auth/auth.route";
import { divisionRoute } from "../app/modules/devision/division.routes";
import { tourTypeRoutes } from "../app/modules/tour-type/tourType.routes";
import { tourRoutes } from "../app/modules/tour/tour.route";
import { UserRoutes } from "../app/modules/user/user.routes";
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
  {
    path: "/tourType",
    route: tourTypeRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;

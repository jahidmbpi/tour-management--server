import { AuthRoute } from "../app/modules/auth/auth.route";
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
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;

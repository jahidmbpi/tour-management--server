import { Router } from "express";

import { tourController } from "./tour.controllers";
import { checkAuth } from "../../middlewares/cheakAuth";
import { Role } from "../../../user/user.interface";
import { validateRequest } from "../../utilse/validateRequest";
import { createTourZodSchema } from "./tour.validation";

const router = Router();

router.post(
  "/create-tour",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(createTourZodSchema),
  tourController.createTour
);

export const tourRoutes = router;

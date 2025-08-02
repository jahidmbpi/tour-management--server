import { Router } from "express";
import { tourController } from "./tour.controllers";
import { checkAuth } from "../../middlewares/cheakAuth";
import { Role } from "../../../user/user.interface";
import { validateRequest } from "../../utilse/validateRequest";
import { createTourZodSchema, updateTourZodSchema } from "./tour.validation";

const router = Router();

router.post(
  "/create-tour",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(createTourZodSchema),
  tourController.createTour
);

router.get(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  tourController.getAllTour
);

router.patch(
  "/update-tour/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(updateTourZodSchema),
  tourController.updateTour
);

router.delete(
  "/delete-tour/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  tourController.deleteTour
);
//  tour type

export const tourRoutes = router;

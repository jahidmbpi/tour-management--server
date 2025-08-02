import { Router } from "express";
import { checkAuth } from "../../middlewares/cheakAuth";
import { Role } from "../../../user/user.interface";
import { createTourTypeZodSchema } from "../tour/tour.validation";
import { validateRequest } from "../../utilse/validateRequest";
import { tourTypeController } from "./tourType.controllers";
const router = Router();
router.post(
  "/create-tour-type",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(createTourTypeZodSchema),
  tourTypeController.createTourType
);

router.get(
  "/getalltourType",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  tourTypeController.getAllTourType
);

router.patch(
  "/update/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(createTourTypeZodSchema),
  tourTypeController.updateTourType
);

router.delete(
  "/delete/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  tourTypeController.deleteTourType
);

export const tourTypeRoutes = router;

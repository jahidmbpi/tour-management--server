import { Router } from "express";
import { divisionController } from "./division.controllers";
import { checkAuth } from "../../middlewares/cheakAuth";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../utilse/validateRequest";
import {
  cretaeDivisionZodSchema,
  updateDivisionZodSchema,
} from "./division.validation";
const router = Router();

router.post(
  "/create-division",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(cretaeDivisionZodSchema),
  divisionController.createDivision
);

router.get("/", divisionController.getAllDivision);
router.patch(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(updateDivisionZodSchema),
  divisionController.updateDivision
);
router.delete(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  divisionController.deleteDivision
);

export const divisionRoute = router;

import hthpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import { divisionServices } from "./division.services";
const createDivision = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await divisionServices.createDivision(req.body);
    res.status(hthpStatus.CREATED).json({
      success: true,
      massage: "division create successfully",
      createDivision: result,
    });
  } catch (error) {
    next(error);
  }
};

// const getAllDivision = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     console.log("cretae division");
//   } catch (error) {
//     next(error);
//   }
// };

// const updateDivision = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     console.log("cretae division");
//   } catch (error) {
//     next(error);
//   }
// };
// const deleteDivision = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     console.log("cretae division");
//   } catch (error) {
//     next(error);
//   }
// };
export const divisionController = {
  createDivision,
  // getAllDivision,
  // updateDivision,
  // deleteDivision,
};

import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";

const createTour = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(httpStatus.CREATED).json({
      success: true,
      massage: "user create success",
      creteTour: null,
    });

    console.log("cretae tour");
  } catch (error) {
    next(error);
  }
};
// const getAllTour = (req: Request, res: Response, next: NextFunction) => {
//   try {
//     res.status(hthpStatus.CREATED).json({
//       success: true,
//       massage: "user create success",
//       creteTour: null,
//     });

//     console.log("cretae tour");
//   } catch (error) {
//     next(error);
//   }
// };
// const updateTour = (req: Request, res: Response, next: NextFunction) => {
//   try {
//     res.status(hthpStatus.CREATED).json({
//       success: true,
//       massage: "user create success",
//       creteTour: null,
//     });

//     console.log("cretae tour");
//   } catch (error) {
//     next(error);
//   }
// };
// const deleteTour = (req: Request, res: Response, next: NextFunction) => {
//   try {
//     res.status(hthpStatus.CREATED).json({
//       success: true,
//       massage: "user create success",
//       creteTour: null,
//     });

//     console.log("cretae tour");
//   } catch (error) {
//     next(error);
//   }
// };
export const tourController = {
  createTour,
  //   getAllTour,
  //   updateTour,
  //   deleteTour,
};

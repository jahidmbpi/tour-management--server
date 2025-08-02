/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import { tourTypeServices } from "./tourType.services";
import catchAsync from "../../utilse/catchAsync";
import httpStatus from "http-status";
const createTourType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await tourTypeServices.cretaeTourType(req.body);

    res.status(httpStatus.CREATED).json({
      success: true,
      message: "tour type create successfully",
      tourType: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllTourType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await tourTypeServices.getAllTourType();
    res.status(httpStatus.CREATED).json({
      success: true,
      message: "tour type create successfully",
      tourType: result,
    });
  }
);

const updateTourType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await tourTypeServices.updateTourType(id, req.body);
    res.status(httpStatus.OK).json({
      success: true,
      message: "upadated tour type successfully",
      tourType: result,
    });
  }
);
const deleteTourType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await tourTypeServices.deletetourType(id);
    res.status(httpStatus.OK).json({
      success: true,
      message: "upadated tour type successfully",
      deleteTour: result,
    });
  }
);

export const tourTypeController = {
  createTourType,
  getAllTourType,
  deleteTourType,
  updateTourType,
};

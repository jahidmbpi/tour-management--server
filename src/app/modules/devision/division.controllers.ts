import hthpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import { divisionServices } from "./division.services";
import catchAsync from "../../utilse/catchAsync";
import sendResponse from "../../utilse/sendResponse";
import { IDivission } from "./division.interface";

const createDivision = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload: IDivission = {
      ...req.body,
      thumbnail: req.file?.path,
    };
    const result = await divisionServices.createDivision(payload);
    res.status(hthpStatus.CREATED).json({
      success: true,
      massage: "division create successfully",
      createDivision: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllDivision = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await divisionServices.getAllDivision();
    res.status(hthpStatus.OK).json({
      success: true,
      massage: "all division find success",
      allDivision: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateDivision = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await divisionServices.updateDivision(id, req.body);
    sendResponse(res, {
      success: true,
      statusCode: hthpStatus.OK,
      massage: " division updated succesfully",
      data: result,
    });
  }
);

const deleteDivision = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const result = await divisionServices.deleteDivision(id);

    res.status(hthpStatus.OK).json({
      success: true,
      statusCode: hthpStatus.OK,
      message: "Division deleted successfully",
      data: result,
    });
  }
);

export const divisionController = {
  createDivision,
  getAllDivision,
  updateDivision,
  deleteDivision,
};

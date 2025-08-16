import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";
import { tourServices } from "./tour.services";
import sendResponse from "../../utilse/sendResponse";
import { ITour } from "./tour.interface";

const createTour = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload: ITour = {
      ...req.body,
      images: (req.files as Express.Multer.File[]).map((file) => file.path),
    };

    const result = await tourServices.createTour(payload);

    res.status(httpStatus.CREATED).json({
      success: true,
      massage: "user create success",
      creteTour: result,
    });
  } catch (error) {
    next(error);
  }
};
const getAllTour = async (req: Request, res: Response, next: NextFunction) => {
  const query = req.query;
  const result = await tourServices.getAllTur(query as Record<string, string>);
  console.log(result);
  try {
    res.status(httpStatus.OK).json({
      success: true,
      massage: "all tour get success",
      allTour: result,
    });
  } catch (error) {
    next(error);
  }
};
const updateTour = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const Result = await tourServices.updateTour(id, req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      massage: "Tour updated successfully",
      data: Result,
    });
  } catch (error) {
    next(error);
  }
};
const deleteTour = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const result = await tourServices.deleteTour(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      massage: "Tour deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const tourController = {
  createTour,
  getAllTour,
  updateTour,
  deleteTour,
};

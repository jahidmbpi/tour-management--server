import { Request, Response } from "express";
import catchAsync from "../../utilse/catchAsync";
import sendResponse from "../../utilse/sendResponse";
import { bookingServices } from "./booking.services";
import { JwtPayload } from "jsonwebtoken";

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const decodeToken = req.user as JwtPayload;
  console.log(req.body);
  const booking = await bookingServices.createBooking(
    req.body,
    decodeToken.userId
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    massage: "booking create successfully",
    data: booking,
  });
});
const getUserBooking = catchAsync(async (req: Request, res: Response) => {
  const booking = await bookingServices.getUserBooking();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    massage: "Tour updated successfully",
    data: booking,
  });
});
const getBookingById = catchAsync(async (req: Request, res: Response) => {
  const booking = await bookingServices.getBookingById();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    massage: "Tour updated successfully",
    data: booking,
  });
});
const updateBookingStatus = catchAsync(async (req: Request, res: Response) => {
  const booking = await bookingServices.updateBookingStatus();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    massage: "Tour updated successfully",
    data: booking,
  });
});
const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const booking = await bookingServices.getAllBookings();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    massage: "Tour updated successfully",
    data: booking,
  });
});

export const bookingController = {
  createBooking,
  getUserBooking,
  getBookingById,
  updateBookingStatus,
  getAllBookings,
};

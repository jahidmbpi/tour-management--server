import hthpStatus from "http-status";
import catchAsync from "../../utilse/catchAsync";
import sendResponse from "../../utilse/sendResponse";
import { statsServices } from "./stats.services";

const getuser = catchAsync(async (req, res) => {
  const result = await statsServices.getUser();
  sendResponse(res, {
    success: true,
    statusCode: hthpStatus.OK,
    massage: "  your profile retrived succesfully",
    data: result,
  });
});

const getBooking = catchAsync(async (req, res) => {
  const result = await statsServices.getBooking();
  sendResponse(res, {
    success: true,
    statusCode: hthpStatus.OK,
    massage: "  your profile retrived succesfully",
    data: result,
  });
});
const getTour = catchAsync(async (req, res) => {
  const result = await statsServices.getTour();
  sendResponse(res, {
    success: true,
    statusCode: hthpStatus.OK,
    massage: "  your profile retrived succesfully",
    data: result,
  });
});
const getPayment = catchAsync(async (req, res) => {
  const result = await statsServices.getPayment();
  sendResponse(res, {
    success: true,
    statusCode: hthpStatus.OK,
    massage: "  your profile retrived succesfully",
    data: result,
  });
});
export const statsController = {
  getuser,
  getBooking,
  getTour,
  getPayment,
};

import hthpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../utilse/catchAsync";
import sendResponse from "../../utilse/sendResponse";
import { otpServices } from "./otp.services";

const sendOtp = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;
  console.log(email);
  const resust = await otpServices.sendOtp(email);
  console.log(resust);
  sendResponse(res, {
    success: true,
    statusCode: hthpStatus.OK,
    massage: " otp send succesfully",
    data: null,
  });
});

const verifydOtp = catchAsync(async (req: Request, res: Response) => {
  sendResponse(res, {
    success: true,
    statusCode: hthpStatus.OK,
    massage: "  otp verify succesfully",
    data: null,
  });
});

export const otpController = {
  sendOtp,
  verifydOtp,
};

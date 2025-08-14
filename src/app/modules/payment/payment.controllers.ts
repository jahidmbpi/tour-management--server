import { Request, Response } from "express";
import catchAsync from "../../utilse/catchAsync";
import { paymentServices } from "./payment.services";
import { envVars } from "../../config/env";

import sendResponse from "../../utilse/sendResponse";

const successPayment = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  console.log("controller", query.transectionId);

  const result = await paymentServices.successPayment(
    query as Record<string, string>
  );

  if (result.success) {
    res.redirect(
      `${envVars.SSL.SSL_SUCCESS_FRONTEND_URL}?transactionId=${query.transectionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`
    );
  }
});
const faildPayment = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  console.log("controller", query.transectionId);

  const result = await paymentServices.failedPayment(
    query as Record<string, string>
  );

  if (result.success) {
    res.redirect(
      `${envVars.SSL.SSL_FAIL_FRONTEND_URL}?transactionId=${query.transectionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`
    );
  }
});

const cenceleddPayment = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  console.log("controller", query.transectionId);

  const result = await paymentServices.canceldPayment(
    query as Record<string, string>
  );

  if (result.success) {
    res.redirect(
      `${envVars.SSL.SSL_CANCEL_FRONTEND_URL}?transactionId=${query.transectionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`
    );
  }
});
const initPayment = catchAsync(async (req: Request, res: Response) => {
  const bookingId = req.params.bookingId;
  const result = await paymentServices.initPayment(bookingId as string);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    massage: "Payment done successfully",
    data: result,
  });
});

export const paymentController = {
  successPayment,
  faildPayment,
  cenceleddPayment,
  initPayment,
};

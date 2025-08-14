import { Request, Response } from "express";
import catchAsync from "../../utilse/catchAsync";
import { paymentServices } from "./payment.services";
import { envVars } from "../../config/env";

const successPayment = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  console.log("controller", query.transectionId);

  const result = await paymentServices.successPayment(
    query as Record<string, string>
  );

  if (result.success) {
    res.redirect(envVars.SSL.SSL_SUCCESS_FRONTEND_URL);
  }
});

export const paymentController = { successPayment };

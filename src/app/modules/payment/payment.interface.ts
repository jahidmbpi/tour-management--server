/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from "mongoose";

export enum PAYMENT_STATUS {
  PAID = "PAID",
  UNPAID = "UNPAID",
  CENCELLED = "CENCELLED",
  REFUND = "REFUND",
  FAILLED = "FAILLED",
}

export interface IPayment {
  booking: Types.ObjectId;
  transectionId?: any;
  amount: number;
  paymentGetWayData?: any;
  invoiceUrl?: string;
  status: PAYMENT_STATUS;
  createdAt?: Date;
}

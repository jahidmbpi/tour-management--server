import { Types } from "mongoose";

export enum BOOKING_STATUS {
  PENDING = "PENDING",
  COMPLATE = "COMPLATE",
  FAILED = "FAILED",
  CENCELED = "CENCELED",
}

export interface IBooking {
  user: Types.ObjectId;
  tour: Types.ObjectId;
  payments?: Types.ObjectId;
  geustCount: number;
  status: BOOKING_STATUS;
}

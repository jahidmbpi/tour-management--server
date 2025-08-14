import { model, Schema } from "mongoose";
import { BOOKING_STATUS, IBooking } from "./booking.interface";

export const bookingSchema = new Schema<IBooking>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    tour: { type: Schema.Types.ObjectId, ref: "Tour", required: true },
    payment: { type: Schema.Types.ObjectId, ref: "Payment" },
    status: {
      type: String,
      enum: Object.values(BOOKING_STATUS),
      default: BOOKING_STATUS.PENDING,
    },
    geustCount: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Booking = model("Booking", bookingSchema);

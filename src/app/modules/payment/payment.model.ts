import { model, Schema } from "mongoose";
import { IPayment, PAYMENT_STATUS } from "./payment.interface";

export const paymentSchema = new Schema<IPayment>(
  {
    booking: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
      unique: true,
    },
    transectionId: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    invoiceUrl: { type: String },
    status: {
      type: String,
      enum: Object.values(PAYMENT_STATUS),
      default: PAYMENT_STATUS.UNPAID,
    },
    paymentGetWayData: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export const Payment = model("Payment", paymentSchema);

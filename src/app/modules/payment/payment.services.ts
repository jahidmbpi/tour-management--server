import httpStatus from "http-status";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BOOKING_STATUS } from "../booking/booking.interface";
import { Booking } from "../booking/booking.model";
import { PAYMENT_STATUS } from "./payment.interface";
import { Payment } from "./payment.model";
import AppError from "../../errorHalper/AppError";

const successPayment = async (query: Record<string, string>) => {
  console.log(query);

  const session = await Booking.startSession();
  session.startTransaction();

  try {
    const updatedPayment = await Payment.findOneAndUpdate(
      {
        transectionId: query.transectionId,
      },
      {
        status: PAYMENT_STATUS.PAID,
      },
      {
        session,
      }
    );

    if (!updatedPayment) {
      throw new AppError(httpStatus.BAD_REQUEST, "No updated payment found");
    }

    const bookingUpdate = await Booking.findByIdAndUpdate(
      updatedPayment.booking,
      { status: BOOKING_STATUS.COMPLATE },
      { new: true, runValidators: true }
    )
      .session(session)
      .populate("user", "name email phone address")
      .populate("tour", "title costFrom");

    await session.commitTransaction();
    session.endSession();

    return {
      success: true,
      message: "Payment success",
      booking: bookingUpdate,
    };
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const failedPayment = async (query: Record<string, string>) => {
  console.log(query);

  const session = await Booking.startSession();
  session.startTransaction();

  try {
    const updatedPayment = await Payment.findOneAndUpdate(
      {
        transectionId: query.transectionId,
      },
      {
        status: PAYMENT_STATUS.FAILLED,
      },
      {
        session,
      }
    );

    if (!updatedPayment) {
      throw new AppError(httpStatus.BAD_REQUEST, "No updated payment found");
    }

    const bookingUpdate = await Booking.findByIdAndUpdate(
      updatedPayment.booking,
      { status: BOOKING_STATUS.FAILED },
      { new: true, runValidators: true }
    )
      .session(session)
      .populate("user", "name email phone address")
      .populate("tour", "title costFrom");

    await session.commitTransaction();
    session.endSession();

    return {
      success: false,
      message: "Payment failed",
      booking: bookingUpdate,
    };
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
const canceldPayment = async (query: Record<string, string>) => {
  console.log(query);

  const session = await Booking.startSession();
  session.startTransaction();

  try {
    const updatedPayment = await Payment.findOneAndUpdate(
      {
        transectionId: query.transectionId,
      },
      {
        status: PAYMENT_STATUS.CENCELLED,
      },
      {
        session,
      }
    );

    if (!updatedPayment) {
      throw new AppError(httpStatus.BAD_REQUEST, "No updated payment found");
    }

    const bookingUpdate = await Booking.findByIdAndUpdate(
      updatedPayment.booking,
      { status: BOOKING_STATUS.CENCELED },
      { new: true, runValidators: true }
    )
      .session(session)
      .populate("user", "name email phone address")
      .populate("tour", "title costFrom");

    await session.commitTransaction();
    session.endSession();

    return {
      success: false,
      message: "Payment canceld",
      booking: bookingUpdate,
    };
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
export const paymentServices = {
  successPayment,
  failedPayment,
  canceldPayment,
};

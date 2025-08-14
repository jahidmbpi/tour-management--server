/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errorHalper/AppError";
import { User } from "../user/user.model";
import { BOOKING_STATUS, IBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { Payment } from "../payment/payment.model";
import { PAYMENT_STATUS } from "../payment/payment.interface";
import { Tour } from "../tour/tour.model";

import { ISslcomarz } from "../sslcomarz/sslCommarz.interface";
import { paymentinit } from "../sslcomarz/sslcommarz.services";

const getTransectionId = () => {
  return `tran_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
};

const createBooking = async (payload: Partial<IBooking>, userId: string) => {
  const transectionId = getTransectionId();
  const sessation = await Booking.startSession();
  sessation.startTransaction();
  try {
    const user = await User.findById(userId);

    if (!user?.phone || !user?.address) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "please update user profile to book tour"
      );
    }

    const tour = await Tour.findById(payload.tour).select("costFrom");

    if (!tour?.costFrom) {
      throw new AppError(httpStatus.BAD_REQUEST, "no tour costFrom found");
    }

    if (!payload?.geustCount) {
      throw new AppError(httpStatus.BAD_REQUEST, "guest count not found");
    }

    const amount = Number(tour.costFrom) * Number(payload.geustCount);

    const booking = await Booking.create(
      [
        {
          user: userId,
          status: BOOKING_STATUS.PENDING,
          ...payload,
        },
      ],
      { sessation }
    );
    const payment = await Payment.create(
      [
        {
          booking: booking[0]._id,
          status: PAYMENT_STATUS.UNPAID,
          transectionId,
          amount,
        },
      ],
      { sessation }
    );

    const updatedBooking = await Booking.findByIdAndUpdate(
      booking[0]._id,
      {
        payment: payment[0]._id,
      },
      {
        new: true,
        runValidators: true,
        session: sessation,
      }
    )
      .populate("user", "name email phone address")
      .populate("tour", "title costFrom")
      .populate("payment");

    const userAddress = (updatedBooking?.user as any).address;
    const userEmail = (updatedBooking?.user as any).email;
    const username = (updatedBooking?.user as any).name;
    const sslpayload: ISslcomarz = {
      address: userAddress,
      email: userEmail,
      name: username,
      amount: amount,
      transectionId: transectionId,
      phoneNumber: (updatedBooking?.user as any).phone,
    };

    const sslpayment = await paymentinit.paymentInit(sslpayload);

    await sessation.commitTransaction();
    sessation.endSession();

    return { booking: updatedBooking, paymentUrl: sslpayment.GatewayPageURL };
  } catch (error) {
    await sessation.abortTransaction();
    sessation.endSession();
    // throw new AppError(httpStatus.BAD_REQUEST, error) ❌❌
    throw error;
  }
};

const getUserBooking = () => {
  return {};
};

const getBookingById = () => {
  return {};
};

const updateBookingStatus = () => {
  return {};
};
const getAllBookings = () => {
  return {};
};

export const bookingServices = {
  createBooking,
  getBookingById,
  getUserBooking,
  updateBookingStatus,
  getAllBookings,
};

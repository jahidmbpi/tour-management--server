import httpStatus from "http-status";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BOOKING_STATUS } from "../booking/booking.interface";
import { Booking } from "../booking/booking.model";
import { PAYMENT_STATUS } from "./payment.interface";
import { Payment } from "./payment.model";
import AppError from "../../errorHalper/AppError";
import { sslService } from "../sslcomarz/sslcommarz.services";
import { ISslcomarz } from "../sslcomarz/sslCommarz.interface";
import { genaretePdf, IInvoice } from "../../utilse/invoice";
import { ITour } from "../tour/tour.interface";
import { IUser } from "../user/user.interface";
import sendEmail from "../../utilse/sendmail";

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
    if (!bookingUpdate) {
      throw new AppError(httpStatus.BAD_REQUEST, "Booking not found");
    }

    const invoiceData: IInvoice = {
      bookingDate: bookingUpdate?.createdAt || new Date(),
      totalAmount: updatedPayment.amount,
      geustCount: bookingUpdate.geustCount,
      tourTitle: (bookingUpdate?.tour as unknown as ITour).title,
      transectionId: updatedPayment.transectionId,
      userName: (bookingUpdate.user as unknown as IUser).name,
    };

    const pdfBuffer = await genaretePdf(invoiceData);

    sendEmail({
      to: (bookingUpdate.user as unknown as IUser).email,
      subject: "your booking invoice ",
      template: "invoice",
      templateData: pdfBuffer as Record<string, any>,
      attachments: [
        {
          filename: "invoice.pdf",
          content: JSON.stringify(pdfBuffer, null, 2),
          contentType: "application/pdf",
        },
      ],
    });

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
const initPayment = async (bookingId: string) => {
  const payment = await Payment.findOne({ booking: bookingId });

  if (!payment) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Payment Not Found. You have not booked this tour"
    );
  }

  const booking = await Booking.findById(payment.booking);

  const userAddress = (booking?.user as any).address;
  const userEmail = (booking?.user as any).email;
  const userPhoneNumber = (booking?.user as any).phone;
  const userName = (booking?.user as any).name;

  const sslPayload: ISslcomarz = {
    address: userAddress,
    email: userEmail,
    phoneNumber: userPhoneNumber,
    name: userName,
    amount: payment.amount,
    transectionId: payment.transectionId,
  };

  const sslPayment = await sslService.paymentInit(sslPayload);

  return {
    paymentUrl: sslPayment.GatewayPageURL,
  };
};

export const paymentServices = {
  successPayment,
  failedPayment,
  canceldPayment,
  initPayment,
};

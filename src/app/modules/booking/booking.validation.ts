import z from "zod";
import { BOOKING_STATUS } from "./booking.interface";

export const bookingZodSchema = z.object({
  tour: z.string({ message: "tour id must be string" }),
  geustCount: z.number().int().positive(),
});

export const updateBookingZodSchema = z.object({
  status: z.enum(Object.values(BOOKING_STATUS)),
});

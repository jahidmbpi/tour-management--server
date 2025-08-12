import z from "zod";

export const bookingZodSchema = z.object({
  user: z.string({ message: "user id must be string" }),
  tour: z.string({ message: "tour id must be string" }),
  payments: z.string({ message: "tour id must be string" }),
  status: z.string(),
  geustCount: z.number(),
});

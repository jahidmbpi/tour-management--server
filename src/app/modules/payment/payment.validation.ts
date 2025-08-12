import z from "zod";

export const paymentZodSchema = z.object({
  booking: z.string(),
  transectionId: z.string().optional(),
  amount: z.number(),
  invoiceUrl: z.string().optional(),
  status: z.string(),
  paymentGetWayData: z.any().optional(),
});

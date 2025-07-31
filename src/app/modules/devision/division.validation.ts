import z from "zod";

export const cretaeDivisionZodSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1, "Slug is required"),
  thumbnail: z.string().optional(),
  description: z.string().optional(),
});

export const updateDivisionZodSchema = z.object({
  name: z.string().min(1),
  thumbnail: z.string().optional(),
  description: z.string().optional(),
  slug: z.string().min(1, "Slug is required"),
});

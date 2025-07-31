import z from "zod";

export const createTourZodSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  costFrom: z.number().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  tourType: z.string().optional(),
  division: z.string().optional,
  minAge: z.number().optional(),
  maxGuest: z.number().optional(),
  amenities: z.array(z.string()).optional(),
  excluded: z.array(z.string()).optional(),
  included: z.array(z.string()).optional(),
  tourPlan: z.array(z.string()).optional(),
  departureLocation: z.string().optional(),
  arrivalLocation: z.string().optional(),
});

export const updateTourZodSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  costFrom: z.number().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  tourType: z.string().optional(),
  division: z.string().optional,
  minAge: z.number().optional(),
  maxGuest: z.number().optional(),
  amenities: z.array(z.string()).optional(),
  excluded: z.array(z.string()).optional(),
  included: z.array(z.string()).optional(),
  tourPlan: z.array(z.string()).optional(),
  departureLocation: z.string().optional(),
  arrivalLocation: z.string().optional(),
});

export const cretaeTourTypeZodSchema = z.object({
  name: z.string(),
});

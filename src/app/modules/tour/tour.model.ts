import { model, Schema } from "mongoose";
import { ITour, ITourType } from "./tour.interface";

const tourTypesSchema = new Schema<ITourType>(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const tourType = model<ITourType>("Tour", tourTypesSchema);

const tourSchema = new Schema<ITour>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    images: { type: [String], default: [] },
    location: { type: String },
    costFrom: { type: Number },
    startDate: { type: Date },
    endDate: { type: Date },
    included: { type: [String], default: [] },
    excluded: { type: [String], default: [] },
    amenities: { type: [String], default: [] },
    tourPlan: { type: [String] },
    maxGuest: { type: Number },
    minAge: { type: Number },
    departureLocation: { type: String },
    arrivalLocation: { type: String },
    division: {
      type: Schema.Types.ObjectId,
      ref: "Division",
      required: true,
    },
    tourType: { type: Schema.Types.ObjectId, ref: "Tour", required: true },
  },
  {
    timestamps: true,
  }
);

export const Tour = model<ITour>("Tour", tourSchema);

import { model, Schema } from "mongoose";
import { ITourType } from "./tourType.interface";

const tourTypesSchema = new Schema<ITourType>(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
export const TourType = model<ITourType>("TourType", tourTypesSchema);

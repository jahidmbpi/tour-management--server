import { model, Schema } from "mongoose";
import { IDivission } from "./division.interface";

const divisionChema = new Schema<IDivission>(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, unique: true },
    thumbnail: { type: String },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Division = model<IDivission>("Division", divisionChema);

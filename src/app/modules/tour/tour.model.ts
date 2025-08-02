import { model, Schema } from "mongoose";
import { ITour } from "./tour.interface";

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

tourSchema.pre("save", async function (next) {
  if (this.isModified("title")) {
    const baseSlug = this.title.toLowerCase().split(" ").join("-");
    const slugBase = `${baseSlug}`;

    let counter = 1;
    let uniqueSlug = slugBase;

    while (await Tour.exists({ slug: uniqueSlug })) {
      uniqueSlug = `${slugBase}-${counter++}`;
    }

    this.slug = uniqueSlug;
  }

  next();
});

tourSchema.pre("findOneAndUpdate", async function (next) {
  const tour = this.getUpdate() as Partial<ITour>;

  if (tour.title) {
    const baseSlug = tour.title.toLowerCase().split(" ").join("-");
    const slugBase = `${baseSlug}`;

    let counter = 1;
    let uniqueSlug = slugBase;

    while (await Tour.exists({ slug: uniqueSlug })) {
      uniqueSlug = `${slugBase}-${counter++}`;
    }

    tour.slug = uniqueSlug;
  }

  this.setUpdate(tour);

  next();
});

export const Tour = model<ITour>("Tour", tourSchema);

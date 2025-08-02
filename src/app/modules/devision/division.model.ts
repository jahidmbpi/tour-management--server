import { model, Schema } from "mongoose";

import { HydratedDocument } from "mongoose";
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
divisionChema.pre(
  "save",
  async function (this: HydratedDocument<IDivission>, next) {
    if (this.isModified("name")) {
      const baseSlug = this.name.toLowerCase().split(" ").join("-");
      const slugBase = `${baseSlug}-division`;

      let counter = 1;
      let uniqueSlug = slugBase;

      while (await Division.exists({ slug: uniqueSlug })) {
        uniqueSlug = `${slugBase}-${counter++}`;
      }

      this.slug = uniqueSlug;
    }

    next();
  }
);

divisionChema.pre("findOneAndUpdate", async function (next) {
  const division = this.getUpdate() as Partial<IDivission>;

  if (division.name) {
    const baseSlug = division.name.toLowerCase().split(" ").join("-");
    const slugBase = `${baseSlug}-division`;

    let counter = 1;
    let uniqueSlug = slugBase;

    while (await Division.exists({ slug: uniqueSlug })) {
      uniqueSlug = `${slugBase}-${counter++}`;
    }

    division.slug = uniqueSlug;
  }

  this.setUpdate(division);

  next();
});

export const Division = model<IDivission>("Division", divisionChema);

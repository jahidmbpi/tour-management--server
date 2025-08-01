import httpStatus from "http-status";
import AppError from "../../errorHalper/AppError";
import { IDivission } from "./division.interface";
import { Division } from "./division.model";

const createDivision = async (payload: Partial<IDivission>) => {
  const baseSlug = payload.name?.toLocaleLowerCase().split("").join("-");
  let slug = `${baseSlug}-division`;

  const isDivisionExsit = await Division.findOne({ name: payload.name });
  if (isDivisionExsit) {
    throw new AppError(httpStatus.BAD_REQUEST, "division already exists");
  }
  let counter = 0;
  while (await Division.exists({ slug })) {
    slug = `${slug}-${counter++}`;
  }
  payload.slug = slug;
  const division = await Division.create(payload);
  return division;
};
const getAllDivision = async () => {
  const division = await Division.find({});

  const totalDivision = await Division.countDocuments();
  return {
    data: division,
    meta: { totalDivision },
  };
};
export const divisionServices = {
  createDivision,
  getAllDivision,
};

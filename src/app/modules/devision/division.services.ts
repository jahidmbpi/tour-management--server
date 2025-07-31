import httpStatus from "http-status";
import AppError from "../../errorHalper/AppError";
import { IDivission } from "./division.interface";
import { Division } from "./division.model";

const createDivision = async (payload: Partial<IDivission>) => {
  const { name, ...rest } = payload;

  const isDivisionExsit = await Division.findOne({ name });
  if (isDivisionExsit) {
    throw new AppError(httpStatus.BAD_REQUEST, "division already exists");
  }
  const division = await Division.create({ name, ...rest });
  return division;
};

export const divisionServices = {
  createDivision,
};

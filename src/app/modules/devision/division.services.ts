import httpStatus from "http-status";
import AppError from "../../errorHalper/AppError";
import { IDivission } from "./division.interface";
import { Division } from "./division.model";

const createDivision = async (payload: Partial<IDivission>) => {
  const isDivisionExsit = await Division.findOne({ name: payload.name });
  if (isDivisionExsit) {
    throw new AppError(httpStatus.BAD_REQUEST, "division already exists");
  }
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

const updateDivision = async (id: string, payload: Partial<IDivission>) => {
  const isDivisionExsit = await Division.findById(id);

  if (!isDivisionExsit) {
    throw new Error("this division name not exsit");
  }
  const duplicateDivision = await Division.findOne({
    name: payload.name,
    _id: { $ne: id },
  });

  if (duplicateDivision) {
    throw new Error("this name already exsit ");
  }

  const upadtedDivision = await Division.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return upadtedDivision;
};

const deleteDivision = async (id: string) => {
  const isDivisionExsit = await Division.findById(id);
  if (!isDivisionExsit) {
    throw new Error("can not find any division");
  }

  await Division.findByIdAndDelete(id);
  return { message: "Division deleted successfully", id };
};

export const divisionServices = {
  createDivision,
  getAllDivision,
  updateDivision,
  deleteDivision,
};

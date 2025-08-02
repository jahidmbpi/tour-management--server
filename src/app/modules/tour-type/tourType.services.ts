import { ITourType } from "./tourType.interface";
import { TourType } from "./tourType.model";

const cretaeTourType = async (payload: Partial<ITourType>) => {
  const tourTypeExsit = await TourType.findOne({ name: payload.name });

  if (tourTypeExsit) {
    throw new Error("this tour type alreday exsit");
  }

  const tourtype = await TourType.create(payload);
  return tourtype;
};

const getAllTourType = async () => {
  const allTourType = await TourType.find({});

  if (!allTourType || allTourType.length === 0) {
    throw new Error("Can not find any tourType");
  }

  return allTourType;
};

const updateTourType = async (id: string, payload: Partial<ITourType>) => {
  const isTourTypeExsit = await TourType.findById(id);
  if (!isTourTypeExsit) {
    throw new Error("this division name not exsit");
  }
  const duplicateTourType = await TourType.findOne({
    name: payload.name,
    _id: { $ne: id },
  });

  if (duplicateTourType) {
    throw new Error("this name already exsit ");
  }

  const updatedTourType = await TourType.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return updatedTourType;
};

const deletetourType = async (id: string) => {
  const isTourTypeExist = await TourType.findById(id);
  if (!isTourTypeExist) {
    throw new Error("can not find this tour type");
  }

  await TourType.findByIdAndDelete(id, { new: true });
  return {
    id: id,
    message: "tour type deleted successfully",
  };
};

export const tourTypeServices = {
  cretaeTourType,
  getAllTourType,
  updateTourType,
  deletetourType,
};

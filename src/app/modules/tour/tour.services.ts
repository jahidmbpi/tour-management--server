import { excludeField, searchAbleField } from "./tour.constant";
import { ITour } from "./tour.interface";
import { Tour } from "./tour.model";

const createTour = async (payload: Partial<ITour>) => {
  const exsitingTour = await Tour.findOne({ title: payload.title });

  if (exsitingTour) {
    throw new Error("a tour with his titile alreday exsit");
  }

  const tour = await Tour.create(payload);
  return tour;
};

const getAllTur = async (query: Record<string, string>) => {
  const searchterm = query.searchterm || "";
  const filter = query;
  const sort = query.sort || "-createdAt";

  const fields = query.fields?.split(",").join(" ");

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  for (const field of excludeField) {
    delete filter[field];
  }

  const searchQuery = {
    $or: searchAbleField.map((field) => ({
      [field]: { $regex: searchterm, $options: "i" },
    })),
  };

  const tour = await Tour.find(searchQuery)
    .find(filter)
    .sort(sort)
    .select(fields)
    .skip(skip)
    .limit(limit);

  const totalTour = await Tour.countDocuments(searchQuery);

  const totalPage = Math.ceil(totalTour / limit);
  return {
    data: tour,
    meta: {
      page: page,
      limit: limit,
      totale: totalTour,
      totalPage: totalPage,
    },
  };
};

const updateTour = async (id: string, payload: Partial<ITour>) => {
  const isTourExist = await Tour.findById(id);

  if (!isTourExist) {
    throw new Error("can not find this tour");
  }

  const upadteTour = await Tour.findByIdAndUpdate(id, payload, { new: true });
  return upadteTour;
};

const deleteTour = async (id: string) => {
  const isTourExist = await Tour.findById(id);

  if (!isTourExist) {
    throw new Error(" can not find  tour");
  }
  const deletetour = await Tour.findByIdAndDelete(id);
  return deletetour;
};

export const tourServices = {
  createTour,
  getAllTur,
  updateTour,
  deleteTour,
};

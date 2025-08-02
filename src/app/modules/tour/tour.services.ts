import { ITour } from "./tour.interface";
import { Tour } from "./tour.model";

const createTour = async (payload: Partial<ITour>) => {
  const exsitingTour = await Tour.findOne({ title: payload.title });

  if (exsitingTour) {
    throw new Error("a tour with his titile alreday exsit");
  }
  const baseSlug = payload.title?.toLocaleLowerCase().split(" ").join("-");
  let slug = `${baseSlug}-division`;
  let counter = 0;
  while (await Tour.exists({ slug })) {
    slug = `${slug}-${counter++}`;
  }
  payload.slug = slug;

  const tour = await Tour.create(payload);
  return tour;
};

const getAllTur = async () => {
  const tour = await Tour.find({});

  const totalTour = await Tour.countDocuments();
  return {
    data: tour,
    meta: { totalTour },
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

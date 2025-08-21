import { Booking } from "../booking/booking.model";
import { Tour } from "../tour/tour.model";
import { isActive } from "../user/user.interface";
import { User } from "../user/user.model";

const now = new Date();

const sevenDaysAgo = new Date(now);
sevenDaysAgo.setDate(now.getDate() - 7);
const thirtyDaysAgo = new Date(now);
thirtyDaysAgo.setDate(now.getDate() - 30);
const getUser = async () => {
  const totalUsersPromise = User.countDocuments();

  const totalActiveUsersPromise = User.countDocuments({
    isActive: isActive.ACTIVE,
  });
  const totalInActiveUsersPromise = User.countDocuments({
    isActive: isActive.INACTIVE,
  });
  const totalBlockedUsersPromise = User.countDocuments({
    isActive: isActive.BLOCKED,
  });

  const newUsersInLast7DaysPromise = User.countDocuments({
    createdAt: { $gte: sevenDaysAgo },
  });
  const newUsersInLast30DaysPromise = User.countDocuments({
    createdAt: { $gte: thirtyDaysAgo },
  });
  const usersByRolePromise = User.aggregate([
    {
      $group: {
        _id: "$role",
        bookinCount: { $sum: 1 },
      },
    },
  ]);
  const [
    totalUsers,
    totalActiveUsers,
    totalInActiveUsers,
    totalBlockedUsers,
    newUsersInLast7Days,
    newUsersInLast30Days,
    usersByRole,
  ] = await Promise.all([
    totalUsersPromise,
    totalActiveUsersPromise,
    totalInActiveUsersPromise,
    totalBlockedUsersPromise,
    newUsersInLast7DaysPromise,
    newUsersInLast30DaysPromise,
    usersByRolePromise,
  ]);

  return {
    totalUsers,
    totalActiveUsers,
    totalInActiveUsers,
    totalBlockedUsers,
    newUsersInLast7Days,
    newUsersInLast30Days,
    usersByRole,
  };
};

const getTour = async () => {
  const totalTourPromise = Tour.countDocuments();

  const totalTourtypePromise = await Tour.aggregate([
    {
      $lookup: {
        from: "tourtypes",
        localField: "tourType",
        foreignField: "_id",
        as: "type",
      },
    },
    {
      $unwind: "$type",
    },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    },
  ]);

  const avaregeTourPromise = await Tour.aggregate([
    {
      $group: {
        _id: null,
        avaregeCost: { $avg: "$costFrom" },
      },
    },
  ]);

  const totalTourByDivisionPromise = await Tour.aggregate([
    {
      $lookup: {
        from: "divisions",
        localField: "division",
        foreignField: "_id",
        as: "division",
      },
    },
    {
      $unwind: "$division",
    },
    {
      $group: {
        _id: "$division.name",
        count: { $sum: 1 },
      },
    },
  ]);
  const totalHighestBookedTourPromise = await Booking.aggregate([
    {
      $group: {
        _id: "$tour",
        bookingCount: { $sum: 1 },
      },
    },
    {
      $sort: {
        bookingCount: -1,
      },
    },
    {
      $limit: 5,
    },
  ]);

  const [
    totalTour,
    totalTourtype,
    avaregeTour,
    totalTourByDivision,
    totalHighestBookedTour,
  ] = await Promise.all([
    totalTourPromise,
    totalTourtypePromise,
    avaregeTourPromise,
    totalTourByDivisionPromise,
    totalHighestBookedTourPromise,
  ]);

  return {
    totalTour,
    totalTourtype,
    avaregeTour,
    totalTourByDivision,
    totalHighestBookedTour,
  };
};
const getPayment = () => {
  return {};
};
const getBooking = () => {
  return {};
};

export const statsServices = {
  getUser,
  getTour,
  getPayment,
  getBooking,
};

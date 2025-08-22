import { Booking } from "../booking/booking.model";
import { PAYMENT_STATUS } from "../payment/payment.interface";
import { Payment } from "../payment/payment.model";
import { Tour } from "../tour/tour.model";
import { isActive } from "../user/user.interface";
import { User } from "../user/user.model";

const now = new Date();
const sevenDaysAgo = new Date(now).setDate(now.getDate() - 7);
const thirtyDaysAgo = new Date(now).setDate(now.getDate() - 30);
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
        _id: "$type.name",
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
    {
      $lookup: {
        from: "tours",
        let: { tourId: "$_id" },
        pipeline: [
          {
            $match: { $expr: ["$_id", "$$tourId"] },
          },
        ],
        as: "tour",
      },
    },
    {
      $unwind: "$tour",
    },

    {
      $project: {
        bookingCount: 1,
        "tour.title": 1,
        "tour.slug": 1,
      },
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
const getBooking = async () => {
  const totalBookingPromise = Booking.countDocuments();

  const totalBookingByStatuspromise = Booking.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const bookingPertourPromise = Booking.aggregate([
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
      $limit: 10,
    },
    {
      $lookup: {
        from: "tours",
        localField: "_id",
        foreignField: "_id",
        as: "totalBookTour",
      },
    },
    {
      $unwind: "$totalBookTour",
    },
    {
      $project: {
        bookingCount: 1,
        _id: 1,
        "totalBookTour.title": 1,
        "totalBookTour.slug": 1,
      },
    },
  ]);

  const avgGeustPerBoookingpromise = Booking.aggregate([
    {
      $group: {
        _id: null,
        avgGuestCournt: { $avg: "$geustCount" },
      },
    },
  ]);

  const totalBookingUniqeuserPromise = Booking.distinct("user").then(
    (user) => user.length
  );

  const bookingLastSavendayspromise = Booking.countDocuments({
    createdAt: { $gte: sevenDaysAgo },
  });
  const bookingLastThirtyDayspromise = Booking.countDocuments({
    createdAt: { $gte: thirtyDaysAgo },
  });
  const [
    totalBooking,
    totBookingByStatus,
    bookingPertour,
    avgGeustPerBoooking,
    bookingLastSavendays,
    bookingLastThirdydays,
    totalBookingUniqeuser,
  ] = await Promise.all([
    totalBookingPromise,
    totalBookingByStatuspromise,
    bookingPertourPromise,
    avgGeustPerBoookingpromise,
    bookingLastSavendayspromise,
    bookingLastThirtyDayspromise,
    totalBookingUniqeuserPromise,
  ]);

  return {
    totalBooking,
    totBookingByStatus,
    bookingPertour,
    avgGeustPerBoooking,
    bookingLastSavendays,
    bookingLastThirdydays,
    totalBookingUniqeuser,
  };
};

const getPayment = async () => {
  const totalPaymetpromise = Payment.countDocuments();
  const totalPaymentRvineuPromise = Payment.aggregate([
    {
      $match: { status: PAYMENT_STATUS.PAID },
    },
    {
      $group: {
        _id: "$status",
        totalrevineu: { $sum: "$amount" },
      },
    },
  ]);

  const totalPaymentStatusPromise = Payment.aggregate([
    {
      $group: {
        _id: null,
        count: { $sum: "$amount" },
      },
    },
  ]);
  const avgPaymentStatusPromise = Payment.aggregate([
    {
      $group: {
        _id: null,
        avgAmount: { $avg: "$amount" },
      },
    },
  ]);

  const paymentgatwayPromise = Payment.aggregate([
    {
      $group: {
        _id: { ifNull: ["paymentGetWayData.status", "UNKNOWN"] },
        count: { $sum: 1 },
      },
    },
  ]);
  const [
    totalPaymet,
    totalPaymentByStatus,
    totalPaymentStatus,
    avgPaymentStatus,
    paymentgatway,
  ] = await Promise.all([
    totalPaymetpromise,
    totalPaymentRvineuPromise,
    totalPaymentStatusPromise,
    avgPaymentStatusPromise,
    paymentgatwayPromise,
  ]);
  return {
    totalPaymet,
    totalPaymentByStatus,
    totalPaymentStatus,
    avgPaymentStatus,
    paymentgatway,
  };
};

export const statsServices = {
  getUser,
  getTour,
  getPayment,
  getBooking,
};

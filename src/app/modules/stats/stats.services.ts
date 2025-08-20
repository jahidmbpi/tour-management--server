const now = new Date.now(now);
const savenDayesAgo = new Date(now).setDate(now.getDate() - 7);
const thirtyDayesAgo = new Date(now).setDate(now.getDate() - 30);
const getUser = () => {
  return {};
};

const getTour = () => {
  return {};
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

import crypto from "crypto";
import { redisClient } from "../../config/redis.config";
import sendEmail from "../../utilse/sendmail";
import AppError from "../../errorHalper/AppError";
import { User } from "../user/user.model";
const OPT_EXPIREIN = 2 * 60;

const genaretOtp = (length = 6) => {
  const otp = crypto.randomInt(10 ** (length - 1), 10 ** length).toString();
  return otp;
};
const sendOtp = async (email: string) => {
  console.log(email);
  const otp = genaretOtp();
  const redisKey = `otp:${email}`;
  await redisClient.set(redisKey, otp, {
    expiration: {
      type: "EX",
      value: OPT_EXPIREIN,
    },
  });
  await sendEmail({
    to: email,
    subject: "your otp code ",
    template: "otp",
    templateData: {
      otp: otp,
    },
  });

  return {};
};

const verifyOtp = async (email: string, otp: string) => {
  const redisKey = `otp:${email}`;
  const saveOtp = await redisClient.get(redisKey);

  if (!saveOtp) {
    throw new AppError(404, "please provide your otp ");
  }

  if (String(saveOtp) !== String(otp)) {
    throw new AppError(400, "Invalid OTP provided");
  }

  await Promise.all([
    User.updateOne({ email }, { isVerified: true }, { runValidators: true }),
    redisClient.del([redisKey]),
  ]);

  return {};
};
export const otpServices = {
  sendOtp,
  verifyOtp,
};

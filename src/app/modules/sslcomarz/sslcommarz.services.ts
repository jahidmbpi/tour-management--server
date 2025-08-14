/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import qs from "querystring";
import { envVars } from "../../config/env";
import { ISslcomarz } from "./sslCommarz.interface";
import AppError from "../../errorHalper/AppError";
import statuscode from "http-status";

const paymentInit = async (payload: ISslcomarz) => {
  try {
    const data = {
      store_id: envVars.SSL.SSL_STORE_ID,
      store_passwd: envVars.SSL.SSL_STORE_PASS,
      total_amount: payload.amount,
      currency: "BDT",
      tran_id: payload.transectionId,
      success_url: `${envVars.SSL.SSL_SUCCESS_BACKEND_URL}?transectionId=${payload.transectionId}`,
      fail_url: envVars.SSL.SSL_FAIL_BACKEND_URL,
      cancel_url: envVars.SSL.SSL_CANCEL_BACKEND_URL,
      shipping_method: "N/A",
      product_name: "Appointment",
      product_category: "Tour",
      product_profile: "general",
      cus_name: payload.name,
      cus_email: payload.email,
      cus_add1: payload.address,
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: payload.phoneNumber,
      cus_fax: "01XXXXXXXXX",
      ship_name: "N/A",
      ship_add1: "N/A",
      ship_add2: "N/A",
      ship_city: "N/A",
      ship_state: "N/A",
      ship_postcode: "1000",
      ship_country: "N/A",
    };

    const response = await axios({
      method: "POST",
      url: envVars.SSL.SSL_PAYMENT_API,
      data: qs.stringify(data), // Encode as form data
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new AppError(statuscode.BAD_REQUEST, error?.message || String(error));
  }
};

export const sslService = {
  paymentInit,
};

import dotenv from "dotenv";
dotenv.config();
interface ENVConfig {
  PORT: string;
  DB_URL: string;
  NODE_ENV: "development" | "production";
  JWT_ACCESS_SECRET: string;
  JWT_ACCESS_EXPIRE: string;
  JWT_REFRESH_SECRECT: string;
  JWT_REFRESH_EXPIRES: string;
  BYCRIPT_SALT_ROUND: string;
  SUPER_ADMIN_EMAIL: string;
  SUPER_ADMIN_PASSWORD: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_CALLBACK_URL: string;
  EXPRESS_SASSION_SECRET: string;
  FRONTANT_URL: string;
  SSL: {
    SSL_STORE_ID: string;
    SSL_STORE_PASS: string;
    SSL_PAYMENT_API: string;
    SSL_VALIDATION_API: string;
    SSL_SUCCESS_FRONTEND_URL: string;
    SSL_FAIL_FRONTEND_URL: string;
    SSL_CANCEL_FRONTEND_URL: string;
    SSL_SUCCESS_BACKEND_URL: string;
    SSL_FAIL_BACKEND_URL: string;
    SSL_CANCEL_BACKEND_URL: string;
  };
  CLUDENARY: {
    CLUDENARY_CLOUD_NAME: string;
    CLUDENARY_API_KEY: string;
    CLUDENARY_API_SECRET: string;
  };
}

const LoadEnvVariale = (): ENVConfig => {
  const requiredvariable: string[] = [
    "PORT",
    "DB_URL",
    "NODE_ENV",
    "JWT_ACCESS_SECRET",
    "JWT_ACCESS_EXPIRE",
    "BYCRIPT_SALT_ROUND",
    "SUPER_ADMIN_EMAIL",
    "SUPER_ADMIN_PASSWORD",
    "JWT_REFRESH_SECRECT",
    "JWT_REFRESH_EXPIRES",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "GOOGLE_CALLBACK_URL",
    "EXPRESS_SASSION_SECRET",
    "FRONTANT_URL",
    "SSL_STORE_ID",
    "SSL_STORE_PASS",
    "SSL_PAYMENT_API",
    "SSL_VALIDATION_API",
    "SSL_SUCCESS_FRONTEND_URL",
    "SSL_FAIL_FRONTEND_URL",
    "SSL_CANCEL_FRONTEND_URL",
    "SSL_SUCCESS_BACKEND_URL",
    "SSL_FAIL_BACKEND_URL",
    "SSL_CANCEL_BACKEND_URL",
    "CLUDENARY_CLOUD_NAME",
    "CLUDENARY_API_KEY",
    "CLUDENARY_API_SECRET",
  ];
  requiredvariable.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`missing environment variable ${key}`);
    }
  });
  return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    JWT_ACCESS_EXPIRE: process.env.JWT_ACCESS_EXPIRE as string,
    JWT_REFRESH_SECRECT: process.env.JWT_REFRESH_SECRECT as string,
    JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as string,

    BYCRIPT_SALT_ROUND: process.env.BYCRIPT_SALT_ROUND as string,
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL as string,
    EXPRESS_SASSION_SECRET: process.env.EXPRESS_SASSION_SECRET as string,
    FRONTANT_URL: process.env.FRONTANT_URL as string,
    SSL: {
      SSL_STORE_ID: process.env.SSL_STORE_ID as string,
      SSL_STORE_PASS: process.env.SSL_STORE_PASS as string,
      SSL_PAYMENT_API: process.env.SSL_PAYMENT_API as string,
      SSL_VALIDATION_API: process.env.SSL_VALIDATION_API as string,
      SSL_SUCCESS_FRONTEND_URL: process.env.SSL_SUCCESS_FRONTEND_URL as string,
      SSL_FAIL_FRONTEND_URL: process.env.SSL_FAIL_FRONTEND_URL as string,
      SSL_CANCEL_FRONTEND_URL: process.env.SSL_CANCEL_FRONTEND_URL as string,
      SSL_SUCCESS_BACKEND_URL: process.env.SSL_SUCCESS_BACKEND_URL as string,
      SSL_FAIL_BACKEND_URL: process.env.SSL_FAIL_BACKEND_URL as string,
      SSL_CANCEL_BACKEND_URL: process.env.SSL_CANCEL_BACKEND_URL as string,
    },
    CLUDENARY: {
      CLUDENARY_CLOUD_NAME: process.env.CLUDENARY_CLOUD_NAME as string,
      CLUDENARY_API_KEY: process.env.CLUDENARY_API_KEY as string,
      CLUDENARY_API_SECRET: process.env.CLUDENARY_API_SECRET as string,
    },
  };
};

export const envVars = LoadEnvVariale();

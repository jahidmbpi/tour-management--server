import dotenv from "dotenv";
dotenv.config();
interface ENVConfig {
  PORT: string;
  DB_URL: string;
  NODE_ENV: "development" | "production";
}

const LoadEnvVariale = (): ENVConfig => {
  const requiredvariable: string[] = ["PORT", "DB_URL", "NODE_ENV"];
  requiredvariable.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`missing environment variable ${key}`);
    }
  });
  return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
  };
};

export const envVars = LoadEnvVariale();

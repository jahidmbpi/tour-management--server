import { TErrorResponse, Tgeneric } from "../interfaces/error.types";
import { ZodError } from "zod";

export const handleZodError = (err: ZodError): Tgeneric => {
  const errorSources: TErrorResponse[] = err.issues.map((issue) => ({
    path: issue.path[issue.path.length - 1]?.toString() || "",
    message: issue.message,
  }));

  return {
    statusCode: 400,
    message: "Zod validation error",
    errorSources,
  };
};

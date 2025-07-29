/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tgeneric } from "../interfaces/error.types";

export const handleDuplicateError = (err: any): Tgeneric => {
  const matchedArray = err.message.match(/"([^"]*)"/);
  return {
    statusCode: 400,
    message: `${matchedArray ? matchedArray[1] : "Field"} already exists`,
  };
};

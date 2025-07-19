import { Response } from "express";
interface Tmeta {
  total: number;
}
interface TResponse<T> {
  statusCode: number;
  success: boolean;
  massage: string;
  data: T;
  meta?: Tmeta;
}

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    massage: data.massage,
    meta: data.meta,
    data: data.data,
  });
};

export default sendResponse;

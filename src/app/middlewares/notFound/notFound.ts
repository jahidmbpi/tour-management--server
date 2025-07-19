import hthpStatus from "http-status";
import { Request, Response } from "express";

const notFound = (req: Request, res: Response) => {
  res.status(hthpStatus.NOT_FOUND).json({
    success: false,
    masssage: "route not found ",
  });
};

export default notFound;

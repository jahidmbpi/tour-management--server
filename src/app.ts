import Express, { Request, Response } from "express";

import cros from "cors";
import { router } from "./routes";
const app = Express();

app.use(Express.json());
app.use(cros());

app.use("/api/v1/", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    massage: "wellcome to tour-management  server",
  });
});

export default app;

import Express, { Request, Response } from "express";
import cros from "cors";

import { globalErrorhandelar } from "./app/middlewares/globalErrorHandelars/globalErrorHandelars";
import notFound from "./app/middlewares/notFound/notFound";
import { UserRoutes } from "./user/user.routes";

const app = Express();

app.use(Express.json());
app.use(cros());

app.use("/api/v1/user", UserRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    massage: "wellcome to tour-management  server",
  });
});

app.use(globalErrorhandelar);
app.use(notFound);

export default app;

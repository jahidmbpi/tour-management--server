import Express, { Request, Response } from "express";
const app = Express();
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    massage: "wellcome to tour-management  server",
  });
});

export default app;

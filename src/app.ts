import Express, { Request, Response } from "express";
import cros from "cors";

import { globalErrorhandelar } from "./app/middlewares/globalErrorHandelars/globalErrorHandelars";
import notFound from "./app/middlewares/notFound/notFound";
import router from "./routes";
import cookieParssar from "cookie-parser";
import passport from "passport";
import expressSession from "express-session";
import "./app/config/pasport";

const app = Express();
app.use(
  expressSession({
    secret: "your secrect",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(Express.json());
app.use(cros());
app.use(cookieParssar());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    massage: "wellcome to tour-management  server",
  });
});

app.use(globalErrorhandelar);
app.use(notFound);

export default app;

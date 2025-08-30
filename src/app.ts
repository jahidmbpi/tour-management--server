import Express, { Request, Response } from "express";
import cors from "cors";

import { globalErrorhandelar } from "./app/middlewares/globalErrorHandelars/globalErrorHandelars";
import notFound from "./app/middlewares/notFound/notFound";
import router from "./routes";
import passport from "passport";
import expressSession from "express-session";
import "./app/config/pasport";
import { envVars } from "./app/config/env";
import cookieParser from "cookie-parser";

const app = Express();
app.use(
  expressSession({
    secret: envVars.EXPRESS_SASSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: envVars.FRONTANT_URL,
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    massage: "wellcome to tour-management  server",
  });
});

app.use(globalErrorhandelar);
app.use(notFound);

export default app;

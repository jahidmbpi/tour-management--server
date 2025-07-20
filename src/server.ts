/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
import { seedSuperAdmin } from "./app/utilse/seedSuperAdmin";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);

    console.log("connected to mongoose ");
    server = app.listen(envVars.PORT, () => {
      console.log(`http://localhost:${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  await startServer();
  await seedSuperAdmin();
})();

// process.on("unhandledRejection", (err) => {
//   console.log("unhandale rejaction detected ... server shutting dwon", err);
//   if (server) {
//     server.close(() => {
//       process.exit(1);
//     });
//   }
//   process.exit();
// });
// Promise.reject(new Error("I forgot to catch this promise"));
// process.on("uncaughtException", (err) => {
//   console.log(" uncaught exception detected ... server shutting dwon", err);
//   if (server) {
//     server.close(() => {
//       process.exit(1);
//     });
//   }
//   process.exit();
// });

// throw new Error(" i forget to handel this local error ");

// process.on("SIGTERM", () => {
//   console.log("SIGTERM signale recived detected ... server shutting dwon");
//   if (server) {
//     server.close(() => {
//       process.exit(1);
//     });
//   }
//   process.exit();
// });

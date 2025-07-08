import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server: Server;

const port = 5000;

const startServer = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://tour-management:Pu8qhXmYzYsy6pTg@cluster0.g8zp6.mongodb.net/tour-management?"
    );
    console.log("connected to mongoose ");
    server = app.listen(port, () => {
      console.log(`server is listening on port${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();

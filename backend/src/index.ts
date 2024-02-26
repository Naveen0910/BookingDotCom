import express, { Response, Request } from "express";
import cors from "cors";
import "dotenv/config"; //loading env variables
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import cookieParser from "cookie-parser";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() =>
    console.log(
      "connected to data base: ",
      process.env.MONGODB_CONNECTION_STRING
    )
  );

const app = express();

app.use(express.json()); //convert body in api req to json automatically for us
app.use(express.urlencoded({ extended: true })); // helps us in parsing URL
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true })); //enables allows cross origin resource sharing
app.use(cookieParser());
// integreating routes with server instance
app.use("/api/users", userRoutes);

// // example
// app.get("/api/test", async (req: Request, res: Response) => {
//   res.json({ message: "Hello from express - ts" });
// });

// making app listen to a port
app.listen(7000, () => {
  console.log("server running");
});

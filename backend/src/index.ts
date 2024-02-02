import express, { Response, Request } from "express";
import cors from "cors";
import "dotenv/config"; //loading env variables
import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();

app.use(express.json()); //convert body in api req to json automatically for us
app.use(express.urlencoded({ extended: true })); // helps us in parsing URL
app.use(cors()); //enables allows cross origin resource sharing

// example
app.get("/api/test", async (req: Request, res: Response) => {
  res.json({ message: "Hello from express - ts" });
});

// making app listen to a port
app.listen(7000, () => {
  console.log("server running");
});

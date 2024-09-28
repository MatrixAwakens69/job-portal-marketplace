import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import employerRouter from "./routes/employer.route.js";
import instituteRouter from "./routes/institute.route.js";
import studentRouter from "./routes/student.route.js";
import exp from "constants";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => console.log(error));

const __dirname = path.resolve();

app.get("/", (req, res) => {
  res.send("Test route");
});

app.listen(process.env.PORT_NO, () => {
  console.log("Server listening on port " + process.env.PORT_NO);
});

app.use("/api/employer", employerRouter);
app.use("/api/institute", instituteRouter);
app.use("/api/student", studentRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import employerRouter from "./routes/employer.route.js";
import instituteRouter from "./routes/institute.route.js";
import studentRouter from "./routes/student.route.js";

const app = express();
dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("Test route");
});

app.use("/api/employer", employerRouter);
app.use("/api/institute", instituteRouter);
app.use("/api/student", studentRouter);

app.listen(process.env.PORT_NO, () => {
  console.log("Server listening on port " + process.env.PORT_NO);
});

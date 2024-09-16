import express from "express";
import { signup } from "../controllers/institute.controller.js";

const router = express.Router();

router.post("/signup", signup);

export default router;

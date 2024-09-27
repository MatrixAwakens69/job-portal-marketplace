import express from "express";
import {
  createJobPosting,
  signin,
  signup,
} from "../controllers/employer.controller.js";
import authentication from "../utils/authentication.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/create", authentication, createJobPosting);

export default router;

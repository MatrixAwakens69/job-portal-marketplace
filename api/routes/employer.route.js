import express from "express";
import {
  createJobPosting,
  deleteAccount,
  deleteJobPosting,
  getJobPostings,
  getProfile,
  signin,
  signout,
  signup,
  updateJobPosting,
  updateProfile,
} from "../controllers/employer.controller.js";
import authentication from "../utils/authentication.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", signout);
router.get("/profile", authentication, getProfile);
router.put("/profile", authentication, updateProfile);
router.delete("/profile", authentication, deleteAccount);
router.post("/create", authentication, createJobPosting);
router.get("/getall", authentication, getJobPostings);
router.delete("/delete/:id", authentication, deleteJobPosting);
router.put("/update/:id", authentication, updateJobPosting);

export default router;

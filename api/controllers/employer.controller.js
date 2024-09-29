import bcrypt from "bcryptjs";
import Employer from "../models/employer.model.js";
import JobPosting from "../models/jobPosting.model.js";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  try {
    const { name, email, password, logo, description, website } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newEmployer = new Employer({
      name,
      email,
      password: hashedPassword,
      logo,
      description,
      website,
    });
    await newEmployer.save();
    console.log(newEmployer);
    res.status(201).json("Employer created successfully");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const employer = await Employer.findOne({ email });
    if (!employer) {
      throw errorHandler(400, "Invalid email or password");
    }
    const validPassword = bcrypt.compareSync(password, employer.password);
    if (!validPassword) {
      throw errorHandler(400, "Invalid email or password");
    }
    const token = jwt.sign({ id: employer._id }, process.env.JWT_KEY);
    const { password: pass, ...rest } = employer._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 365),
      })
      .status(200)
      .json({ ...rest, token });
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token").json("Signout successfully");
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const employer = await Employer.findById(req.user.id);
    const { password, ...rest } = employer._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name, email, logo, description, website } = req.body;
    const updatedEmployer = await Employer.findByIdAndUpdate(
      req.user.id,
      { name, email, logo, description, website },
      { new: true }
    );
    const { password, ...rest } = updatedEmployer._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteAccount = async (req, res, next) => {
  try {
    await Employer.findByIdAndDelete(req.user.id);
    res
      .clearCookie("access_token")
      .status(200)
      .json("Account deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const createJobPosting = async (req, res, next) => {
  try {
    const {
      title,
      type,
      description,
      requirements,
      location,
      salary,
      start_date,
    } = req.body;
    const employerId = req.user.id;

    const newJobPosting = new JobPosting({
      title,
      type,
      description,
      requirements: requirements.split(","),
      location: location.split(","),
      salary,
      start_date,
      employer_id: employerId,
    });

    await newJobPosting.save();
    res.status(201).json("Job posting created successfully");
  } catch (error) {
    next(error);
  }
};

export const getJobPostings = async (req, res, next) => {
  try {
    const employerId = req.user.id;
    const jobPostings = await JobPosting.find({ employer_id: employerId });
    res.status(200).json(jobPostings);
  } catch (error) {
    next(error);
  }
};

export const updateJobPosting = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      type,
      description,
      requirements,
      location,
      salary,
      start_date,
      numberOfApplicants,
    } = req.body;
    await JobPosting.findByIdAndUpdate(id, {
      title,
      type,
      description,
      requirements: Array.isArray(requirements)
        ? requirements
        : requirements.split(","),
      location: Array.isArray(location) ? location : location.split(","),
      salary,
      start_date,
      numberOfApplicants,
    });
    res.status(200).json("Job posting updated successfully");
  } catch (error) {
    next(error);
  }
};

export const deleteJobPosting = async (req, res, next) => {
  try {
    const { id } = req.params;
    await JobPosting.findByIdAndDelete(id);
    res.status(200).json("Job posting deleted successfully");
  } catch (error) {
    next(error);
  }
};

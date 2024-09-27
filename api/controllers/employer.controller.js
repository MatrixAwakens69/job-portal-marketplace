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

export const createJobPosting = async (req, res, next) => {
  try {
    const { title, description, requirements, location, salary } = req.body;
    const employerId = req.user.id;

    const newJobPosting = new JobPosting({
      title,
      description,
      requirements: requirements.split(","),
      location: location.split(","),
      salary,
      employer_id: employerId,
    });

    await newJobPosting.save();
    res.status(201).json("Job posting created successfully");
  } catch (error) {
    next(error);
  }
};

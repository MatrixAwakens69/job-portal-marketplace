import bcrypt from "bcryptjs";
import Employer from "../models/employer.model.js";

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
      return res.status(400).json("Invalid email or password");
    }
    const validPassword = bcrypt.compareSync(password, employer.password);
    if (!validPassword) {
      return res.status(400).json("Invalid email or password");
    }
    res.status(200).json("Signin successful");
  } catch (error) {
    next(error);
  }
};

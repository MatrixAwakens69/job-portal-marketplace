import bcrypt from "bcryptjs";
import Employer from "../models/employer.model.js";

export const signup = async (req, res) => {
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

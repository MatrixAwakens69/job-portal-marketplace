import bcrypt from "bcryptjs";
import Institute from "../models/institute.model.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, logo, description, website } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newInstitute = new Institute({
      name,
      email,
      password: hashedPassword,
      logo,
      description,
      website,
    });
    await newInstitute.save();
    console.log(newInstitute);
    res.status(201).json("Institute created successfully");
  } catch (error) {
    next(error);
  }
};

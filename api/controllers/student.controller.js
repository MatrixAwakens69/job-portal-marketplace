import bcrypt from "bcryptjs";
import Student from "../models/student.model.js";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  try {
    const { name, email, password, profile_img, bio, education, resume_cv } =
      req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newStudent = new Student({
      name,
      email,
      password: hashedPassword,
      profile_img,
      bio,
      education,
      resume_cv,
    });
    await newStudent.save();
    res.status(201).json("Student registered successfully");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    if (!student) {
      throw errorHandler(401, "Invalid credentials");
    }
    const isPasswordValid = bcrypt.compareSync(password, student.password);
    if (!isPasswordValid) {
      throw errorHandler(401, "Invalid credentials");
    }
    const token = jwt.sign({ id: student._id }, process.env.JWT_KEY);
    const { password: pass, ...rest } = student._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 365),
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

import bcrypt from "bcryptjs";
import Student from "../models/student.model.js";

export const signup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      profile_img,
      bio,
      social_media,
      skills,
      education,
      experience,
    } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newStudent = new Student({
      name,
      email,
      password: hashedPassword,
      profile_img,
      bio,
      social_media,
      skills,
      education,
      experience,
    });
    await newStudent.save();
    res.status(201).json("Student registered successfully");
  } catch (error) {
    res.status(500).json({ message: "Error registering student", error });
  }
};

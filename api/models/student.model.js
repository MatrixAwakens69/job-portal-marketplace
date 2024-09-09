import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile_img: {
      type: String,
    },
    bio: {
      type: String,
    },
    social_media: {
      facebook: {
        type: String,
      },
      twitter: {
        type: String,
      },
      linkedin: {
        type: String,
      },
    },
    skills: {
      type: [String],
    },
    education: {
      type: [
        {
          institution: {
            type: String,
          },
          degree: {
            type: String,
          },
          start_date: {
            type: Date,
          },
          end_date: {
            type: Date,
          },
        },
      ],
    },
    experience: {
      type: [
        {
          title: {
            type: String,
          },
          company: {
            type: String,
          },
          start_date: {
            type: Date,
          },
          end_date: {
            type: Date,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;

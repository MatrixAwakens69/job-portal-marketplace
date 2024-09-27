import mongoose from "mongoose";

const jobPostingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: {
      type: [String],
      required: true,
    },
    location: {
      type: [String],
      required: true,
    },
    salary: {
      type: mongoose.Types.Decimal128,
      required: true,
    },
    numberOfApplicants: {
      type: Number,
      default: 0,
    },
    employer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employer",
      required: true,
    },
  },
  { timestamps: true }
);

const JobPosting = mongoose.model("JobPosting", jobPostingSchema);

export default JobPosting;

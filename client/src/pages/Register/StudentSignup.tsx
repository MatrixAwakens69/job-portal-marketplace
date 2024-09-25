import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import StudentHeader from "../components/StudentHeader";
import Footer from "../components/Footer";

const StudentSignup = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const [profileFileName, setProfileFileName] = useState("");
  const [resumeFileName, setResumeFileName] = useState("");
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleProfileFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      setProfileFileName(event.target.files[0].name);
      setProfileFile(event.target.files[0]);
    }
  };

  const handleResumeFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      setResumeFileName(event.target.files[0].name);
      setResumeFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    let profileURL = "";
    let resumeURL = "";

    if (profileFile) {
      const profileRef = ref(storage, `profiles/${profileFile.name}`);
      await uploadBytes(profileRef, profileFile);
      profileURL = await getDownloadURL(profileRef);
      console.log("Profile Image URL:", profileURL);
    }

    if (resumeFile) {
      const resumeRef = ref(storage, `resumes/${resumeFile.name}`);
      await uploadBytes(resumeRef, resumeFile);
      resumeURL = await getDownloadURL(resumeRef);
      console.log("Resume URL:", resumeURL);
    }

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      profile_img: profileURL,
      bio: formData.get("bio"),
      skills: formData.get("skills")?.toString().split(","),
      education: [
        {
          institution: formData.get("institution"),
          degree: formData.get("degree"),
          start_date: formData.get("start_date"),
          end_date: formData.get("end_date"),
        },
      ],
      resume_cv: resumeURL,
    };

    const response = await fetch("/api/student/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Account created successfully!");
      navigate("/student/login");
    } else {
      alert("Account creation failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#2B3A67] text-white">
      <StudentHeader />
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md m-10 mt-28 md:max-w-2xl p-4 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-2xl flex flex-col md:flex-row">
          <div className="hidden md:block md:w-1/2">
            <img
              src="/images/student-login.jpg"
              alt="Register Image"
              className="w-full h-full object-cover rounded-l-lg"
            />
          </div>
          <div className="w-full md:w-1/2 p-4">
            <h2 className="text-3xl mb-6 text-center">Student Register</h2>
            <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full p-2 rounded bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-[#FF9B71]"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-2 rounded bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-[#FF9B71]"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-2 rounded bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-[#FF9B71]"
              />
              <div className="w-full p-2 rounded bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-[#FF9B71]">
                <label
                  htmlFor="profile_img"
                  className="block text-md font-medium text-gray-400 cursor-pointer"
                >
                  {profileFileName || "Upload Profile Image"}
                </label>
                <input
                  type="file"
                  name="profile_img"
                  id="profile_img"
                  className="hidden"
                  onChange={handleProfileFileChange}
                />
              </div>
              <textarea
                name="bio"
                placeholder="Bio"
                className="w-full p-2 rounded bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-[#FF9B71]"
              />
              <input
                type="text"
                name="institution"
                placeholder="Institution"
                className="w-full p-2 rounded bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-[#FF9B71]"
              />
              <input
                type="text"
                name="degree"
                placeholder="Degree"
                className="w-full p-2 rounded bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-[#FF9B71]"
              />
              <label
                htmlFor="start_date"
                className="block text-base font-medium text-gray-100"
              >
                Start Date
              </label>
              <input
                type="date"
                name="start_date"
                placeholder="Start Date"
                className="w-full p-2 rounded bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-[#FF9B71]"
              />
              <label
                htmlFor="end_date"
                className="block text-base font-medium text-gray-100"
              >
                End Date
              </label>
              <input
                type="date"
                name="end_date"
                placeholder="End Date"
                className="w-full p-2 rounded bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-[#FF9B71]"
              />
              <div className="w-full p-2 rounded bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-[#FF9B71]">
                <label
                  htmlFor="resume_cv"
                  className="block text-md font-medium text-gray-400 cursor-pointer"
                >
                  {resumeFileName || "Upload Resume/CV"}
                </label>
                <input
                  type="file"
                  name="resume_cv"
                  id="resume_cv"
                  className="hidden"
                  onChange={handleResumeFileChange}
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-[#FF9B71] text-[#2B3A67] rounded-full hover:bg-[#E84855] transition transform hover:scale-105"
              >
                Register
              </button>
            </form>
            <div className="mt-4 text-center">
              Already have an account?{" "}
              <Link
                to="/student/login"
                className="text-[#FF9B71] hover:text-[#E84855]"
              >
                sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StudentSignup;

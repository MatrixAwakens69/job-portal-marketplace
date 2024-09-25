import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import EmployerHeader from "../components/EmployerHeader";
import Footer from "../components/Footer"; // Import Footer component

const EmployerSignup = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const handleFileUpload = async (file: File) => {
    const storageRef = ref(storage, `avatars/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    const file = formData.get("avatar") as File;
    const avatarUrl = await handleFileUpload(file);

    let website = formData.get("website") as string;
    if (!website.startsWith("http://") && !website.startsWith("https://")) {
      website = "https://" + website;
    }

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      avatar: avatarUrl,
      description: formData.get("description"),
      website,
    };

    const response = await fetch("/api/employer/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Account created successfully!");
      navigate("/employer/login");
    } else {
      alert("Account creation failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#13293D] text-white">
      <EmployerHeader />
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md m-10 md:max-w-2xl p-4 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-2xl flex flex-col md:flex-row">
          <div className="hidden md:block md:w-1/2">
            <img
              src="/images/employer-login.jpg"
              alt="Register Image"
              className="w-full h-full object-cover rounded-l-lg"
            />
          </div>
          <div className="w-full md:w-1/2 p-4">
            <h2 className="text-3xl mb-6 text-center">Employer Register</h2>
            <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full p-2 rounded bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-[#3E92CC]"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-2 rounded bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-[#3E92CC]"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-2 rounded bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-[#3E92CC]"
              />
              <input
                type="file"
                name="avatar"
                className="w-full p-2 rounded bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-[#3E92CC]"
              />
              <textarea
                name="description"
                placeholder="Description"
                className="w-full p-2 rounded bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-[#3E92CC]"
              />
              <input
                type="url"
                name="website"
                placeholder="Website"
                className="w-full p-2 rounded bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-[#3E92CC]"
              />
              <button
                type="submit"
                className="w-full py-2 bg-[#3E92CC] text-[#13293D] rounded-full hover:bg-[#2A628F] transition transform hover:scale-105"
              >
                Register
              </button>
            </form>
            <div className="mt-4 text-center">
              Already have an account?{" "}
              <Link
                to="/employer/login"
                className="text-[#3E92CC] hover:text-[#2A628F]"
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

export default EmployerSignup;

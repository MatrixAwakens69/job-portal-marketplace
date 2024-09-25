import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import StudentHeader from "../components/StudentHeader";
import Footer from "../components/Footer";

const StudentSignin = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const response = await fetch("/api/student/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Signed in successfully!");
      navigate("/student/dashboard");
    } else {
      alert("Sign in failed");
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
              alt="Login Image"
              className="w-full h-full object-cover rounded-l-lg"
            />
          </div>
          <div className="w-full md:w-1/2 p-4">
            <h2 className="text-3xl mb-6 text-center">Student Sign In</h2>
            <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
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
              <button
                type="submit"
                className="w-full py-2 bg-[#FF9B71] text-[#2B3A67] rounded-full hover:bg-[#E84855] transition transform hover:scale-105"
              >
                Sign In
              </button>
            </form>
            <div className="mt-4 text-center">
              Don't have an account?{" "}
              <Link
                to="/student/register"
                className="text-[#FF9B71] hover:text-[#E84855]"
              >
                register
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StudentSignin;

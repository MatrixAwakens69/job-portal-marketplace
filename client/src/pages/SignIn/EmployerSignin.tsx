import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import EmployerHeader from "../components/EmployerHeader";

const EmployerSignin = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const response = await fetch("/api/employer/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      const token = result.token;
      localStorage.setItem("token", token);
      alert("Signed in successfully!");
      navigate("/employer/dashboard");
    } else {
      alert("Sign in failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#13293D] text-white">
      <EmployerHeader />
      <div className="w-full max-w-md m-6 md:max-w-2xl p-8 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-2xl flex flex-col md:flex-row">
        <div className="hidden md:block md:w-1/2">
          <img
            src="/images/employer-login.jpg"
            alt="Login Image"
            className="w-full h-full object-cover rounded-l-lg"
          />
        </div>
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-3xl mb-6 text-center">Employer Sign In</h2>
          <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
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
            <button
              type="submit"
              className="w-full py-2 bg-[#3E92CC] text-[#13293D] rounded-full hover:bg-[#2A628F] transition transform hover:scale-105"
            >
              Sign In
            </button>
          </form>
          <div className="mt-4 text-center">
            Dont have an account?{" "}
            <Link
              to="/employer/register"
              className="text-[#3E92CC] hover:text-[#2A628F]"
            >
              register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerSignin;

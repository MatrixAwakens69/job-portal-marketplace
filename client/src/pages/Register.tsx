import { useState } from "react";

const Register = () => {
  const [activeForm, setActiveForm] = useState("student");

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-3xl p-8 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg">
        <div className="flex justify-around mb-8">
          <button
            className={`px-4 py-2 rounded ${
              activeForm === "student"
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500"
            }`}
            onClick={() => setActiveForm("student")}
          >
            Student
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeForm === "employer"
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500"
            }`}
            onClick={() => setActiveForm("employer")}
          >
            Employer
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeForm === "institute"
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500"
            }`}
            onClick={() => setActiveForm("institute")}
          >
            Institute
          </button>
        </div>
        <div className="transition-all duration-500 ease-in-out">
          {activeForm === "student" && (
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-2 rounded bg-white bg-opacity-20"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 rounded bg-white bg-opacity-20"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 rounded bg-white bg-opacity-20"
              />
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded"
              >
                Register
              </button>
            </form>
          )}
          {activeForm === "employer" && (
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Company Name"
                className="w-full p-2 rounded bg-white bg-opacity-20"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 rounded bg-white bg-opacity-20"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 rounded bg-white bg-opacity-20"
              />
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded"
              >
                Register
              </button>
            </form>
          )}
          {activeForm === "institute" && (
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Institute Name"
                className="w-full p-2 rounded bg-white bg-opacity-20"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 rounded bg-white bg-opacity-20"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 rounded bg-white bg-opacity-20"
              />
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded"
              >
                Register
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;

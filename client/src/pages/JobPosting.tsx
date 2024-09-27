import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import EmployerHeader from "./components/EmployerHeader";
import Footer from "./components/Footer";

const JobPosting = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      requirements: formData.get("requirements"),
      location: formData.get("location"),
      salary: formData.get("salary"),
    };

    const token = localStorage.getItem("token");

    const response = await fetch("/api/employer/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Job posting created successfully!");
      navigate("/employer/dashboard");
    } else {
      alert("Failed to create job posting");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#13293D] text-white">
      <EmployerHeader />
      <main className="flex-grow p-4 mt-28">
        <h1 className="text-3xl mb-4">Create Job Posting</h1>
        <div className="bg-white bg-opacity-10 backdrop-blur-md p-4 rounded-lg shadow-md">
          <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Job Title"
              className="w-full p-2 rounded bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-[#3E92CC]"
              required
            />
            <textarea
              name="description"
              placeholder="Job Description"
              className="w-full p-2 rounded bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-[#3E92CC]"
              required
            />
            <input
              type="text"
              name="requirements"
              placeholder="Requirements (comma separated)"
              className="w-full p-2 rounded bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-[#3E92CC]"
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Location (comma separated)"
              className="w-full p-2 rounded bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-[#3E92CC]"
              required
            />
            <input
              type="number"
              name="salary"
              placeholder="Salary"
              className="w-full p-2 rounded bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-[#3E92CC]"
              required
            />
            <button
              type="submit"
              className="w-full py-2 bg-[#3E92CC] text-[#13293D] rounded-full hover:bg-[#2A628F] transition transform hover:scale-105"
            >
              Create Job Posting
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JobPosting;

import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployerHeader from "./components/EmployerHeader";
import Footer from "./components/Footer";

const JobPosting = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(formRef.current!);
    const startDate = formData.get("start_date") as string;

    if (new Date(startDate) <= new Date()) {
      setError("Start date cannot be before the current date.");
      setLoading(false);
      return;
    }

    const data = {
      title: formData.get("title"),
      type: formData.get("type"),
      description: formData.get("description"),
      requirements: formData.get("requirements"),
      location: formData.get("location"),
      salary: formData.get("salary"),
      start_date: formData.get("start_date"),
    };

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("/api/employer/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        navigate("/employer/dashboard");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to create job posting");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
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
            <select
              name="type"
              className="w-full p-2 rounded bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-[#3E92CC]"
              required
            >
              <option value="">Select Type</option>
              <option value="Job">Job</option>
              <option value="Internship">Internship</option>
            </select>
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
            <input
              type="date"
              name="start_date"
              placeholder="Start Date"
              className="w-full p-2 rounded bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-[#3E92CC]"
              required
            />
            <button
              type="submit"
              className="w-full py-2 bg-[#3E92CC] text-[#13293D] rounded-full hover:bg-[#2A628F] transition transform hover:scale-105"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Job Posting"}
            </button>
          </form>
          {error ? (
            <div className="text-red-500 mt-4 text-center">{error}</div>
          ) : (
            <div className="mt-10"></div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JobPosting;

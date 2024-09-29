import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ListJobPostings = () => {
  interface JobPosting {
    _id: string;
    title: string;
    type: string;
    description: string;
    requirements: string[];
    location: string[];
    salary: number | { $numberDecimal: string };
    start_date: string;
    numberOfApplicants: number;
    updatedAt: string;
  }

  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [editJobData, setEditJobData] = useState<Partial<JobPosting>>({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobPostings = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/employer/getall", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          data.sort(
            (a: JobPosting, b: JobPosting) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
          setJobPostings(data);
        } else {
          setError("Failed to fetch job postings.");
        }
      } catch (err) {
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobPostings();
  }, []);

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    try {
      const response = await fetch(`/api/employer/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setJobPostings((prev) => prev.filter((job) => job._id !== id));
      } else {
        setError("Failed to delete job posting.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    }
  };

  const handleEdit = (job: JobPosting) => {
    setEditJobData(job);
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    const { _id, ...updateData } = editJobData;

    try {
      setUpdateLoading(true);
      const response = await fetch(`/api/employer/update/${_id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        setJobPostings((prev) =>
          prev.map((job) => (job._id === _id ? { ...job, ...updateData } : job))
        );
        setEditJobData({});
      } else {
        setError("Failed to update job posting.");
      }
      setUpdateLoading(false);
    } catch (err) {
      setError("An unexpected error occurred.");
      setUpdateLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 max-h-screen overflow-y-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Job Postings</h2>
      <div className="space-y-6">
        <div
          className="p-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition"
          onClick={() => navigate("/employer/create")}
        >
          <h3 className="text-2xl text-center">Create New Job Posting</h3>
        </div>
        {jobPostings.map((job) => (
          <div
            key={job._id}
            className="p-6 bg-blue-500 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <div
              className="flex-grow cursor-pointer"
              onClick={() => handleEdit(job)}
            >
              <h3 className="text-2xl font-semibold text-gray-300">
                {job.title}
              </h3>
              <p className="text-gray-100 mt-2">Type: {job.type}</p>
              <p className="text-gray-100 mt-2">{job.description}</p>
              <p className="text-gray-100 mt-2">
                Requirements: {job.requirements.join(", ")}
              </p>
              <p className="text-gray-100 mt-2">
                Location: {job.location.join(", ")}
              </p>
              <p className="text-gray-100 mt-2">
                Start Date: {new Date(job.start_date).toLocaleDateString()}
              </p>
              <p className="text-gray-100 mt-2">
                Salary: $
                {typeof job.salary === "number"
                  ? job.salary
                  : job.salary.$numberDecimal}
              </p>
              <p className="text-gray-100 mt-2">
                Number of Applicants: {job.numberOfApplicants}
              </p>
            </div>
            <button
              className="ml-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
              onClick={() => setConfirmDelete(job._id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {confirmDelete === job._id && (
              <div className="flex flex-col items-center mt-4">
                <h3 className="text-lg font-semibold">
                  Are you sure you want to remove this listing?
                </h3>
                <div className="mt-4 flex space-x-4">
                  <button
                    className="py-2 px-4 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                    onClick={() => handleDelete(job._id)}
                  >
                    Yes
                  </button>
                  <button
                    className="py-2 px-4 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition"
                    onClick={() => setConfirmDelete(null)}
                  >
                    No
                  </button>
                </div>
              </div>
            )}
            {editJobData._id === job._id && (
              <div className="mt-4 w-full">
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editJobData.title || ""}
                    onChange={(e) =>
                      setEditJobData({ ...editJobData, title: e.target.value })
                    }
                    className="w-full p-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Title"
                  />
                  <textarea
                    value={editJobData.description || ""}
                    onChange={(e) =>
                      setEditJobData({
                        ...editJobData,
                        description: e.target.value,
                      })
                    }
                    className="w-full p-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Description"
                  />
                  <input
                    type="text"
                    value={editJobData.requirements?.join(", ") || ""}
                    onChange={(e) =>
                      setEditJobData({
                        ...editJobData,
                        requirements: e.target.value.split(","),
                      })
                    }
                    className="w-full p-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Requirements"
                  />
                  <input
                    type="text"
                    value={editJobData.location?.join(", ") || ""}
                    onChange={(e) =>
                      setEditJobData({
                        ...editJobData,
                        location: e.target.value.split(","),
                      })
                    }
                    className="w-full p-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Location"
                  />
                  <input
                    type="date"
                    value={editJobData.start_date || ""}
                    onChange={(e) =>
                      setEditJobData({
                        ...editJobData,
                        start_date: e.target.value,
                      })
                    }
                    className="w-full p-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Start Date"
                  />
                  <input
                    type="number"
                    value={
                      typeof editJobData.salary === "number"
                        ? editJobData.salary
                        : editJobData.salary?.$numberDecimal || ""
                    }
                    onChange={(e) =>
                      setEditJobData({
                        ...editJobData,
                        salary: parseFloat(e.target.value),
                      })
                    }
                    className="w-full p-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Salary"
                  />
                  <button
                    className="w-full py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition transform hover:scale-105"
                    onClick={handleUpdate}
                    disabled={updateLoading}
                  >
                    {updateLoading ? "Updating..." : "Update"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListJobPostings;

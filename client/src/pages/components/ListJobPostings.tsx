import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ListJobPostings = () => {
  interface JobPosting {
    _id: string;
    title: string;
    description: string;
    location: string[];
    salary: number | { $numberDecimal: string };
    numberOfApplicants: number;
  }

  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
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
    } catch (err) {
      setError("An unexpected error occurred.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl mb-4">Job Postings</h2>
      <div className="space-y-4">
        <div
          className="p-4 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-md cursor-pointer hover:bg-opacity-20 transition"
          onClick={() => navigate("/employer/create")}
        >
          <h3 className="text-xl text-center">Create New Job Posting</h3>
        </div>
        {jobPostings.map((job) => (
          <div
            key={job._id}
            className="p-4 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-md flex flex-col md:flex-row items-center"
          >
            <div
              className="flex-grow cursor-pointer"
              onClick={() => handleEdit(job)}
            >
              <h3 className="text-xl">{job.title}</h3>
              <p className="text-sm">{job.description}</p>
              <p className="text-sm">Location: {job.location.join(", ")}</p>
              <p className="text-sm">
                Salary: $
                {typeof job.salary === "number"
                  ? job.salary
                  : job.salary.$numberDecimal}
              </p>
              <p className="text-sm">
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
              <div className="flex flex-col items-center">
                <h3>Are you sure you want to remove this listing?</h3>
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
                    className="w-full p-2 rounded bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-[#3E92CC]"
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
                    className="w-full p-2 rounded bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-[#3E92CC]"
                    placeholder="Description"
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
                    className="w-full p-2 rounded bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-[#3E92CC]"
                    placeholder="Location"
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
                    className="w-full p-2 rounded bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-[#3E92CC]"
                    placeholder="Salary"
                  />
                  <button
                    className="w-full py-2 bg-[#3E92CC] text-[#13293D] rounded-full hover:bg-[#2A628F] transition transform hover:scale-105"
                    onClick={handleUpdate}
                  >
                    Update
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

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EmployerHeader from "../components/EmployerHeader";
import Footer from "../components/Footer";

const EmployerSignout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignout = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/employer/signout", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        localStorage.clear();
        navigate("/employer/login");
      } else {
        alert("Failed to sign out. Please try again.");
      }
    } catch (error) {
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#13293D] text-white">
      <EmployerHeader />
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md m-6 md:max-w-2xl p-8 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-2xl flex flex-col items-center">
          <h2 className="text-3xl mb-6 text-center">
            Are you sure you want to sign out?
          </h2>
          <div className="flex space-x-4 w-full">
            <button
              className="flex-1 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition transform hover:scale-105"
              onClick={handleSignout}
              disabled={loading}
            >
              {loading ? "Loading.." : "Yes"}
            </button>
            <Link
              to="/employer/dashboard"
              className="flex-1 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition transform hover:scale-105 text-center"
            >
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EmployerSignout;

import { useState } from "react";
import EmployerHeader from "../components/EmployerHeader";
import Footer from "../components/Footer";
import ListJobPostings from "../components/ListJobPostings";
import EmployerProfile from "../components/EmployerProfile";

const EmployerDashboard = () => {
  const [selectedOption, setSelectedOption] = useState("jobPostings");

  const renderContent = () => {
    switch (selectedOption) {
      case "listJobPostings":
        return <ListJobPostings />;
      case "profileInfo":
        return <EmployerProfile />;
      default:
        return <ListJobPostings />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#13293D] text-white">
      <EmployerHeader />
      <main className="flex-grow p-4 flex flex-col md:flex-row mt-16 md:mt-16 md:max-w-6xl">
        <nav className="md:w-1/4 bg-white bg-opacity-10 backdrop-blur-md p-4 rounded-lg shadow-md mb-4 md:mb-0 md:mr-4">
          <ul className="space-y-4">
            <li>
              <button
                className={`w-full text-left p-2 rounded ${
                  selectedOption === "jobPostings"
                    ? "bg-[#3E92CC] text-[#13293D]"
                    : "bg-transparent text-white"
                }`}
                onClick={() => setSelectedOption("jobPostings")}
              >
                Job Postings
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left p-2 rounded ${
                  selectedOption === "profileInfo"
                    ? "bg-[#3E92CC] text-[#13293D]"
                    : "bg-transparent text-white"
                }`}
                onClick={() => setSelectedOption("profileInfo")}
              >
                Profile Information
              </button>
            </li>
          </ul>
        </nav>
        <div className="md:w-3/4 bg-white bg-opacity-10 backdrop-blur-md p-4 rounded-lg shadow-md">
          {renderContent()}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EmployerDashboard;

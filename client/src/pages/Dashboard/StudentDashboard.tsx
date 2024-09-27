import StudentHeader from "../components/StudentHeader";
import Footer from "../components/Footer";

const StudentDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#2B3A67] text-white">
      <StudentHeader />
      <main className="flex-grow p-4">
        <h1 className="text-3xl mb-4">Student Dashboard</h1>
        <div className="bg-white bg-opacity-10 backdrop-blur-md p-4 rounded-lg shadow-md">
          {/* Add your dashboard components here */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StudentDashboard;

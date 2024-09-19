import StudentHeader from "../components/StudentHeader";
import Footer from "../components/Footer";

const StudentLanding = () => {
  return (
    <div className="min-h-screen flex flex-col bg-green-800">
      <StudentHeader />
      <main className="flex-grow flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h1 className="text-5xl mb-8">Welcome Students</h1>
          <p className="text-xl mb-4">
            Find the best opportunities for your career.
          </p>
          <a
            href="/register"
            className="px-6 py-3 bg-green-500 text-black rounded hover:bg-green-600 transition"
          >
            Join Now
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StudentLanding;

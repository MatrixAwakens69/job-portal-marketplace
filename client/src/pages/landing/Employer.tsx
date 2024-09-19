import EmployerHeader from "../components/EmployerHeader";
import Footer from "../components/Footer";

const EmployerLanding = () => {
  return (
    <div className="min-h-screen flex flex-col bg-blue-800">
      <EmployerHeader />
      <main className="flex-grow flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h1 className="text-5xl mb-8">Welcome Employers</h1>
          <p className="text-xl mb-4">
            Find the best candidates for your company.
          </p>
          <a
            href="/register"
            className="px-6 py-3 bg-blue-500 text-black rounded hover:bg-blue-600 transition"
          >
            Join Now
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EmployerLanding;

import InstituteHeader from "../components/InstituteHeader";
import Footer from "../components/Footer";

const InstituteLanding = () => {
  return (
    <div className="min-h-screen flex flex-col bg-purple-800">
      <InstituteHeader />
      <main className="flex-grow flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h1 className="text-5xl mb-8">Welcome Institutes</h1>
          <p className="text-xl mb-4">
            Collaborate with top employers and students.
          </p>
          <a
            href="/register"
            className="px-6 py-3 bg-purple-500 text-black rounded hover:bg-purple-600 transition"
          >
            Join Now
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InstituteLanding;

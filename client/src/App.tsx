import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center bg-black text-white text-center">
        <h1 className="text-6xl mb-12">Welcome to Jazzee Marketplace</h1>
        <div className="flex space-x-8">
          <Link
            to="/employer"
            className="block px-8 py-4 bg-blue-500 text-black text-2xl font-semibold rounded-full hover:bg-blue-600 transition duration-500 transform hover:scale-110"
          >
            I'm an Employer
          </Link>
          <Link
            to="/student"
            className="block px-8 py-4 bg-green-500 text-black text-2xl font-semibold rounded-full hover:bg-green-600 transition duration-500 transform hover:scale-110"
          >
            I'm a Student
          </Link>
          <Link
            to="/institute"
            className="block px-8 py-4 bg-purple-500 text-black text-2xl font-semibold rounded-full hover:bg-purple-600 transition duration-500 transform hover:scale-110"
          >
            For Institutes
          </Link>
        </div>
      </main>
    </div>
  );
};

export default App;

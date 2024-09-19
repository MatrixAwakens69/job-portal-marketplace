import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      <main className="flex-grow flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-6xl font-bold mb-36 text-primary">
          Welcome to Jazzee Marketplace
        </h1>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
          <Link
            to="/employer"
            className="btn btn-primary btn-lg rounded-full shadow-lg transform transition duration-500 hover:scale-110"
          >
            I'm an Employer
          </Link>
          <Link
            to="/student"
            className="btn btn-secondary btn-lg rounded-full shadow-lg transform transition duration-500 hover:scale-110"
          >
            I'm a Student
          </Link>
          <Link
            to="/institute"
            className="btn btn-accent btn-lg rounded-full shadow-lg transform transition duration-500 hover:scale-110"
          >
            For Institutes
          </Link>
        </div>
      </main>
    </div>
  );
};

export default App;

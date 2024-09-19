import { Link } from "react-router-dom";

const InstituteHeader = () => {
  return (
    <header className="bg-white bg-opacity-10 backdrop-blur-md shadow-md p-4 flex justify-between items-center">
      <div className="text-2xl text-white">Jazzee Marketplace - Institutes</div>
      <div>
        <Link
          to="/login"
          className="px-4 py-2 text-white hover:text-gray-300 transition"
        >
          Sign In
        </Link>
        <Link
          to="/register"
          className="ml-4 px-4 py-2 bg-purple-500 text-black rounded hover:bg-purple-600 transition"
        >
          Join
        </Link>
      </div>
    </header>
  );
};

export default InstituteHeader;

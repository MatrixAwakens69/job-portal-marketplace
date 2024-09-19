import { Link } from "react-router-dom";

const StudentHeader = () => {
  return (
    <header className="bg-white bg-opacity-10 backdrop-blur-md shadow-md p-4 flex justify-between items-center">
      <div className="text-2xl text-white">Jazzee Marketplace - Students</div>
      <div>
        <Link to="/login" className="btn btn-outline btn-secondary mx-2">
          Sign In
        </Link>
        <Link to="/register" className="btn btn-secondary mx-2">
          Join
        </Link>
      </div>
    </header>
  );
};

export default StudentHeader;

import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FaBars } from "react-icons/fa";

const EmployerHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: { target: any }) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header className="bg-white bg-opacity-10 backdrop-blur-md shadow-md p-4 flex justify-between items-center">
      <div className="text-2xl text-white">Jazzee Marketplace - Employers</div>
      <div className="hidden md:flex">
        <Link to="/login" className="btn btn-outline btn-primary mx-2">
          Sign In
        </Link>
        <Link to="/register" className="btn btn-primary mx-2">
          Join
        </Link>
      </div>
      <div className="md:hidden relative" ref={dropdownRef}>
        <button className="btn btn-primary" onClick={() => setIsOpen(!isOpen)}>
          <FaBars />
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-1 w-32 bg-white bg-opacity-10 backdrop-blur-lg rounded-md shadow-lg z-10 animate-dropdown">
            <Link
              to="/login"
              className="block px-4 py-2 text-white hover:bg-blue-500 hover:bg-opacity-20 transition"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="block px-4 py-2 text-white hover:bg-blue-500 hover:bg-opacity-20 transition"
              onClick={() => setIsOpen(false)}
            >
              Join
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default EmployerHeader;

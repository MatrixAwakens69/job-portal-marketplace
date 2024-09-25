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
    <header className="bg-[#13293D] bg-opacity-90 backdrop-blur-md shadow-md p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
      <Link to="/employer" className="text-2xl text-white">
        Jazzee Marketplace
      </Link>
      <div className="hidden md:flex md:space-x-4">
        <Link
          to="/overview"
          className="text-white hover:text-[#3E92CC] transition"
        >
          Overview
        </Link>
        <Link
          to="/hiring"
          className="text-white hover:text-[#3E92CC] transition"
        >
          Who's Hiring
        </Link>
        <Link
          to="/about"
          className="text-white hover:text-[#3E92CC] transition"
        >
          About Us
        </Link>
      </div>
      <div className="hidden md:flex">
        <Link
          to="/employer/login"
          className="btn btn-outline rounded-full btn-primary mx-2 text-white border-[#3E92CC] hover:bg-[#3E92CC]"
        >
          Sign In
        </Link>
        <Link
          to="/employer/register"
          className="btn btn-primary rounded-full mx-2 bg-[#3E92CC] text-[#13293D] hover:bg-[#2A628F]"
        >
          Join
        </Link>
      </div>
      <div className="md:hidden relative" ref={dropdownRef}>
        <button
          className="btn btn-primary bg-[#3E92CC] text-[#13293D] hover:bg-[#2A628F]"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaBars />
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-1 w-48 bg-[#13293D] bg-opacity-90 backdrop-blur-lg rounded-md shadow-lg z-10 animate-dropdown">
            <Link
              to="/overview"
              className="block px-4 py-2 text-white hover:bg-[#3E92CC] hover:bg-opacity-20 transition"
              onClick={() => setIsOpen(false)}
            >
              Overview
            </Link>
            <Link
              to="/hiring"
              className="block px-4 py-2 text-white hover:bg-[#3E92CC] hover:bg-opacity-20 transition"
              onClick={() => setIsOpen(false)}
            >
              Who's Hiring
            </Link>
            <Link
              to="/about"
              className="block px-4 py-2 text-white hover:bg-[#3E92CC] hover:bg-opacity-20 transition"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/employer/login"
              className="block px-4 py-2 text-white hover:bg-[#3E92CC] hover:bg-opacity-20 transition"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>
            <Link
              to="/employer/register"
              className="block px-4 py-2 text-white hover:bg-[#3E92CC] hover:bg-opacity-20 transition"
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

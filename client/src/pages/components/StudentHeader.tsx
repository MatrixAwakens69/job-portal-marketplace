import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FaBars } from "react-icons/fa";

const StudentHeader = () => {
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
    <header className="bg-[#2B3A67] bg-opacity-90 backdrop-blur-md shadow-md p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
      <Link to="/student" className="text-2xl text-white">
        Jazzee Marketplace
      </Link>
      <div className="hidden md:flex md:space-x-4">
        <Link
          to="/overview"
          className="text-[#FFFD82] hover:text-[#FF9B71] transition"
        >
          Overview
        </Link>
        <Link
          to="/hiring"
          className="text-[#FFFD82] hover:text-[#FF9B71] transition"
        >
          Who's Hiring
        </Link>
        <Link
          to="/about"
          className="text-[#FFFD82] hover:text-[#FF9B71] transition"
        >
          About Us
        </Link>
      </div>
      <div className="hidden md:flex">
        <Link
          to="/student/login"
          className="btn btn-outline rounded-full btn-secondary mx-2 text-[#FFFD82] border-[#FF9B71] hover:bg-[#FF9B71]"
        >
          Sign In
        </Link>
        <Link
          to="/student/register"
          className="btn btn-secondary rounded-full mx-2 bg-[#FF9B71] text-[#2B3A67] hover:bg-[#E84855]"
        >
          Join
        </Link>
      </div>
      <div className="md:hidden relative" ref={dropdownRef}>
        <button
          className="btn btn-secondary bg-[#FF9B71] text-[#2B3A67] hover:bg-[#E84855]"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaBars />
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-1 w-48 bg-[#2B3A67] bg-opacity-90 backdrop-blur-lg rounded-md shadow-lg z-10 animate-dropdown">
            <Link
              to="/overview"
              className="block px-4 py-2 text-[#FFFD82] hover:bg-[#FF9B71] hover:bg-opacity-20 transition"
              onClick={() => setIsOpen(false)}
            >
              Overview
            </Link>
            <Link
              to="/hiring"
              className="block px-4 py-2 text-[#FFFD82] hover:bg-[#FF9B71] hover:bg-opacity-20 transition"
              onClick={() => setIsOpen(false)}
            >
              Who's Hiring
            </Link>
            <Link
              to="/about"
              className="block px-4 py-2 text-[#FFFD82] hover:bg-[#FF9B71] hover:bg-opacity-20 transition"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/student/login"
              className="block px-4 py-2 text-[#FFFD82] hover:bg-[#FF9B71] hover:bg-opacity-20 transition"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>
            <Link
              to="/student/register"
              className="block px-4 py-2 text-[#FFFD82] hover:bg-[#FF9B71] hover:bg-opacity-20 transition"
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

export default StudentHeader;

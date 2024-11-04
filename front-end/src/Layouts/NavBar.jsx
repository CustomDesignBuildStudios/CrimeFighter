import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";

function NavBar() {
  return (
    <header className="w-full p-4 bg-gray-200 shadow-md">
      <div className="container flex items-center justify-between mx-auto">
        <div className="flex items-center">
          {" "}
          {/* Added this wrapper */}
          <img src={logo} alt="LA Crime Tracker Logo" className="h-8" />
          <h1 className="ml-2 text-xl font-semibold text-gray-700">
            {" "}
            {/* Added margin-left */}
            LA Crime Tracker
          </h1>
        </div>
        <nav className="flex gap-4 text-gray-700">
          <Link to="/" className="hover:text-gray-900 hover:underline">
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-900 hover:underline">
            About
          </Link>
          <Link to="/data" className="hover:text-gray-900 hover:underline">
            Data
          </Link>
          <Link to="/myreports" className="hover:text-gray-900 hover:underline">
            My Reports
          </Link>
          <Link to="/myprofile" className="hover:text-gray-900 hover:underline">
            Profile
          </Link>

          {/*Add logic here to where if use if logged in, then it changes to logout, and handle logout logic */}
          <Link to="/login" className="hover:text-gray-900 hover:underline">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default NavBar;

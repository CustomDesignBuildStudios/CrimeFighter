import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import axios from "axios";
//import "./AboutPage.css";
import CanvasJSReact from "@canvasjs/react-charts";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function AboutPage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <header className="w-full p-4 bg-gray-200 shadow-md">
        <div className="container flex items-center justify-between mx-auto">
          <img src={logo} alt="LA Crime Tracker Logo" className="h-8" />
          <h1 className="text-xl font-semibold text-gray-700">
            LA Crime Tracker
          </h1>
          <nav className="flex gap-4 text-gray-700">
            <a href="#" className="hover:text-gray-900">
              Home
            </a>
            <a href="#" className="hover:text-gray-900">
              Data
            </a>
            <a href="#" className="hover:text-gray-900">
              My Reports
            </a>
            <a href="#" className="hover:text-gray-900">
              Profile
            </a>
          </nav>
        </div>
      </header>

      <main className="container p-4 mx-auto my-8 bg-white rounded-lg shadow-md">
        <section className="mb-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            About Crime Tracker
          </h2>
          <p className="mt-2 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </section>

        <section className="text-center text-gray-600">
          {/* Make LOGIN / REGISTER clickable */}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:underline"
          >
            LOGIN / REGISTER TO ADD CRIME
          </Link>
        </section>

        <div className="mt-6">
          {/* Insert your map component here */}
          <img
            src="https://via.placeholder.com/800x400"
            alt="Map of Los Angeles"
            className="w-full rounded-lg shadow-md"
          />
        </div>
      </main>
    </div>
  );
}

export default AboutPage;

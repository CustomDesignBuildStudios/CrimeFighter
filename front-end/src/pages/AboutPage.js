import React, { useState } from "react";
import { Link } from "react-router-dom";
import LAPicture from "../Pictures/LAPicture.jpg";
import axios from "axios";
import CanvasJSReact from "@canvasjs/react-charts";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function AboutPage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <main className="container p-4 mx-auto my-8 bg-white rounded-lg shadow-md">
        <section className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            About Crime Tracker
          </h1>
          <p className="mt-2 text-gray-600">
            Crime is one of the most critical and widely discussed topics in
            this country. With many regions around the world affected by high
            crime rates, the need for a comprehensive tool to track and monitor
            crime is essential. Keeping yourself, family, and friends safe is of
            utmost importance, particularly in high crime areas like metro Los
            Angeles. LA is one the most popular tourist destinations in not only
            the US, but the world, making it a dynamic hub for all types of
            people, even criminals. This application will gather information
            about crimes in LA to help anyone monitor and track crime by seeing
            trends, statistics, and patterns. Whether you are a civilian looking
            for high crime areas to avoid, or a law enforcement officer updating
            the status of an ongoing case, our app can help people make informed
            decisions on travel, leisure, or work.
          </p>
        </section>

        <section className="text-center text-gray-600">
          {/* Add Login here to where if user logged in, then this button does not appear */}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:underline"
          >
            LOGIN / REGISTER TO ADD/VIEW CRIMES
          </Link>
        </section>

        <div className="mt-6">
          {/* Below, add a picture to go along with the app*/}
          <img
            src={LAPicture}
            alt="Los Angeles"
            className="w-full rounded-lg shadow-md"
          />
        </div>
      </main>
    </div>
  );
}

export default AboutPage;

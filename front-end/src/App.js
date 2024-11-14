// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import DataPage from "./pages/DataPage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import MyReports from "./pages/MyReports.jsx";
import NavBar from "./Layouts/NavBar.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import { GoogleMap, LoadScript, Marker, LoadScriptNext } from '@react-google-maps/api';
import AdvanceQueryPage from "./pages/AdvanceQuery.jsx";

function App() {
  
  return (
    <LoadScript googleMapsApiKey="AIzaSyD5aQjrqz7O84b1lSmYp0vUdwGfPxOT3kk">
      <Router>
        {/* // <nav>
        //   <Link to="/">Home</Link>
        //   <Link to="/about">About</Link>
        //   <Link to="/data">Data</Link>
        // </nav> */}
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/data" element={<DataPage data={{"type":"none"}} />} />
          <Route path="/" element={<AboutPage />} />
          <Route path="/advance" element={<AdvanceQueryPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/myreports" element={<DataPage data={{"type":"user"}} />}  />
          <Route path="/myprofile" element={<MyProfile />} />
        </Routes>
      </Router>
  </LoadScript>



  );
}

export default App;

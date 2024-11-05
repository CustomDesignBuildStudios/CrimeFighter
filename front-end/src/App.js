// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import DataPage from "./pages/DataPage";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import MyReports from "./pages/MyReports.jsx";
import NavBar from "./Layouts/NavBar.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import { AuthProvider } from "./AuthContext.jsx";

function App() {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/data" element={<DataPage />} />
          <Route path="/" element={<AboutPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/myreports" element={<MyReports />} />
          <Route path="/myprofile" element={<MyProfile />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

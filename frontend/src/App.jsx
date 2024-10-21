import React, { useState } from "react";
import './App.css'
import { Outlet, useNavigate } from "react-router-dom";
import AppNavbar from "./components/Header/navbar";

const App = () => {
  const navigate = useNavigate();

  const handleLogin = (email) => {
  
    // Check if the email belongs to an admin or a student
    if (email.includes("admin")) {
      // Redirect to admin dashboard
      navigate("/admin", { state: { email } });
    } else {
      // Redirect to student dashboard
      navigate("/student", { state: { email } });
    }
  };

  return (
    <>
    <AppNavbar/>
    <main>
    <Outlet context={{ handleLogin }} />
    </main>
    </>
  );
};

export default App;

import React, { useState } from "react";
import './App.css'
import { Outlet, useNavigate } from "react-router-dom";
import AppNavbar from "./components/Header/navbar";

const App = () => {
  const [loggedInAdminEmail, setLoggedInAdminEmail] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (email, role) => {
    setLoggedInAdminEmail(email);
    if (role === "Admin") {
      navigate("/admin", { state: { email } });
    } else {
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

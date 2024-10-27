import React, { useEffect, useState } from "react";
import './App.css'
import { Outlet } from "react-router-dom";
import AppNavbar from "./components/Header/navbar";
import { useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  useEffect(() => {
    if (location.pathname !== '/') {
      setIsNavbarVisible(true);
    } else {
      setIsNavbarVisible(false);
    }
  }, [location]);

  return (
    <>
      {isNavbarVisible && <AppNavbar />}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default App;

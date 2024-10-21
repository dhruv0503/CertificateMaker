import React from "react";
import Student from "../components/StudentDashboard/Student";
import { useLocation } from "react-router-dom";

const Studentdashboard = () => {
  const location = useLocation();
  const userData = location.state?.userData;
  return (
    <>
       <h1 className="font-family:font-mono" > Welcome, {userData?.name || "Student"}</h1>
      <Student />
    </>
  );
};

export default Studentdashboard;

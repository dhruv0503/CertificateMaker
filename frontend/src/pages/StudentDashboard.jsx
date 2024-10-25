import React from "react";
import Student from "../components/StudentDashboard/Student";
import { useLocation } from "react-router-dom";

const Studentdashboard = () => {
  const location = useLocation();
  const userData = location.state?.userData;
  return (
    <>
     
      <Student />
    </>
  );
};

export default Studentdashboard;

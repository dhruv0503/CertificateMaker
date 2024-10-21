import React from "react";
import AdminUpload from "../components/AdminDashboard/admin";
import { useLocation } from "react-router-dom";

const AdminDashboardPage = () => {
  const location = useLocation();
  const userData = location.state?.userData;
  return (
    <>
     <h1 className="font-family:font-mono	">Welcome, {userData?.name || "Admin"}</h1>
      <AdminUpload />
    </>
  );
};

export default AdminDashboardPage;

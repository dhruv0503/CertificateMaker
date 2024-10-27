import React, { useEffect, useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import FilesCard from "./FilesCard";
import { useLocation, useNavigate } from "react-router-dom";
import "./admin.css";
import Banner from "../StudentDashboard/Banner";
import AddUsers from "./AddUsers";
import CertificateUpload from "./CreateCertificate";

const Admin = () => {
  const [files, setFiles] = useState([]);
  const [uploadError, setUploadError] = useState(null);
  const [query, setQuery] = useState("");
  const [showAddUsers, setShowAddUsers] = useState(false);
  const [showCertificateUpload, setShowCertificateUpload] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const location = useLocation();
  const userData = location.state?.userData;

  // Fetch certificates data
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/certificates`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setFiles(response.data);
      } catch (error) {
        setUploadError("Failed to load certificates. Please try again.");
        console.error("Error fetching certificates:", error);
      }
    };
    fetchCertificates();
  }, []);

  // const password = files[0].password;
  // console.log(password);

  function formatDate(isoString) {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }
  // Handle search input change
  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setCurrentPage(1);
  };

  // Sort certificates by latest issue date first
  const sortedFiles = [...files].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Filter certificates based on query
  const filteredItems = sortedFiles.filter(
    (certificate) =>
      certificate.name?.toLowerCase().includes(query.toLowerCase()) ||
      certificate.department?.toLowerCase().includes(query.toLowerCase()) ||
      certificate.id?.toLowerCase().includes(query.toLowerCase())
  );

  // Calculate pagination range
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  const { startIndex, endIndex } = calculatePageRange();
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  // Pagination controls
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Toggle visibility functions
  const toggleAddUsers = () => setShowAddUsers(!showAddUsers);
  const toggleCertificateUpload = () =>
    setShowCertificateUpload(!showCertificateUpload);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-gray-300">
      <div className="flex justify-between items-center p-4">
        {/* Upload Certificate Button */}
        <button
          onClick={toggleCertificateUpload}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-xl transition-transform duration-300"
        >
          Upload Certificates
        </button>

        {showCertificateUpload && (
          <div className="fixed inset-0  bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
              <button
                onClick={toggleCertificateUpload}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                style={{ fontSize: "30px" }}
              >
                &times;
              </button>
              <CertificateUpload />
            </div>
          </div>
        )}

        {/* Welcome Message */}
        <h1 className="font-serif text-2xl font-bold bg-gradient-to-r from-indigo-500 to-blue-300 text-transparent bg-clip-text shadow-lg hover:shadow-2xl transition-all duration-300 p-2 rounded-lg">
          Welcome, {userData?.name || "Admin"}
        </h1>

        {/* Add Users Button */}
        <button
          onClick={toggleAddUsers}
          className="bg-gradient-to-r from-green-500 to-teal-600 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-xl transition-transform duration-300"
        >
          Add More Users
        </button>

        {showAddUsers && (
          <div className="fixed inset-0  bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
              <button
                onClick={toggleAddUsers}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                style={{ fontSize: "30px" }}
              >
                &times;
              </button>
              <AddUsers />
            </div>
          </div>
        )}
      </div>

      <Banner query={query} handleInputChange={handleInputChange} />

      {/* Certificate List */}
      <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {paginatedItems.length > 0 ? (
          paginatedItems.map((item) => (
            <FilesCard
              key={item._id}
              id={item._id}
              username={item?.user?.name}
              departmentName={item?.department}
              issueDate={formatDate(item?.date)}
              className="transform hover:scale-105 transition-transform duration-300 bg-white p-4 rounded-lg shadow-lg"
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-700">
            {uploadError || "No certificates found for your search."}
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center my-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg mx-2 disabled:opacity-50 shadow-md"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-gray-700">
          Page {currentPage} of{" "}
          {Math.ceil(filteredItems.length / itemsPerPage) || "1"}
        </span>
        <button
          onClick={nextPage}
          disabled={
            currentPage === Math.ceil(filteredItems.length / itemsPerPage)
          }
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg mx-2 disabled:opacity-50 shadow-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Admin;

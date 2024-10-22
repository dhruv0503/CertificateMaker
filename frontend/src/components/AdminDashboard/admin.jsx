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
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [query, setQuery] = useState("");
  const [showAddUsers, setShowAddUsers] = useState(false); // adding new users

  const navigate = useNavigate();
  const location = useLocation();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const userData = location.state?.userData || {};


// upload new certificates
  const [showCertificateUpload, setShowCertificateUpload] = useState(false);

  const toggleCertificateUpload = () => {
    setShowCertificateUpload(!showCertificateUpload);
  };



  // Fetch certificates data
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/certificates",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const certiRef = response.data;
        setFiles(certiRef);
      } catch (error) {
        setUploadError("Failed to load certificates. Please try again.");
        console.error("Error fetching certificates:", error);
      }
    };

    fetchCertificates();
  }, []);

  // ----------- Input Filter -----------
  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setCurrentPage(1);
  };

  //------------filter by job title-----
  const filteredItems = files?.filter(
    (certificate) =>
      certificate.name?.toLowerCase()?.indexOf(query.toLowerCase()) !== -1 ||
      certificate.department?.toLowerCase()?.indexOf(query.toLowerCase()) !==
        -1 ||
      certificate.id?.toLowerCase()?.indexOf(query.toLowerCase()) !== -1
  );
  // console.log(filteredItems);

  // Function to calculate the index range for the current page
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  const { startIndex, endIndex } = calculatePageRange();
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  // Function to handle next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to handle previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to toggle the AddUsers component visibility
  const toggleAddUsers = () => {
    setShowAddUsers(!showAddUsers);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-100 ">
      <div className="flex justify-content-between ">
        {/* Upload new Certificate */}
        <button
        onClick={toggleCertificateUpload}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Upload Certificates
      </button>
      {showCertificateUpload && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              onClick={toggleCertificateUpload}
              className="absolute top-2 right-1 bg-gray-100 text-gray-500 hover:text-gray-800 rounded-full px-2 pb-1"
              style={{ fontSize: '30px' }}
            >
              &times;
            </button>
            <CertificateUpload />
          </div>
        </div>
      )}


        {/* Add Users */}
        <button
          onClick={toggleAddUsers}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add More Users
        </button>

        {showAddUsers && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
              <button
                onClick={toggleAddUsers}
                className="absolute top-2 right-1 bg-gray-100 text-gray-500 hover:text-gray-800 rounded-full px-2 pb-1"
                style={{ fontSize: '30px' }}
              >
                &times; {/* Close button */}
              </button>
              <AddUsers />
            </div>
          </div>
        )}
      </div>

      <div className="">
        <Banner query={query} handleInputChange={handleInputChange} />
      </div>

      {/* Certificate List */}
      {/* <CertificateList certificates={paginatedItems} /> */}
      <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 m-3">
        {paginatedItems.length > 0 ? (
          paginatedItems.map((item) => (
            <FilesCard
              key={item._id}
              id={item._id}
              username={item?.user?.name}
              departmentName={item?.department}
              issueDate={item?.date}
            />
          ))
        ) : (
          <div className="col-span-full text-center">
            {uploadError || "No certificates found for your search."}
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center my-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded mx-2 hover:bg-blue-600"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage) || '1'}
        </span>
        <button
          onClick={nextPage}
          disabled={
            currentPage === Math.ceil(filteredItems.length / itemsPerPage)
          }
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded mx-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Admin;

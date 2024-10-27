import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import './student.css';
import axios from "axios";

import { useLocation } from "react-router-dom";
import Card from "./Card";

const Student = () => {
  const [certificates, setCertificates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const location = useLocation();
  const userData = location.state?.userData || {};

  useEffect(() => {
    setCertificates(userData?.certificates || []);
  }, [userData]);

  // ----------- Input Filter ----------- 
  const [query, setQuery] = useState("");
  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setCurrentPage(1);
  };

  // Filter certificates based on the query
  const filteredItems = certificates.filter(
    (certificate) =>
      userData.name?.toLowerCase().includes(query.toLowerCase()) ||
      certificate.department?.toLowerCase().includes(query.toLowerCase()) ||
      certificate._id?.toLowerCase().includes(query.toLowerCase())
  );

  // Pagination logic
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  const { startIndex, endIndex } = calculatePageRange();
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  // Function to handle next and previous page
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

  return (
    <div className="student-container">
    <h1 className="font-serif  text-2xl align-self-center font-bold bg-gradient-to-r from-indigo-500 to-purple-600 text-transparent bg-clip-text shadow-lg hover:shadow-2xl transition-all duration-300 p-2 rounded-lg">
    Welcome, {userData?.name || "Admin"}
  </h1>
      <div>
        <Banner query={query} handleInputChange={handleInputChange} />
      </div>
  
      {/* Certificate List */}
      <div className="certificate-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 m-3">
        {paginatedItems.map((item) => (
          <Card
            key={item._id}
            id={item._id}
            username={userData.name}
            departmentName={item.department}
            issueDate={item.date}
          />
        ))}
      </div>
  
      {/* Pagination Controls */}
      <div className="pagination-controls">
      <button
      onClick={prevPage}
      disabled={currentPage === 1}
      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg mx-2 disabled:opacity-50 shadow-md"
    >
      Previous
    </button>
    <span className="px-4 py-2 text-gray-700">
      Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage) || "1"}
    </span>
    <button
      onClick={nextPage}
      disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)}
      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg mx-2 disabled:opacity-50 shadow-md"
    >
      Next
    </button>
      </div>
    </div>
  );
  
};
export default Student;

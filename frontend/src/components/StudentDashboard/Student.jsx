import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import CertificateList from "./CertificateList";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Card from "./Card";

const Student = () => {
  const [certificates, setCertificates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const itemsPerPage = 9;

  const location = useLocation();
  const userData = location.state?.userData || {};

  // Function fetch certificates
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
      setCertificates(certiRef.filter((item) => item.user === userData._id));
    } catch (error) {
      console.error("Failed to fetch certificates:", error);
    }
  };

  // Fetch certificates on component mount
  useEffect(() => {
    fetchCertificates();
  }, []);

  // ----------- Input Filter -----------
  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setCurrentPage(1);
  };

  //------------filter by job title-----
  const filteredItems = certificates?.filter(
    (certificate) =>
      certificate.name?.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      certificate.department?.toLowerCase().indexOf(query.toLowerCase()) !==
        -1 ||
      certificate.id?.toLowerCase().indexOf(query.toLowerCase()) !== -1
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

  return (
    <div className="flex flex-col h-screen bg-slate-100 ">
    <div>
    <Banner query={query} handleInputChange={handleInputChange} />
  </div>

      {/* Certificate List */}
      {/* <CertificateList certificates={paginatedItems} /> */}
      <div className=" flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 m-3">
        {paginatedItems.length > 0 ? (
          paginatedItems.map((item) => (
            <Card
              key={item._id}
              id={item._id}
              username={userData?.name}
              departmentName={item?.department}
              issueDate={item?.date}
            />
          ))
        ) : (
          <div className="col-span-full text-center">
            No certificates found for your search.
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center my-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded mx-2"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage) || '1'}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)}
          className="px-4 py-2 bg-blue-500 text-white rounded mx-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Student;

import React, { useState } from "react";
import Banner from "./Banner";
import data from "../../assets/data";
import CertificateList from "./CertificateList";

const Student = () => {
  const [certificates, setCertificates] = useState([data]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // ----------- Input Filter -----------
  const [query, setQuery] = useState("");
  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setCurrentPage(1);
  };

  //------------filter by job title-----
  const filteredItems = certificates.filter(
    (certificate) =>
      certificate.username?.toLowerCase()?.indexOf(query.toLowerCase()) !== -1 ||
      certificate.department?.toLowerCase()?.indexOf(query.toLowerCase()) !== -1 ||
      certificate.issueDate?.toLowerCase()?.indexOf(query.toLowerCase()) !== -1
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
    <div className="bg-slate-100 	">
      <div className="">
        <Banner query={query} handleInputChange={handleInputChange} />
      </div>

      {/* Certificate List */}
      <CertificateList certificates={paginatedItems} />
      {/* Pagination Controls */}
      <div className="flex justify-center my-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
           className=" px-4 py-2 bg-blue-500 text-white rounded mx-2"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}
        </span>
        <button
          onClick={nextPage}
          disabled={
            currentPage === Math.ceil(filteredItems.length / itemsPerPage)
          }
          className=" px-4 py-2 bg-blue-500 text-white rounded mx-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Student;

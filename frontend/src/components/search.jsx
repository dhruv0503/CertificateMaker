import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "./search.css";
import { generatePDF } from "../generatePDF";

const Search = () => {
  const [certificateId, setCertificateId] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = location.state?.email || "User";

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchResult(null);
    setError("");

    if (!certificateId.trim()) {
      setError("Please enter a certificate ID");
      return;
    }

    try {
      console.log("Searching for certificate ID:", certificateId); // Debugging line
      const response = await axios.get(
        `http://localhost:5000/api/certificate/student_data/${certificateId}`
      );
      console.log("API Response:", response.data); // Debugging line

      if (response.status === 200 && response.data) {
        setSearchResult(response.data);
      } else {
        setError("Certificate not found");
      }
    } catch (error) {
      console.error("Search error:", error); // Debugging line
      if (error.response && error.response.status === 404) {
        setError("Certificate not found");
      } else {
        setError("An error occurred while searching for the certificate");
      }
    }
  };

  const handleDownload = async (certificateData) => {
    try {
      const url = await generatePDF(certificateData);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${certificateData.certificateId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <div className="search-page">
      <div className="welcome-message text-center mb-4">
        <h2>Welcome, {userEmail}</h2>
      </div>

      <div className="text-center mb-4">
        <Button
          variant="outline-primary"
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>

      <Container className="search-container mt-5">
        <div className="search-form border p-4 rounded">
          <Form onSubmit={handleSearch}>
            <Form.Group controlId="formCertificateId">
              <Form.Label>Certificate ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter certificate ID"
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-3">
              Search
            </Button>
            {error && (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
            )}
            {searchResult && !error && (
              <div className="mt-4">
                <h4>Certificate Details</h4>
                <p>
                  <strong>ID:</strong> {searchResult.certificateId}
                </p>
                <p>
                  <strong>Name:</strong> {searchResult.name}
                </p>
                <p>
                  <strong>Domain:</strong> {searchResult.internshipDomain}
                </p>
                <p>
                  <strong>Start Date:</strong>{" "}
                  {new Date(
                    searchResult.internshipStartDate
                  ).toLocaleDateString()}
                </p>
                <p>
                  <strong>End Date:</strong>{" "}
                  {new Date(
                    searchResult.internshipEndDate
                  ).toLocaleDateString()}
                </p>
                <Button
                  variant="success"
                  onClick={() => handleDownload(searchResult)}
                  className="mt-3"
                  style={{
                    backgroundColor: "#FF7700",
                    borderColor: "#FF7700",
                    color: "white",
                  }}
                >
                  Download Certificate
                </Button>
              </div>
            )}
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Search;





// import React, { useState } from "react";
// import { Transition } from "@headlessui/react";
// import { FaSearch } from "react-icons/fa";

// const SearchBar = () => {
//   const [open, setOpen] = useState(false);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   return (
//     <div className="relative">
//       {!open && (
//         <button
//           onClick={handleOpen}
//           className="p-2 rounded-full hover:bg-gray-200"
//         >
//           <FaSearch className="text-gray-500" />
//         </button>
//       )}

//       <Transition
//         show={open}
//         enter="transition ease-out duration-300"
//         enterFrom="transform -translate-y-full opacity-0"
//         enterTo="transform translate-y-0 opacity-100"
//         leave="transition ease-in duration-200"
//         leaveFrom="transform translate-y-0 opacity-100"
//         leaveTo="transform -translate-y-full opacity-0"
//       >
//         <div className="absolute top-0 left-0 w-full bg-white shadow-md p-4 rounded-lg flex items-center">
//           <div className="flex items-center w-full">
//             <FaSearch className="text-gray-500 mr-2" />
//             <input
//               type="text"
//               placeholder="Search…"
//               className="flex-grow p-2 border-none outline-none text-gray-700"
//               autoFocus
//             />
//           </div>
//           <button
//             onClick={handleClose}
//             className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
//           >
//             Search
//           </button>
//         </div>
//       </Transition>
//     </div>
//   );
// };

//export default SearchBar;

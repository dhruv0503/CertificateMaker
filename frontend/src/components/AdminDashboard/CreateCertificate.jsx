import React, { useState } from "react";
import './certificate.css';
import axios from "axios";

const CertificateUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  // Handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle file upload
  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/certificates/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setMessage("Certificates created successfully!");
        setFile(null);
        // Refresh the page to reload certificates
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setMessage("Failed to create certificates. Please try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Error uploading file. Please try again.");
    }
  };

  return (
    <div className="certificate-upload bg-gradient-to-r from-blue-100 to-blue-50 p-8 rounded-3xl shadow-xl max-w-lg mx-auto mt-12 transition-all duration-300">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Upload Certificates</h2>
      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 animate-fade-in">
          {message}
        </div>
      )}
      <form onSubmit={handleFileUpload}>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Choose file to upload:
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
          />
        </div>
        <button
          type="submit"
          className="upload-button w-full py-3 rounded-full text-white font-semibold transition-all duration-300 transform hover:scale-105 focus:scale-105 active:scale-95"
        >
          Upload Certificates
        </button>
      </form>
    </div>
  );
};


export default CertificateUpload;

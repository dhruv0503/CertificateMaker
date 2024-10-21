import React, { useState } from "react";
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
        "http://localhost:5000/api/certificates/upload",
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
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Upload Certificates</h2>
      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {message}
        </div>
      )}
      <form onSubmit={handleFileUpload}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Choose file to upload:
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
        >
          Upload Certificates
        </button>
      </form>
    </div>
  );
};

export default CertificateUpload;

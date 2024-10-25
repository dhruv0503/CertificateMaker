import React, { useState } from "react";
import './addUser.css';
import axios from "axios";

const AddUsers = () => {
  const [file, setFile] = useState(null);
  const [users, setUsers] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setSuccessMessage("");
    setError("");
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setError("Please select a file before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/addUsers",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Set users and display a success message
      setUsers(response.data);
      setSuccessMessage("Users added successfully!");
      setError("");
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Failed to add users. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="add-users-container bg-gradient-to-r from-green-100 to-green-50 p-8 rounded-3xl shadow-xl max-w-lg mx-auto mt-12 transition-all duration-300">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Add Multiple Users</h2>
      
      {/* File Upload Form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="file">
            Upload File
          </label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
          />
        </div>

        {error && <div className="text-red-500 mb-4 animate-fade-in">{error}</div>}

        <button
          type="submit"
          className="submit-button w-full py-3 rounded-full text-white font-semibold transition-all duration-300 transform hover:scale-105 focus:scale-105 active:scale-95"
        >
          Add Users
        </button>
      </form>

      {/* Success Message */}
      {successMessage && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg animate-fade-in">
          {successMessage}
        </div>
      )}

      {/* Display Flash Cards for Users */}
      {users.length > 0 && (
        <div className="mt-6 space-y-4">
          {users.map((user, index) => (
            <div
              key={index}
              className="user-card bg-white p-4 shadow-md rounded-lg border border-gray-200 transition-all duration-300 transform hover:scale-105"
            >
              <p>
                <span className="font-semibold">Username:</span> {user.username}
              </p>
              <p>
                <span className="font-semibold">Password:</span> {user.password}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export default AddUsers;

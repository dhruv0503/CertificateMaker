import React, { useState } from "react";
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
      const response = await axios.post("http://localhost:5000/api/users/addUsers", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

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
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-10" style={{zIndex : 999}}>
      <div >
        <h2 className="text-2xl font-bold mb-4 text-center">Add Multiple Users</h2>
        
        {/* File Upload Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="file">
              Upload File
            </label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          {error && <div className="text-red-500 mb-4">{error}</div>}
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Add Users
          </button>
        </form>

        {/* Success Message */}
        {successMessage && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
            {successMessage}
          </div>
        )}

        {/* Display Flash Cards for Users */}
        {users.length > 0 && (
          <div className="mt-6 space-y-4">
            {users.map((user, index) => (
              <div
                key={index}
                className="bg-white p-4 shadow-md rounded border border-gray-200"
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
    </div>
  );
};

export default AddUsers;

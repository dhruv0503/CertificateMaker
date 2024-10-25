import React from "react";
import { FiCalendar } from "react-icons/fi";
import { Link } from "react-router-dom";
import './card.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FilesCard = ({ username, departmentName, issueDate, id }) => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/certificates/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const downloadUrl = response.data.downloadUrl;
    window.open(downloadUrl, '_blank');
  };

  return (
    <div className="files-card bg-white rounded-lg shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-2xl p-6">
      <div className="flex flex-col gap-4 sm:flex-row items-start">
        <div className="card-details">
          <h4 className="text-blue-600 font-medium mb-1">{username}</h4>
          <h3 className="text-xl font-bold text-gray-800 mb-3">{departmentName}</h3>
          <div className="text-gray-500 text-sm flex flex-wrap gap-4 mb-4">
            <span className="flex items-center gap-2">
              <FiCalendar /> {issueDate}
            </span>
          </div>
          <button onClick={handleSubmit} className="view-button px-5 py-2 rounded-full text-white font-semibold">
            View
          </button>
        </div>
      </div>
    </div>
  );
};


export default FilesCard;
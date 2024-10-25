import React from "react";
import { FiCalendar } from "react-icons/fi";
import { Link } from "react-router-dom";
import './card.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";



const Card = ({ username, departmentName, issueDate, id }) => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/certificates/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const downloadUrl = response.data.downloadUrl;
      window.open(downloadUrl, "_blank");
    } catch (error) {
      console.error("Error fetching certificate:", error);
    }
  };

  return (
    <div className="card-container">
      <div className="bg-white rounded-md shadow-lg card p-4 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
        <div className="flex gap-4 flex-col sm:flex-row items-start">
          <div className="card-details flex-grow">
            <h4 className="text-primary mb-1">{username}</h4>
            <h3 className="text-lg font-semibold mb-2">{departmentName}</h3>
            <div className="text-primary/70 text-base flex flex-wrap gap-4 mb-2">
              <span className="flex items-center gap-2">
                <FiCalendar /> {issueDate}
              </span>
            </div>
            <button
              onClick={handleSubmit}
              className="view-button bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;




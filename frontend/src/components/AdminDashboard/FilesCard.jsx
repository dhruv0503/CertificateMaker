import React from "react";
import { FiCalendar } from "react-icons/fi";
import { Link } from "react-router-dom";
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
    navigate(downloadUrl);
  };

  return (
    <div className="bg-white rounded-md shadow-md card p-4">
      <div className="flex gap-4 flex-col sm:flex-row items-start">
        <div className="card-details">
          <h4 className="text-primary mb-1">{username}</h4>
          <h3 className="text-lg font-semibold mb-2">{departmentName}</h3>
          <div className="text-primary/70 text-base flex flex-wrap gap-4 mb-2">
            <span className="flex items-center gap-2">
              <FiCalendar /> {issueDate}
            </span>
          </div>
          <button onClick={handleSubmit} className="btns">
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilesCard;
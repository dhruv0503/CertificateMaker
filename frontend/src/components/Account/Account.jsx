import React, { useState } from 'react';
import axios from 'axios';
import { MdVisibilityOff } from "react-icons/md";
import { MdOutlineVisibility } from "react-icons/md";

const Account = () => {
  const [mailId, setMailId] = useState('user@example.com'); // Set the user's email here
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showNewPasswordField, setShowNewPasswordField] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/changePassword', { oldPassword, newPassword });
      if (response.data.success) {
        setMessage('Password changed successfully!');
        setOldPassword('');
        setNewPassword('');
        setShowNewPasswordField(false);
      } else {
        setError('Failed to change password. Please try again.');
      }
    } catch (err) {
      setError('Error changing password. Please check your input and try again.');
    }
  };

  return (
    <div className="flex items-center justify-center  bg-gray-100 p-4 gap-4"
    style={{minHeight:'calc(100vh - 64px)'}}>
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Account Settings</h2>

        <div className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">Mail-id</label>
            <input
              type="email"
              value={mailId}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200 text-gray-700 cursor-not-allowed"
            />
          </div>

          {/* Change Password Fields */}
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="relative">
              <label className="block mb-2 text-sm font-medium text-gray-600">Old Password</label>
              <input
                type={showOldPassword ? 'text' : 'password'}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {/* Toggle Visibility Icon */}
              <span
                className="absolute right-3 top-10 text-gray-500 cursor-pointer"
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? <MdVisibilityOff /> : <MdOutlineVisibility />}
              </span>
            </div>

            {/* Show the "New Password" field and the final "Change Password" button only if showNewPasswordField is true */}
            {showNewPasswordField && (
              <div className="relative">
                <label className="block mb-2 text-sm font-medium text-gray-600">Enter New Password</label>
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {/* Toggle Visibility Icon */}
                <span
                  className="absolute right-3 top-10 text-gray-500 cursor-pointer"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <MdVisibilityOff /> : <MdOutlineVisibility />}
                </span>
              </div>
            )}

            {/* Change Password Button */}
            <button
              type="button"
              onClick={() => {
                if (!showNewPasswordField) {
                  setShowNewPasswordField(true); // Show the new password field
                } else {
                  handleChangePassword(); // Submit the form
                }
              }}
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
            >
              {showNewPasswordField ? 'Change Password' : 'Proceed to Change Password'}
            </button>
          </form>

          {/* Success or Error Message */}
          {message && <p className="text-sm text-green-500">{message}</p>}
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Account;




// import React from "react";
// import { FaEnvelopeOpenText, FaRocket } from "react-icons/fa6";

// const Newsletter = () => {
//   return (
    // <div>
    //   <div>
    //     <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
    //       {" "}
    //       <FaEnvelopeOpenText /> Email me for jobs
    //     </h3>
    //     <p className="text-primary/75 text-base mb-4">
    //       Ut esse eiusmod aute. Sit enim labore dolore. Aute ea fugiat commodo
    //       ea foes.
    //     </p>
    //     <div className="w-full space-y-4">
    //       <input
    //         type="email"
    //         placeholder="name@mail.com"
    //         className="w-full block py-2 pl-3 border focus:outline-none"
    //       />
    //       <input
    //         type="submit"
    //         value="Subcribe"
    //         className="w-full block py-2 bg-blue rounded-sm text-white cursor-pointer font-semibold"
    //       />
    //     </div>
    //   </div>

    //   {/* 2nd section */}
    //   <div className="mt-20">
    //     <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
    //       <FaRocket /> Get noticed faster
    //     </h3>
    //     <p className="text-primary/75 text-base mb-4">
    //       Ut esse eiusmod aute. Sit enim labore dolore. Aute ea fugiat commodo
    //       ea foes.
    //     </p>
    //     <div className="w-full space-y-4">
    //       <input
    //         type="submit"
    //         value="Upload your resume"
    //         className="w-full block py-2 bg-blue rounded-sm text-white cursor-pointer font-semibold"
    //       />
    //     </div>
    //   </div>
    // </div>
//   );
// };

// export default Newsletter;
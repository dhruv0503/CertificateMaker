import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdVisibilityOff } from "react-icons/md";
import { MdOutlineVisibility } from "react-icons/md";


const Account = () => {
  const [mailId, setMailId] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showNewPasswordField, setShowNewPasswordField] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setMailId(storedEmail);
    }
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post( `${import.meta.env.VITE_API_URL}/api/changePassword`, { oldPassword, newPassword });
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
    <div className="flex items-center justify-center p-4 gap-4 bg-gradient-to-r from-blue-200 to-purple-300" style={{ minHeight: 'calc(100vh - 64px)' }}>
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-2xl border border-gray-200">
        <h2 className="text-3xl font-semibold text-center text-gray-900">Account Settings</h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Mail-id</label>
            <input
              type="email"
              value={mailId}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200 text-gray-700 cursor-not-allowed"
            />
          </div>

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="relative">
              <label className="block mb-2 text-sm font-medium text-gray-700">Old Password</label>
             
              <input
                type={showOldPassword ? 'text' : 'password'}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <span
                className="absolute right-3 top-10 text-gray-500 cursor-pointer"
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? <MdVisibilityOff /> : <MdOutlineVisibility />}
              </span>
            </div>

            {showNewPasswordField && (
              <div className="relative">
                <label className="block mb-2 text-sm font-medium text-gray-700">Enter New Password</label>
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
                <span
                  className="absolute right-3 top-10 text-gray-500 cursor-pointer"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <MdVisibilityOff /> : <MdOutlineVisibility />}
                </span>
              </div>
            )}
            <button
            type="button"
            onClick={() => {
              if (!showNewPasswordField) {
                setShowNewPasswordField(true);
              } else {
                handleChangePassword();
              }
            }}
            className="w-full px-4 py-2 text-blue-500  rounded-md hover:text-blue-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {showNewPasswordField ? 'Change Password' : ' Change Password ?'}
          </button>
         
          </form>

          {/* Success or Error Alert Messages */}
          {message && (
            <div className="p-4 mt-4 text-green-800 bg-green-100 border border-green-300 rounded-md shadow-sm">
              {message}
            </div>
          )}
          {error && (
            <div className="p-4 mt-4 text-red-800 bg-red-100 border border-red-300 rounded-md shadow-sm">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
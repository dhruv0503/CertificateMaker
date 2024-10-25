// Modal.js
import React from 'react';
import { MdOutlineClose } from 'react-icons/md';

const AccountModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center  z-50">
      {/* Background with Gradient and Blur Effect */}
      <div
        className="fixed inset-0  bg-opacity-30 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200  bg-gradient-to-r from-blue-200 to-purple-300 max-w-lg w-full p-8 relative z-10 transform transition-transform duration-300 ease-in-out scale-100">
        {/* Close Button with Hover Effect */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 transition-colors duration-300"
          onClick={onClose}
        >
          <MdOutlineClose size={24} />
        </button>

        {/* Modal Content */}
        {children}
      </div>
    </div>
  );
};

export default AccountModal;

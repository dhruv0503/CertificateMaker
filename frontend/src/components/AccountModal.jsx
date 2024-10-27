// Modal.js
import React from 'react';
import { MdOutlineClose } from 'react-icons/md';

const AccountModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        className="fixed inset-0 bg-opacity-30 backdrop-blur-sm"
        onClick={onClose}
      ></div>
  
      {/* Modal Container */}
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 bg-gradient-to-r from-blue-200 to-purple-300 w-full max-w-lg relative z-10 transform transition-transform duration-300 ease-in-out scale-100"
           style={{ height: '80%', marginTop: 'auto', marginBottom: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* Close Button with Hover Effect */}
        <button
          className="absolute top-2 right-2 text-gray-500  shadow-2xl hover:text-red-500 transition-colors duration-300"
          onClick={onClose}
        >
          <MdOutlineClose size={24} />
        </button>
  
        {/* Modal Content */}
        <div className="flex items-center justify-center h-full p-4">
          {children}
        </div>
      </div>
    </div>
  );
  
};

export default AccountModal;

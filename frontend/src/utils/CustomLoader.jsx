import React from 'react';

function CustomLoader() {
  return (
    <div className="relative flex justify-center items-center w-36 h-36 rounded-full bg-blue-100 shadow-md">
      {/* Circular Progress */}
      <svg
        className="absolute top-0 left-0 animate-spin z-10"
        width="150"
        height="150"
        viewBox="0 0 150 150"
      >
        <circle
          cx="75"
          cy="75"
          r="70"
          stroke="#10BCDB"
          strokeWidth="4"
          fill="none"
          strokeDasharray="440"
          strokeDashoffset="220"
        />
      </svg>
      {/* Loading text with pulsing effect */}
      <p className="z-20 text-gray-500 animate-pulse">Loading...</p>
    </div>
  );
}

export default CustomLoader;

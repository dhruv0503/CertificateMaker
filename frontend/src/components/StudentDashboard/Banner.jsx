import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const Banner = ({ handleInputChange, query }) => {
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 md:py-10 py-10 px-4">
      <h1 className="text-5xl flex justify-center items-center font-bold text-black mb-3 animate-bounce">
        Get All Your 
        <span className="text-blue-600 mx-2 transition duration-500 ease-in-out transform hover:scale-110">
          Certificates
        </span> 
        here!
      </h1>

      <form className="">
        <div className="flex justify-center items-center md:flex-row flex-row md:gap-0">
          <div className="relative flex md:rounded-s-md mx-2 flex-row shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-3/4 w-full rounded-3xl transition-all duration-300 ease-in-out transform hover:scale-101">
            <input
              type="text"
              name="username"
              id="username"
              className="block flex-1 rounded-full border-0 py-2 my-2 pl-10 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-lg sm:leading-6 rounded-full transition-all duration-300 ease-in-out transform hover:bg-gray-300 focus:bg-gray-300"
              placeholder="Search your Certificates here ..."
              onChange={handleInputChange}
              value={query}
            />
            <FiSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button
            type="submit"
            className="md:rounded-e-md md:rounded-s-none disabled:opacity-50 disabled:cursor-not-allowed  bg-blue-400 hover:bg-blue-600 text-white py-3 px-8 rounded-full ml-2 transition-all duration-300 ease-in-out transform hover:scale-95 active:scale-85 focus:outline-none"
            style={{ borderRadius: '40px' }}
            disabled={!query} // Disable the button if query is empty
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Banner;

import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const Banner = ({handleInputChange,query}) => {
    
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 md:py-10 py-10 px-4">
      <h1 className="text-5xl font-bold text-primary mb-3">
        Get All Your <span className="text-blue">Certificates</span> here !
      </h1>
      

      <form className="">
        <div className="flex justify-start md:flex-row flex-row md:gap-0 gap-4 ">
          <div className="flex md:rounded-s-md 	 flex-row  shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/2 w-full rounded-3xl	">
            <input
              type="text"
              name="username"
              id="username"
              className="block flex-1 rounded-full border-0  py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 rounded-full"
              placeholder="Search your Certificates here ..."
              onChange={handleInputChange}
              value={query}
            />
            <FiSearch className="absolute mt-2.5 ml-2 text-gray-400" />
          </div>
          <button
            type="submit"
            className=" md:rounded-e-md md:rounded-s-none btns bg-blue-400 rounded-full"
            style={{borderRadius:'40px' }}
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Banner;
import React from 'react'
import { FiCalendar } from 'react-icons/fi';
import { Link } from "react-router-dom";

const Card = () => {
  return (
    <div className='bg-white rounded-md shadow-md card p-4'>
    <div className="flex gap-4 flex-col sm:flex-row items-start">
   
    <div className="card-details">
      <h4 className="text-primary mb-1">username</h4>
      <h3 className="text-lg font-semibold mb-2">department name</h3>

      <div className="text-primary/70 text-base flex flex-wrap gap-4 mb-2">
        <span className="flex items-center gap-4"> none</span>
       
        <span className="flex items-center gap-2"><FiCalendar/> issue date</span>
      </div>

      <p className="text-base text-primary/70 ">description</p>
      <Link><button className='btns' style={{}}>Download</button></Link>
    </div>
  </div>
    </div>
  )
}

export default Card;
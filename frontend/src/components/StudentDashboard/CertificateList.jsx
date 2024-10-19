// CertificateList.js
import React from 'react';
import data from '../../assets/data'; 
import Card from './Card'; // Assuming Card component is in the same directory

const CertificateList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 m-3">
      {data.map((item, index) => (
        <Card
          key={index}
          username={item.username}
          departmentName={item.departmentName}
          issueDate={item.issueDate}
          description={item.description}
        />
      ))}
    </div>
  );
};

export default CertificateList;

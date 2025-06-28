import React from 'react';
import ContentData from '../db/contentdata.json';
import '../style.css';

const MainContainer = () => {
  return (
    <div className="main-grid">
      {ContentData.map((item, index) => (
        <div key={index} className="showproject">
          <span className="material-symbols-outlined">{item.icon}</span>
          <h3>{item.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default MainContainer;

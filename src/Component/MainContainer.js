import React from 'react';
import ContentData from '../db/contentdata.json';
import { Link } from 'react-router-dom';
import '../style.css';

const MainContainer = () => {
  return (
    <div className="main-grid">
      {ContentData.map(({ url, icon, title }, index) => (

        <Link to={url} key={index} className="showproject">
          <span className="material-symbols-outlined">{icon}</span>
          <h3>{title}</h3>
        </Link>
      ))}
    </div>
  );
};

export default MainContainer;

import React from 'react';
import ContentData from '../db/contentdata.json';
import { Link} from 'react-router-dom';
import '../style.css';

const MainContainer = () => {
  return (
    <div className="main-grid">
      {ContentData.map((item, index) => (
        <>
        <Link to={item.url} key={index} className="showproject"> 
  
      <span className="material-symbols-outlined">{item.icon}</span>
      <h3>{item.title}</h3>
          </Link>
        </>
      ))}
    </div>
  );
};

export default MainContainer;

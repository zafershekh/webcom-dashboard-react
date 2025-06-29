import React from 'react';
import SopLibery from '../db/soplibery.json';
import '../style.css';

const Sop = () => {
  return (
    <div className="sop-grid">
      {SopLibery.map(({ icon, title, doc }, index) => (
        <a
          key={index}
          href={doc}
          target="_blank"
          rel="noopener noreferrer"
          className="sop-card"
        >
          <span className="material-symbols-outlined sop-icon">{icon}</span>
          <h3 className="sop-title">{title}</h3>
        </a>
      ))}
    </div>
  );
};

export default Sop;

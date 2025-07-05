// src/AppFeature/Sop.js
import React, { useState } from 'react';
import '../style.css';
import { Link } from 'react-router-dom';

import SopLibery from '../db/soplibery.json';


const Sop = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSops = SopLibery.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="sop-hover-panel">
      <input
        type="text"
        className="sop-search"
        placeholder="Search SOP..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <div className="sop-list">
        {filteredSops.map((item, index) => (
  <Link to={`/sop/${item.url}`} key={index} className="sop-entry">
    <span className="material-symbols-outlined">{item.icon}</span>
    <span>{item.title}</span>
  </Link>
))}
      </div>
    </div>
  );
};

export default Sop;

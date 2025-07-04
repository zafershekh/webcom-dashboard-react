import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../style.css';
import Sop from '../AppFeature/Sop';

const SideNavigation = () => {
  const location = useLocation();
  const [sopVisible, setSopVisible] = useState(false);

  return (
    <nav className="side-nav">
      <div className="nav-container">
        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
          <span className="material-symbols-outlined">home</span>
          <p>Home</p>
        </Link>

        <div
          className={`nav-link ${location.pathname.startsWith('/sop') ? 'active' : ''}`}
          onMouseEnter={() => setSopVisible(true)}
          onMouseLeave={() => setSopVisible(false)}
        >
          
          <span className="material-symbols-outlined">book_5</span>
          <p>SOP</p>
          {sopVisible && <Sop />}
        </div>

        <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
          <span className="material-symbols-outlined">person_search</span>
          <p>About Us</p>
        </Link>
      </div>
    </nav>
  );
};

export default SideNavigation;

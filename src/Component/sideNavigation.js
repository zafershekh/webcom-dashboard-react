import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../style.css';

const SideNavigation = () => {
  const location = useLocation();
  return (
    <nav className="side-nav">
      <div className="nav-container">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
          <span className="material-symbols-outlined">home</span>
          <p>Home</p>
        </Link>
        <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}> 
          <span className="material-symbols-outlined">person_search</span>
          <p>About Us</p>
        </Link>
      </div>
    </nav>
  );
};

export default SideNavigation;

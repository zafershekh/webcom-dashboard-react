import React from 'react';
import '../style.css';

const TopHeader = ({ title }) => {
  return (
    <header className="top-header">
      <div className="header-content">
        <h1>{title}</h1>
        <div className="header-right">
          {/* Placeholder for future search/user/logout */}
        </div>
      </div>
    </header>
  );
};

export default TopHeader;

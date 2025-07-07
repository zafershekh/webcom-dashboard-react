import React, { useState } from 'react';
import ResourceDB from "../db/resourcedb.json";
import '../style.css';

const ResourceHUB = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // 🧠 Filter the resources based on the search term
  const filteredResources = ResourceDB.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="resource-hub-container">
      <div className="resource-header">
        <input
          type="text"
          placeholder="Search resources..."
          className="resource-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="resource-grid">
        {filteredResources.length > 0 ? (
          filteredResources.map((item, index) => (
            <a
              key={index}
              href={item.url}
              className="resource-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined resource-icon">{item.icon}</span>
              <div className="resource-info">
                <h3>{item.title}</h3>
                <p>{item.type}</p>
              </div>
            </a>
          ))
        ) : (
          <p style={{ padding: "20px" }}>No resources found.</p>
        )}
      </div>
    </div>
  );
};

export default ResourceHUB;

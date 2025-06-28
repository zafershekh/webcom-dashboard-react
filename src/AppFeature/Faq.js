import React, { useState } from 'react';
import Faqdetails from '../db/faqdata.json';
import '../style.css';

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      {Faqdetails.map(({ title, description }, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className={`faq-item ${isOpen ? 'open' : ''}`}>
            <div className="faq-header" onClick={() => toggleFaq(index)}>
              <h3>{title}</h3>
              <span className="faq-icon">{isOpen ? '−' : '+'}</span>
            </div>
            {isOpen && <p className="faq-description">{description}</p>}
          </div>
        );
      })}
    </div>
  );
};

export default Faq;

import React, { useState, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ClearICON from '../svg/close.svg';
import RightArrow from '../svg/right-arrow.svg';
import LeftArrow from '../svg/left-arrow.svg';
import '../style.css';

const LineNumberTextarea = ({
  label,
  value,
  onChange,
  placeholder,
  initialLines = 17
}) => {
  const textAreaRef = useRef(null);
  const lineNumberRef = useRef(null);

  const syncScroll = () => {
    if (lineNumberRef.current && textAreaRef.current) {
      lineNumberRef.current.scrollTop = textAreaRef.current.scrollTop;
    }
  };

  const currentLineCount = Math.max(value.split('\n').length, initialLines);
  const handleCopy = () => {
  if (textAreaRef.current) {
    navigator.clipboard.writeText(textAreaRef.current.value)
      .then(() => {
        toast.success("Pids copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy.", { autoClose: 3000,});
      });
  }
}

  return (
    <div className="textarea-wrapper">
      <label className="textarea-header">{label}</label>
      <div className="textarea-block">
        <div className="textarea-line-number" ref={lineNumberRef}>
          {Array.from({ length: currentLineCount }, (_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <div className="textarea-copy-wrapper">
          <textarea
            className="textarea-design"
            ref={textAreaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onScroll={syncScroll}
            placeholder={placeholder}
          />
        
        <span
          className="copy-icon material-symbols-outlined"
          onClick={handleCopy}
          title="Copy to clipboard"
        >
          content_copy
        </span>
        </div>
      </div>
    </div>
    
  );
};



const PIDConverter = () => {
  const [columnText, setColumnText] = useState('');
  const [delimitedText, setDelimitedText] = useState('');
  const [delimiter, setDelimiter] = useState(',');

  const convertToDelimited = () => {
    if(!columnText){
      toast.error("The column-wise PID entry is blank",{autoClose: 3000,});
    }
    const lines = columnText
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean);
    setDelimitedText(lines.join(delimiter));
  };

  const convertToColumn = () => {
    if(!delimitedText){
      toast.error("You need to fill in the delimited PIDs.",{autoClose: 3000,});
    }
    const items = delimitedText
      .split(delimiter)
      .map(item => item.trim())
      .filter(Boolean);
    setColumnText(items.join('\n'));
  };

  const clearAll = () => {
    setColumnText('');
    setDelimitedText('');
  };

  return (
    <div className="pid-converter-container">
      {/* Column 1 */}
      <LineNumberTextarea
        label="Column wise PIDs"
        value={columnText}
        onChange={setColumnText}
        placeholder="Paste PIDs line by line..."
      />

      {/* Column 2 */}
      <div className="button-column">
        <select
          className="pids-dropdownselection"
          value={delimiter}
          onChange={(e) => setDelimiter(e.target.value)}
        >
          <option value=",">Comma (,)</option>
          <option value=";">Semicolon (;)</option>
        </select>
        <button onClick={convertToDelimited} className="convert-btn" title="Convert to delimited">
          <img alt="<" src={RightArrow} />
        </button>
        <button onClick={convertToColumn} className="back-btn" title="Convert to column">
          <img alt=">" src={LeftArrow} />
        </button>

        <button onClick={clearAll} className="clear-btn" title="Clear All">
          <img alt="Clear" src={ClearICON} />
        </button>
      </div>

      {/* Column 3 */}
      <LineNumberTextarea
        label="Delimited PIDs"
        value={delimitedText}
        onChange={setDelimitedText}
        placeholder="Comma/semicolon-separated PIDs here..."
      />
      <ToastContainer position="top-right" autoClose={500} />
    </div>
    
  );
};

export default PIDConverter;

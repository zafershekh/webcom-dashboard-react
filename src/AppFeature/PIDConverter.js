import React, { useState, useRef } from 'react';
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

  return (
    <div className="textarea-wrapper">
      <label className="textarea-header">{label}</label>
      <div className="textarea-block">
        <div className="textarea-line-number" ref={lineNumberRef}>
          {Array.from({ length: currentLineCount }, (_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <textarea
          className="textarea-design"
          ref={textAreaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onScroll={syncScroll}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

const PIDConverter = () => {
  const [columnText, setColumnText] = useState('');
  const [delimitedText, setDelimitedText] = useState('');
  const [delimiter, setDelimiter] = useState(',');

  const convertToDelimited = () => {
    const lines = columnText
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean);
    setDelimitedText(lines.join(delimiter));
  };

  const convertToColumn = () => {
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
          <img alt="→" src={RightArrow} />
        </button>
        <button onClick={convertToColumn} className="back-btn" title="Convert to column">
          <img alt="←" src={LeftArrow} />
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
    </div>
  );
};

export default PIDConverter;

import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../style.css';

const EpochTimestamp = () => {
  const [userDateTime, setUserDateTime] = useState("");
  const [epochResult, setEpochResult] = useState("");
  const [epochInput, setEpochInput] = useState("");
  const [dateResult, setDateResult] = useState("");

  const convertDateToEpoch = () => {
    const date = new Date(userDateTime);
    if (!isNaN(date.getTime())) {
      setEpochResult(Math.floor(date.getTime() / 1000));
    } else {
      setEpochResult("Invalid date");
    }
  };

  const convertEpochToDate = () => {
    const timestamp = Number(epochInput);
    if (!isNaN(timestamp)) {
      const date = new Date(timestamp * 1000);
      setDateResult(date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }).toUpperCase());
    } else {
      setDateResult("Invalid epoch Time");
    }
  };

  const handleCopy = (value) => {
    const TimerCopyMessage = (value === epochResult ? "Epoc Date copied to clipboard!" : "Date copied to clipboard!" )
    navigator.clipboard.writeText(value);
    toast.success(TimerCopyMessage);
  };

  return (
    <div className="timestamp-container">
     <ToastContainer position="top-right" autoClose={3000} />
      <div className="timestamp-card">
        <label className="timestamp-label" htmlFor="datetimeid">Date/Time to Epoch</label>
        <input
          id="datetimeid"
          type="datetime-local"
          value={userDateTime}
          onChange={(e) => setUserDateTime(e.target.value)}
          className="timestamp-input"
        />
        <button onClick={convertDateToEpoch} className="timestamp-button">
          Convert
        </button>

        {epochResult && (
          <div className="result-block">
            <span>Epoch Timestamp: <strong>{epochResult}</strong></span>
            <span
              className="copy-icon-timer material-symbols-outlined"
              onClick={() => handleCopy(epochResult)}
              title="Copy"
            >
              content_copy
            </span>
          </div>
        )}
      </div>

      <div className="timestamp-card">
        <label className="timestamp-label">Epoch to IST</label>
        <input
          type="text"
          value={epochInput}
          onChange={(e) => setEpochInput(e.target.value)}
          placeholder="Enter EPOCH Seconds"
          className="timestamp-input"
        />
        <button onClick={convertEpochToDate} className="timestamp-button">
          Convert
        </button>

        {dateResult && (
          <div className="result-block">
            <span>{dateResult}</span>
            <span
              className="copy-icon-timer material-symbols-outlined "
              onClick={() => handleCopy(dateResult)}
              title="Copy"
            >
              content_copy
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EpochTimestamp;

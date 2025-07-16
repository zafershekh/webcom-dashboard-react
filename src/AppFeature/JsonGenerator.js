import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../style.css';

const JsonGenerator = () => {
  const [Pids, SetPids] = useState([]);
  const [Tabbed, SetTabbed] = useState([]);
  const [Segment, SetSegment] = useState([]);
  const [TabbedCheckbox, SetTabbedCheckbox] = useState(true);
  const [SegmentCheckbox, SetSegmentCheckbox] = useState(false);
  const [counter, setCounter] = useState(1);
  const [data, setData] = useState("");

  const HandleTabbedCheckbox = (ev) => {
    SetTabbedCheckbox(ev.target.checked);
  };

  const HandleSegmentCheckbox = (ev) => {
    SetSegmentCheckbox(ev.target.checked);
  };

  const HandleClearEvent = () => {
    SetPids([]);
    SetTabbed([]);
    SetSegment([]);
    SetTabbedCheckbox(true);
    SetSegmentCheckbox(false);
    setCounter(1);
    setData("");

  }

  const handleJsonData = () => {
    const result = {};

    Pids.forEach((pidInput, i) => {
      if (!pidInput) return;

      const pidList = pidInput.split(',').map(p => p.trim()).filter(Boolean);
      const tabbedValue = TabbedCheckbox && Tabbed[i] ? Tabbed[i].trim() : null;
      const segmentValue = SegmentCheckbox && Segment[i] ? Segment[i].trim() : null;

      pidList.forEach(pid => {
        if (!pid) return;

        if (!result[pid]) {
          result[pid] = {};
        }

        if (tabbedValue) {
          if (!result[pid].filter_tags) result[pid].filter_tags = [];
          result[pid].filter_tags.push(tabbedValue);
        }

        if (segmentValue) {
          if (!result[pid].segments) result[pid].segments = [];
          result[pid].segments.push(segmentValue);
        }
      });
    });

    setData(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data));
    toast.success("JSON copied to clipboard!");
  };



  return (
    <div className='JsonGenerator-Container'>
      <ToastContainer position="top-right" autoClose={500} />
      <div className='btn-bar-right'>
        <a href='/webcom-dashboard-react/#/pidconverter' target='_blank' className='redirection-button'>Pids Converter</a>
        <div className="checkbox-group">
          <input
            type='checkbox'
            checked={TabbedCheckbox}
            onChange={HandleTabbedCheckbox}
            id="tabbedCheckbox"
          />
          <label htmlFor="tabbedCheckbox">Tabbed</label>
        </div>

        <div className="checkbox-group">
          <input
            type='checkbox'
            checked={SegmentCheckbox}
            onChange={HandleSegmentCheckbox}
            id="segmentCheckbox"
          />
          <label htmlFor="segmentCheckbox">Segment</label>
        </div>
      </div>


      {Array.from({ length: counter }).map((_, i) => (
        <div key={i} className="input-group">
          <div className='textbox-pid-card'>
            <label>Enter Your PIDs</label>
            <input
              type='text'
              placeholder='Comma-separated PIDs'
              value={Pids[i] || ''}
              onChange={(ev) => {
                const newPids = [...Pids];
                newPids[i] = ev.target.value;
                SetPids(newPids);
              }}
            />
          </div>

          {TabbedCheckbox && (
            <div className='textbox-tabbed-card'>
              <label>Enter Tabbed Value</label>
              <input
                type='text'
                placeholder='Tabbed Value'
                value={Tabbed[i] || ''}
                onChange={(ev) => {
                  const newTabbed = [...Tabbed];
                  newTabbed[i] = ev.target.value;
                  SetTabbed(newTabbed);
                }}
              />
            </div>
          )}

          {SegmentCheckbox && (
            <div className='textbox-segment-card'>
              <label>Enter Segment Value</label>
              <input
                type='text'
                placeholder='Segment Value'
                value={Segment[i] || ''}
                onChange={(ev) => {
                  const newSegment = [...Segment];
                  newSegment[i] = ev.target.value;
                  SetSegment(newSegment);
                }}
              />
            </div>
          )}
        </div>
      ))}

      <div className="button-group">
        <button className="btn add-btn" onClick={() => setCounter(counter + 1)}>+ Add</button>
        <button className="btn remove-btn" onClick={() => counter > 1 && setCounter(counter - 1)}>- Remove</button>
        <button className="btn json-btn" onClick={handleJsonData}>Get JSON Data</button>
        <button className="btn clear-btn" onClick={HandleClearEvent}>Clear All</button>
      </div>


      {data && (
        <div className='result-container'>
            <span
              className="material-symbols-outlined copy-icon-url"
              onClick={handleCopy}
              title='Copy Json'
            >
              content_copy
            </span>
          <pre className='json-output'>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default JsonGenerator;

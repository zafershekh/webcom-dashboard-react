import React, { useState } from 'react'
import '../style.css';

const JsonGenerator = () => {
  const [Pids, SetPids] = useState([]);
  const [Tabbed, SetTabbed] = useState([]);
  const [Segment, SetSegment] = useState([]);
  const [TabbedCheckbox, SetTabbedCheckbox] = useState(true);
  const [SegmentCheckbox, SetSegmentCheckbox] = useState(false);
  const [counter, setCounter] = useState(1);
  const [data, setData] = useState("")

  const HandleTabbedCheckbox = (ev) => {
    SetTabbedCheckbox(ev.target.checked);
  }
  const HandleSegmentCheckbox = (ev) => {
    SetSegmentCheckbox(ev.target.checked);
  }


const handleJsonData = () => {
  const result = {};

  Pids.forEach((pidInput, i) => {
    if (!pidInput) return;

    // Split comma-separated PIDs only
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



  return (
    <div className='JsonGenerator-Container'>
      <a href='/pidconverter' target='_blank'>Pids Converter</a>
      <div className='jsonGenerator-Selector'>
        <input type='checkbox'
          checked={TabbedCheckbox}
          onChange={HandleTabbedCheckbox}
        />
        <label>Tabbed</label>
        <input type='checkbox'
          checked={SegmentCheckbox}
          onChange={HandleSegmentCheckbox}
        />
        <label>Segment</label>
      </div>


      {Array.from({ length: counter }).map((_, i) => (
        <div key={i}>
          <div className='textbox-pid-card'>
            <label>Enter Your Pids</label>
            <input
              type='text'
              placeholder='Enter the PIDs'
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
                placeholder='Enter the Tabbed Value'
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
                placeholder='Enter the Segment Value'
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

      <button onClick={() => setCounter(counter + 1)}>+</button>
      <button onClick={() => counter > 1 && setCounter(counter - 1)}>-</button>
      <button onClick={handleJsonData}>Get Json Data</button>
      <div className='JsonResult'>
  {data && (
    // <pre>{JSON.stringify(data,null, 1)}</pre>
    <pre>{JSON.stringify(data)}</pre>
  )}
</div>

    </div>

  )
}

export default JsonGenerator

import React from 'react'

const MarkMyCalender = () => {
  return (
    <div className='markmycalender-grid'>
      <div className="markmycalender-input">
			<span>Enter Event Title</span>
			<input type="text" id="mmctitle" />
			<span>Enter Event Discription</span>
			<textarea  id="mmcdesc"></textarea>
			<span>Pick Start date and Time</span>
			<input type="datetime-local" id="mmcstartdate" / >
			<span class="textbox_title">Pick End date and Time</span>
			<input type="datetime-local" id="mmcenddate" />
			<input type="button" id="getmmcurl" value="Get URL" / >
		</div>
	
		<div  id="showappurl">
			<span>App URL</span>
			<div id="mmcappurlresult"></div>
		</div>
		<div id="showdeskurl">
			<span>Desktop URL</span>
			<div id="mmcurldesktopresult" ></div>
	
		</div>
    </div>
  )
}

export default MarkMyCalender

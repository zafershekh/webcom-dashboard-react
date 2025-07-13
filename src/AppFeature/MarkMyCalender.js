import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../style.css';


const DateTimeFormat = (datetime) => datetime.toISOString().replace(/-|:|\.\d+/g, '');

const MarkMyCalenderInput = () => {
    const [getData, setData] = useState({
        title: '',
        description: '',
        startdatetime: '',
        enddatetime: ''
    });

    const [desktopUrl, setDesktopUrl] = useState('');
    const [appUrl, setAppUrl] = useState('');
    const [isGenerated, setIsGenerated] = useState(false);

    const handleChanges = (ev) => {
        const { name, value } = ev.target;
        setData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        const { title, description, startdatetime, enddatetime } = getData;

        if (title && description && startdatetime && enddatetime) {
            const start = new Date(startdatetime);
            const end = new Date(enddatetime);

            const encodedDescription = encodeURIComponent(description).replace(/%20/g, '+').replace(/%/g, '%25');
            const baseUrl = 'https://calendar.google.com/calendar/u/0/r/eventedit?';

            const desktopCalendarURL =
                baseUrl +
                '&text=' + encodeURIComponent(title) +
                '&details=' + encodedDescription +
                '&dates=' + DateTimeFormat(start) + '/' + DateTimeFormat(end);
            setDesktopUrl(desktopCalendarURL);

            const appCalendarURL = `${start.getTime()}||${end.getTime()}||${title}||www.nykaa.com||${description}||`;
            setAppUrl(appCalendarURL);

            setIsGenerated(true); //show result
        } else {
            toast.error("Please fill in all the fields.");
            // alert("Please fill in all the fields.")
            setIsGenerated(false); // hide result and throw Popup
        }
    };

    const copyToClipboard = (text) => {
        const MarkMyCalenderCopyMessage = (text === appUrl) ? "App URL copied to clipboard!" : "Desktop URL copied to clipboard!";
        navigator.clipboard.writeText(text);
        toast.success(MarkMyCalenderCopyMessage);
    };

    return (
        <div className="calendar-wrapper">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="calendar-form-card">
                <h2>Mark My Calendar</h2>
                <form onSubmit={handleSubmit} className="calendar-form">
                    <label>Event Title</label>
                    <input type="text" name="title" value={getData.title} onChange={handleChanges} placeholder="Enter title" />

                    <label>Event Description</label>
                    <textarea name="description" value={getData.description} onChange={handleChanges} placeholder="Enter description"></textarea>

                    <label>Start Date & Time</label>
                    <input type="datetime-local" name="startdatetime" value={getData.startdatetime} onChange={handleChanges} />

                    <label>End Date & Time</label>
                    <input type="datetime-local" name="enddatetime" value={getData.enddatetime} onChange={handleChanges} />

                    <button type="submit">Generate URLs</button>
                </form>
            </div>

            <div className="calendar-result-card">
                {isGenerated ? (
                    <>
                        <h3>Generated URLs</h3>
                        <div className="url-block">
                            <div className="url-label">App URL</div>
                            <div className="url-box">{appUrl}</div>
                            <button onClick={() => copyToClipboard(appUrl)}>Copy App URL</button>
                        </div>
                        
                        <div className="url-block">
                            <div className="url-label">Desktop URL</div>
                            <div className="url-box">{desktopUrl}</div>
                            <button onClick={() => copyToClipboard(desktopUrl)}>Copy Desktop URL</button>
                            
                        </div>
                    </>
                ) : (
                    <div className="placeholder-text">Your generated URLs will appear here after submission.</div>
                )}
            </div>

        </div>
    );
};

export default MarkMyCalenderInput;

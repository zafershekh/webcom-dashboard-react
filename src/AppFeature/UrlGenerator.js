import React, { useState } from 'react';
import '../style.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UrlGenerator = () => {
  const [pageType, setPageType] = useState('');
  const [pageData, setPageData] = useState('');
  const [toggleSelector, setToggleSelector] = useState('Single-Url-Card');
  const [singleURLs, setSingleURLs] = useState(null);
  const [bulkInput, setBulkInput] = useState('');
  const [bulkResult, setBulkResult] = useState([]);


  const handleSingleURL = () => {
    if (!pageType || !pageData) {
      setSingleURLs({
        name: 'Please add request',
        desktop: '-',
        app: '-',
        deeplink: '-'
      });
	  toast.error("Please fill in all the fields.");
      return;
    }

    const desktopURL = `https://www.nykaa.com/sp/${pageType}/${pageData}`;
    const appURL = `https://www.nykaa.com/?dl_type=nlp&pagetype=${pageType}&pagedata=${pageData}`;
    const deeplinkURL = `nykaa://nykaa?dl_type=nlp&pagetype=${pageType}&pagedata=${pageData}`;

    setSingleURLs({
      name: pageType.replace(/-/g, ' ').toUpperCase(),
      desktop: desktopURL,
      app: appURL,
      deeplink: deeplinkURL,
      entireURL: `Page Name: ${pageType.replace(/-/g, ' ').toUpperCase()}\nDesktop URL: ${desktopURL}\nApp URL: ${appURL}\nDeeplink: ${deeplinkURL}`
    });
  };

  const handleBulkURL = () => {
    if (!bulkInput.trim()) {
      setBulkResult([]);
      toast.error("Please fill in all the fields.");
      return;
    }

    const lines = bulkInput.split('\n').filter(Boolean);
    const results = lines.map((line) => {
      try {
        const parts = new URL(line).pathname.split('/');
        if (parts[1] === 'sp') {
          const pageType = parts[2];
          const pageData = parts[3];
          return {
            name: pageType.replace(/-/g, ' ').toUpperCase(),
            desktop: `https://www.nykaa.com/sp/${pageType}/${pageData}`,
            app: `https://www.nykaa.com/?dl_type=nlp&pagetype=${pageType}&pagedata=${pageData}`,
            deeplink: `nykaa://nykaa?dl_type=nlp&pagetype=${pageType}&pagedata=${pageData}`,
            BulkentireURLs: `Page Name: ${pageType.replace(/-/g, ' ').toUpperCase()}\nDesktop: https://www.nykaa.com/sp/${pageType}/${pageData}\nApp: https://www.nykaa.com/?dl_type=nlp&pagetype=${pageType}&pagedata=${pageData}\nDeeplink: nykaa://nykaa?dl_type=nlp&pagetype=${pageType}&pagedata=${pageData}\n`
          };
        }
        return null;
      } catch {
        return null;
      }
    }).filter(Boolean);

    setBulkResult(results);
  };

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
    
    
  };

  const copyBulkPlatform = (platform, label) => {
    const urls = bulkResult.map((item) => item[platform]).join('\n');
    handleCopy(urls, label);
  };

  return (
    <div className="url-generator-container">
		<ToastContainer position="top-right" autoClose={2000} />
      <div className="url-generator-card">
        <div className="toggle-tabs">
  <button
    className={`toggle-tab ${toggleSelector === 'Single-Url-Card' ? 'active' : ''}`}
    onClick={() => setToggleSelector('Single-Url-Card')}
  >
    Single
  </button>
  <button
    className={`toggle-tab ${toggleSelector === 'Bulk-Url-Card' ? 'active' : ''}`}
    onClick={() => setToggleSelector('Bulk-Url-Card')}
  >
    Bulk
  </button>
</div>


        {toggleSelector === 'Single-Url-Card' && (
          <div className="url-section">
            <label>Page Type</label>
            <input
              type="text"
              className="url-input"
              value={pageType}
              onChange={(e) => setPageType(e.target.value)}
              placeholder="Enter Page Type"
            />

            <label>Page Data</label>
            <input
              type="text"
              className="url-input"
              value={pageData}
              onChange={(e) => setPageData(e.target.value)}
              placeholder="Enter Page Data"
            />

            <button onClick={handleSingleURL} className="generate-btn">
              Generate URLs
            </button>

            {singleURLs && (
              <div className="result-box">
                <div className="result-line">
                  <strong>Page Name:</strong> {singleURLs.name}
                  <span
                    className="copy-button-url"
                    onClick={() => handleCopy(singleURLs.entireURL, "Entire URL ")}
                    title='Click to copy Entire URL'
                  >
                    Copy Link
                  </span>
                </div>
                <div className="result-line">
                  <strong>Desktop:</strong> {singleURLs.desktop}
                  <span
                    className="material-symbols-outlined copy-icon-url"
                    onClick={() => handleCopy(singleURLs.desktop, "Desktop URL ")}
                    title='Click to copy desktop URL'
                  >
                    content_copy
                  </span>
                </div>
                <div className="result-line">
                  <strong>App:</strong> {singleURLs.app}
                  <span
                    className="material-symbols-outlined copy-icon-url"
                    onClick={() => handleCopy(singleURLs.app,"App URL ")}
                    title='Click to copy app URL'
                  >
                    content_copy
                  </span>
                </div>
                <div className="result-line">
                  <strong>Deeplink:</strong> {singleURLs.deeplink}
                  <span
                    className="material-symbols-outlined copy-icon-url"
                    onClick={() => handleCopy(singleURLs.deeplink,"Deeplink URL ")}
                    title='Click to copy deeplink URL'
                  >
                    content_copy
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {toggleSelector === 'Bulk-Url-Card' && (
          <div className="url-section">
            <label>Enter Desktop URLs (one per line)</label>
            <textarea
              className="url-input"
              rows="8"
              value={bulkInput}
              onChange={(e) => setBulkInput(e.target.value)}
              placeholder="https://www.nykaa.com/sp/pagetype/pagedata"
            ></textarea>
            <button className="generate-btn" onClick={handleBulkURL}>
              Generate Bulk URLs
            </button>

            {bulkResult.length > 0 && (
              <>
                <div className="bulk-copy-buttons">
                  <button onClick={() => copyBulkPlatform('desktop',"Desktop URLs ")} className="copy-btn">
                    Copy All Desktop URLs
                  </button>
                  <button onClick={() => copyBulkPlatform('app',"App URLs ")} className="copy-btn">
                    Copy All App URLs
                  </button>
                  <button onClick={() => copyBulkPlatform('deeplink',"Deeplink URLs ")} className="copy-btn">
                    Copy All Deeplinks
                  </button>
                  <button onClick={() => copyBulkPlatform('BulkentireURLs',"Entire URLs ")} className="copy-btn">
                    Copy All
                  </button>
                </div>

                <div className="bulk-result">
                  {bulkResult.map((url, idx) => (
                    <div key={idx} className="result-box">
                      <div className="result-line">
                        <strong>Page Name:</strong> {url.name}
                      </div>
                      <div className="result-line">
                        <strong>Desktop:</strong> {url.desktop}
                      </div>
                      <div className="result-line">
                        <strong>App:</strong> {url.app}
                      </div>
                      <div className="result-line">
                        <strong>Deeplink:</strong> {url.deeplink}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlGenerator;

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import SopLibery from '../db/soplibery.json';


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const SopViewer = () => {
  const { id } = useParams();
  const sop = SopLibery.find((item) => item.url === id);
  const [numPages, setNumPages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  if (!sop) return <div>Document not found</div>;

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setIsLoading(false);
  };

  return (
    <div className="sop-viewer-container">
      {isLoading && (
        <div className="spinner">Loading SOP document...</div>
      )}
      <Document
        file={sop.doc}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={(error) => {
          console.error("PDF load error:", error);
          setIsLoading(false);
        }}
        loading={null} // Prevent built-in multiple loading messages 1st time
      >
        {!isLoading && Array.from({ length: numPages || 0 }, (_, index) => (
          <Page key={index + 1}
          pageNumber={index + 1}
          width={900}
          loading={null} />
        ))}
      </Document>
    </div>
  );
};

export default SopViewer;
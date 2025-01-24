// Styles for the default PDF viewer layout

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

import { Document, Page, pdfjs } from 'react-pdf';
import React, { useEffect, useState } from 'react';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export const PdfViewer = ({ file }) => {
  const [numPages, setNumPages] = useState();
  const [pageSize, setPageSize] = useState({ width: 600, height: 800 });
  useEffect(() => {
    const updatePageSize = () => {
      // Calculate the new page size based on the window size
      const newWidth = window.innerWidth * 0.7; // Adjust this value as needed
      const newHeight = window.innerHeight * 0.7; // Adjust this value as needed
      setPageSize({ width: newWidth, height: newHeight });
    };

    // Update the page size when the window is resized
    window.addEventListener('resize', updatePageSize);
    updatePageSize(); // Initial update

    return () => {
      window.removeEventListener('resize', updatePageSize);
    };
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className='pdf-viewer flex items-center justify-center'>
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            height={pageSize.height}
            width={pageSize.width}
            renderTextLayer={false}
          />
        ))}
      </Document>
    </div>
  );
};

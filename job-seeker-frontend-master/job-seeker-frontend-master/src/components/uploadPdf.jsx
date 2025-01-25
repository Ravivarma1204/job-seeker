import React, { useState } from 'react';
import CloseIcon from '../assets/closeIcon.png';
import Image from '../assets/image1.jpeg';
import Modal from 'react-modal';
import OpenIcon from '../assets/openIcon.png';
import PdfIcon from '../assets/pdfIcon.png';
import { PdfViewer } from './PdfViewer';
import axios from 'axios';

const UploadPDF = ({ setJobs }) => {
  const [file, setFile] = useState(null);
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Open PDF Modal
  const handlePdfOpen = () => {
    setIsPdfOpen(true);
  };

  // Handle File Selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Remove Selected File
  const handleFileRemove = () => {
    setFile(null);
  };

  // Submit PDF to Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please upload a file.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('pdfFile', file);

    try {
      const response = await axios.post(
        'https://job-seeker-backend-hume.onrender.com/upload', // Update with correct endpoint
        formData
      );
      setJobs(response.data); // Assuming response contains job recommendations
      setLoading(false);
    } catch (error) {
      console.error('Error uploading PDF:', error.response || error.message);
      alert('Failed to upload the PDF. Please try again.');
      setLoading(false);
    }
  };

  return (
    <>
      <img src={Image} alt="icons" />
      {!file && !loading ? (
        <form onSubmit={handleSubmit} id="file-upload">
          <div className="flex items-center justify-center w-[300px]">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-white border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
                  Upload your resume in PDF format
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                accept=".pdf"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </form>
      ) : file && !loading ? (
        <div className="">
          <div className="bg-gray-300 rounded-lg p-4 flex flex-row gap-x-[10px] items-center">
            <img src={PdfIcon} alt="icon" className="h-[30px] w-[30px]" />
            <p className="text-[18px] font-bold">{file.name}</p>
            <img
              src={OpenIcon}
              alt="icon"
              className="h-[40px] w-[40px] cursor-pointer"
              onClick={handlePdfOpen}
            />
            <img
              src={CloseIcon}
              alt="icon"
              className="h-[50px] w-[50px] cursor-pointer"
              onClick={handleFileRemove}
            />
          </div>
          <button
            onClick={handleSubmit}
            type="button"
            className="mt-[20px] text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Recommend Jobs
          </button>
        </div>
      ) : (
        <div>
          <iframe
            className="pointer-events-none"
            title="gif"
            src="https://giphy.com/embed/SF5MyECNTsEBGm0Hx3"
            width="480"
            height="480"
          ></iframe>
        </div>
      )}
      <Modal isOpen={isPdfOpen}>
        <div className="flex justify-end sticky top-[0px]">
          <img
            src={CloseIcon}
            alt="icon"
            className="h-[60px] w-[60px] cursor-pointer"
            onClick={() => {
              setIsPdfOpen(false);
            }}
          />
        </div>

        <PdfViewer file={file} />
      </Modal>
    </>
  );
};

export default UploadPDF;

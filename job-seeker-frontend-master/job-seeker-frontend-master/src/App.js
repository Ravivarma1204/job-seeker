import './App.css';

import Image from './assets/image1.jpeg';
import Modal from 'react-modal';
import React from 'react';
import { Table } from './components/table';
import { Tabs } from './components/Tabs';
import UploadPDF from './components/uploadPdf';

Modal.setAppElement('#root');
function App() {
  const [jobs, setJob] = React.useState();

  return (
    <div className='App flex flex-col w-full items-center justify-center'>
      <Tabs />
      {!jobs ? (
        <UploadPDF setJobs={setJob} />
      ) : (
        <Table data={jobs} reUploadResume={setJob} />
      )}
    </div>
  );
}

export default App;

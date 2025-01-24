import React, { useState } from 'react';

import Image from '../assets/image2.jpeg';
import Pagination from './Pagination';

export const Table = ({ data, reUploadResume }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='relative overflow-x-auto flex items-center flex-row gap-x-[20px]'>
      <img src={Image} alt='icon' className='mb-[30px]' />
      <div className='w-max flex flex-col gap-y-[10px] items-center'>
        <table className='text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Job Name
              </th>
              <th scope='col' className='px-6 py-3'>
                Job link
              </th>
              <th scope='col' className='px-6 py-3'>
                Similarity
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr
                key={index}
                className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
              >
                <th
                  scope='row'
                  className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  {item.job_name}
                </th>
                <td className='px-6 py-4'>{item.job_link}</td>
                <td className='px-6 py-4'>{item.similarity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <button
        onClick={() => {
          reUploadResume(null);
        }}
        type='button'
        class=' mt-[20px] text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 '
      >
        Re-upload Resume
      </button>
    </div>
  );
};

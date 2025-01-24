import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [...Array(totalPages).keys()].map((num) => num + 1);
  const handlePrevious = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage !== totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  return (
    <nav aria-label='w-max Page navigation example'>
      <ul class='flex items-center -space-x-px h-8 text-sm'>
        <li>
          <button
            onClick={handlePrevious}
            class='flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
          >
            <span class='sr-only'>Previous</span>
            <svg
              class='w-2.5 h-2.5 rtl:rotate-180'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 6 10'
            >
              <path
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M5 1 1 5l4 4'
              />
            </svg>
          </button>
        </li>
        {pages.map((page) => {
          return (
            <li>
              <button
                href='#'
                onClick={() => onPageChange(page)}
                class={` ${
                  currentPage === page
                    ? 'z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                    : 'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                }`}
              >
                {page}
              </button>
            </li>
          );
        })}

        <li>
          <button
            onClick={handleNext}
            class='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
          >
            <span class='sr-only'>Next</span>
            <svg
              class='w-2.5 h-2.5 rtl:rotate-180'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 6 10'
            >
              <path
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='m1 9 4-4-4-4'
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

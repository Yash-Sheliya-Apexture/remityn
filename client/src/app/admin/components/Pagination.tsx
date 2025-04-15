// // components/Pagination.tsx
// import React from 'react';

// interface PaginationProps {
//     currentPage: number;
//     totalPages: number;
//     paginate: (pageNumber: number) => void;
//     goToPreviousPage: () => void;
//     goToNextPage: () => void;
// }

// const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, paginate, goToPreviousPage, goToNextPage }) => {
//     if (totalPages <= 1) return null; // Don't show pagination if there's only one page

//     return (
//         <div className="py-3 flex items-center justify-between">
//             <div className="flex-1 flex justify-between sm:hidden">
//                 <button
//                     onClick={goToPreviousPage}
//                     className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
//                     disabled={currentPage === 1}
//                 >
//                     Previous
//                 </button>
//                 <button
//                     onClick={goToNextPage}
//                     className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
//                     disabled={currentPage === totalPages}
//                 >
//                     Next
//                 </button>
//             </div>
//             <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//                 <div>
//                     <p className="text-sm text-gray-600 dark:text-white">
//                         Showing page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
//                     </p>
//                 </div>
//                 <div>
//                     <nav className="isolate flex gap-2" aria-label="Pagination">
//                         <button
//                             onClick={goToPreviousPage}
//                             className="relative flex items-center justify-center rounded-3xl px-2 py-2 w-12 h-12 bg-lightgray dark:bg-primarybox dark:hover:bg-secondarybox text-sm font-medium text-neutral-900 dark:text-white hover:bg-lightborder focus:outline-none cursor-pointer"
//                             aria-label="Previous"
//                             disabled={currentPage === 1}
//                         >
//                             <span className="sr-only">Previous</span>
//                             {/* Heroicon name: solid/chevron-left */}
//                             <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                                 <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
//                             </svg>
//                         </button>
//                         {/* Page numbers */}
//                         {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
//                             <button
//                                 key={pageNumber}
//                                 onClick={() => paginate(pageNumber)}
//                                 aria-current={currentPage === pageNumber ? 'page' : undefined}
//                                 className={`relative flex items-center justify-center px-4 py-2 w-12 h-12 font-semibold rounded-3xl cursor-pointer ${currentPage === pageNumber ? 'z-10 bg-primary text-neutral-900' : 'bg-lightgray hover:bg-lightborder text-neutral-900 dark:bg-primarybox dark:hover:bg-secondarybox dark:text-white'} focus:z-10 focus:outline-none`}
//                             >
//                                 {pageNumber}
//                             </button>
//                         ))}
//                         <button
//                             onClick={goToNextPage}
//                             className="relative flex items-center justify-center rounded-3xl px-2 py-2 w-12 h-12 bg-lightgray dark:bg-primarybox dark:hover:bg-secondarybox text-sm font-medium text-neutral-900 dark:text-white hover:bg-lightborder focus:outline-none cursor-pointer"
//                             aria-label="Next"
//                             disabled={currentPage === totalPages}
//                         >
//                             <span className="sr-only">Next</span>
//                             {/* Heroicon name: solid/chevron-right */}
//                             <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                                 <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                             </svg>
//                         </button>
//                     </nav>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Pagination;





// // components/Pagination.tsx
// import React from 'react';
// import { IoChevronBack, IoChevronForward } from "react-icons/io5";

// interface PaginationProps {
//     currentPage: number;
//     totalPages: number;
//     paginate: (pageNumber: number) => void;
//     goToPreviousPage: () => void;
//     goToNextPage: () => void;
// }

// const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, paginate, goToPreviousPage, goToNextPage }) => {
//     if (totalPages <= 1) return null; // Don't show pagination if there's only one page

//     return (
//       <div className="py-3 flex items-center justify-between">
//         {/* --- Mobile View --- */}
//         <div className="flex-1 flex justify-between sm:hidden">
//           <button
//             onClick={goToPreviousPage}
//             // Add disabled:opacity-50 and disabled:cursor-not-allowed here
//             className="inline-flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-4 py-2 h-12 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//             disabled={currentPage === 1}
//           >
//             <IoChevronBack className="h-4 w-4 mr-1.5" />
//             Previous
//           </button>
//           <button
//             onClick={goToNextPage}
//              // Add disabled:opacity-50 and disabled:cursor-not-allowed here
//             className="inline-flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-4 py-2 h-12 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//             disabled={currentPage === totalPages}
//           >
//             Next
//             <IoChevronForward className="h-4 w-4 ml-1.5" />
//           </button>
//         </div>

//         {/* --- Desktop View --- */}
//         <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//           <div>
//             <p className="text-sm text-gray-600 dark:text-white">
//               Showing page <span className="font-medium">{currentPage}</span> of{" "}
//               <span className="font-medium">{totalPages}</span>
//             </p>
//           </div>
//           <div>
//             <nav className="isolate flex gap-2" aria-label="Pagination">
//               <button
//                 onClick={goToPreviousPage}
//                  // Add disabled:opacity-50 and disabled:cursor-not-allowed here
//                 className="relative flex items-center justify-center rounded-3xl px-2 py-2 w-12 h-12 bg-lightgray dark:bg-primarybox dark:hover:bg-secondarybox text-sm font-medium text-neutral-900 dark:text-white hover:bg-lightborder focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
//                 aria-label="Previous"
//                 disabled={currentPage === 1}
//               >
//                 <span className="sr-only">Previous</span>
//                 {/* Heroicon name: solid/chevron-left */}
//                 <svg
//                   className="h-7 w-7"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                   aria-hidden="true"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </button>
//               {/* Page numbers */}
//               {Array.from({ length: totalPages }, (_, i) => i + 1).map(
//                 (pageNumber) => (
//                   <button
//                     key={pageNumber}
//                     onClick={() => paginate(pageNumber)}
//                     aria-current={
//                       currentPage === pageNumber ? "page" : undefined
//                     }
//                     className={`relative flex items-center justify-center px-4 py-2 w-12 h-12 font-semibold rounded-3xl cursor-pointer ${
//                       currentPage === pageNumber
//                         ? "z-10 bg-primary text-neutral-900" // Active state
//                         : "bg-lightgray hover:bg-lightborder text-neutral-900 dark:bg-primarybox dark:hover:bg-secondarybox dark:text-white" // Default state
//                     } focus:z-10 focus:outline-none`}
//                     // No disabled styles needed for page number buttons
//                   >
//                     {pageNumber}
//                   </button>
//                 )
//               )}
//               <button
//                 onClick={goToNextPage}
//                  // Add disabled:opacity-50 and disabled:cursor-not-allowed here
//                 className="relative flex items-center justify-center rounded-3xl px-2 py-2 w-12 h-12 bg-lightgray dark:bg-primarybox dark:hover:bg-secondarybox text-sm font-medium text-neutral-900 dark:text-white hover:bg-lightborder focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
//                 aria-label="Next"
//                 disabled={currentPage === totalPages}
//               >
//                 <span className="sr-only">Next</span>
//                 {/* Heroicon name: solid/chevron-right */}
//                 <svg
//                   className="h-7 w-7"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                   aria-hidden="true"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </button>
//             </nav>
//           </div>
//         </div>
//       </div>
//     );
// };

// export default Pagination; 

// components/Pagination.tsx
import React from 'react';
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { motion } from 'framer-motion'; // Import motion

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    paginate: (pageNumber: number) => void;
    goToPreviousPage: () => void;
    goToNextPage: () => void;
}

// --- Helper Function to Generate Page Numbers/Ellipsis ---
const getPageNumbersToShow = (currentPage: number, totalPages: number): (number | string)[] => {
    const pagesToShow: (number | string)[] = [];
    const firstPagesCount = 4; // Show first 4 pages
    const lastPagesCount = 2;  // Show last 2 pages
    const ellipsis = '...';

    // Define a threshold where the ellipsis pattern makes sense
    // (Needs space for first pages + ellipsis + last pages)
    const ellipsisThreshold = firstPagesCount + lastPagesCount + 1; // 4 + 1 + 2 = 7

    if (totalPages <= ellipsisThreshold) {
        // If total pages are few, show all numbers
        for (let i = 1; i <= totalPages; i++) {
            pagesToShow.push(i);
        }
    } else {
        // Show first set of pages
        for (let i = 1; i <= firstPagesCount; i++) {
            pagesToShow.push(i);
        }

        // Add ellipsis
        pagesToShow.push(ellipsis);

        // Show last set of pages
        for (let i = totalPages - lastPagesCount + 1; i <= totalPages; i++) {
            pagesToShow.push(i);
        }
    }

    return pagesToShow;
};
// --- End Helper Function ---


const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, paginate, goToPreviousPage, goToNextPage }) => {
    if (totalPages <= 1) return null; // Don't show pagination if there's only one page

    const pageNumbers = getPageNumbersToShow(currentPage, totalPages);

    return (
      <div className="py-3 flex items-center justify-between">
        {/* --- Mobile View (unchanged) --- */}
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={goToPreviousPage}
            className="inline-flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-4 py-2 h-12 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === 1}
          >
            <IoChevronBack className="h-4 w-4 mr-1.5" />
            Previous
          </button>
          <button
            onClick={goToNextPage}
            className="inline-flex items-center justify-center cursor-pointer gap-2 bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-4 py-2 h-12 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === totalPages}
          >
            Next
            <IoChevronForward className="h-4 w-4 ml-1.5" />
          </button>
        </div>

        {/* --- Desktop View (Modified for Ellipsis & Animation) --- */}
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-white">
              Showing page <span className="font-medium">{currentPage}</span> of{" "}
              <span className="font-medium">{totalPages}</span>
            </p>
          </div>
          <div>
            <nav className="isolate flex gap-2 items-center" aria-label="Pagination"> {/* Added items-center */}
              {/* Previous Button (Unchanged styling) */}
              <button
                onClick={goToPreviousPage}
                className="relative flex items-center justify-center rounded-3xl px-2 py-2 w-12 h-12 bg-lightgray dark:bg-primarybox dark:hover:bg-secondarybox text-sm font-medium text-neutral-900 dark:text-white hover:bg-lightborder focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200" // Added transition
                aria-label="Previous"
                disabled={currentPage === 1}
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="h-7 w-7"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Page numbers/Ellipsis with Animated Indicator */}
              {pageNumbers.map((page, index) => {
                  if (typeof page === 'string') {
                      // Render Ellipsis as a non-interactive element
                      return (
                          <span
                              key={`ellipsis-${index}`} // Use index for key as ellipsis position might be stable
                              className="relative inline-flex items-center justify-center rounded-3xl px-2 py-2 w-12 h-12 text-sm font-medium text-gray-500 dark:text-gray-400 select-none" // Make non-interactive
                              aria-hidden="true" // Not relevant for navigation
                          >
                              {page}
                          </span>
                      );
                  } else {
                      // Render Page Number Button (existing logic)
                      const pageNumber = page; // Type assertion is fine here
                      return (
                          <div key={pageNumber} className="relative w-12 h-12"> {/* Wrapper for layout context */}
                              {/* Clickable Button - Transparent background, text color changes */}
                              <button
                                  onClick={() => paginate(pageNumber)}
                                  aria-current={currentPage === pageNumber ? "page" : undefined}
                                  // Base styles + conditional styles
                                  className={`relative z-10 flex items-center justify-center w-full h-full font-semibold rounded-3xl cursor-pointer focus:z-10 focus:outline-none transition-colors duration-150 ease-in-out ${
                                    currentPage === pageNumber
                                      ? "text-neutral-900" // Active text color (ensure contrast with primary bg)
                                      : "text-neutral-900 dark:text-white bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox" // Default text/bg + hover
                                  }`}
                                  disabled={currentPage === pageNumber} // Optional: disable clicking the active page
                              >
                                  {pageNumber}
                              </button>

                              {/* Animated Background Indicator - Rendered ONLY under the active button */}
                              {currentPage === pageNumber && (
                                  <motion.div
                                      // This div takes the appearance of the active state background
                                      className="absolute inset-0 bg-primary rounded-3xl z-0" // Position behind text (z-0)
                                      layoutId="active-page-indicator" // *** The key for animation ***
                                      transition={{ type: 'spring', stiffness: 350, damping: 30 }} // Customize animation
                                      aria-hidden="true" // Hide from screen readers as it's decorative
                                  />
                              )}
                          </div>
                      );
                  }
              })}

              {/* Next Button (Unchanged styling) */}
              <button
                onClick={goToNextPage}
                className="relative flex items-center justify-center rounded-3xl px-2 py-2 w-12 h-12 bg-lightgray dark:bg-primarybox dark:hover:bg-secondarybox text-sm font-medium text-neutral-900 dark:text-white hover:bg-lightborder focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200" // Added transition
                aria-label="Next"
                disabled={currentPage === totalPages}
              >
                <span className="sr-only">Next</span>
                <svg
                  className="h-7 w-7"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    );
};

export default Pagination;
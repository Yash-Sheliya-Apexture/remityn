// components/Pagination.tsx
import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    paginate: (pageNumber: number) => void;
    goToPreviousPage: () => void;
    goToNextPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, paginate, goToPreviousPage, goToNextPage }) => {
    if (totalPages <= 1) return null; // Don't show pagination if there's only one page

    return (
        <div className="py-3 flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
                <button
                    onClick={goToPreviousPage}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button
                    onClick={goToNextPage}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-600 dark:text-white">
                        Showing page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
                    </p>
                </div>
                <div>
                    <nav className="isolate flex gap-2" aria-label="Pagination">
                        <button
                            onClick={goToPreviousPage}
                            className="relative flex items-center justify-center rounded-3xl px-2 py-2 w-12 h-12 bg-lightgray dark:bg-primarybox dark:hover:bg-secondarybox text-sm font-medium text-neutral-900 dark:text-white hover:bg-lightborder focus:outline-none cursor-pointer"
                            aria-label="Previous"
                            disabled={currentPage === 1}
                        >
                            <span className="sr-only">Previous</span>
                            {/* Heroicon name: solid/chevron-left */}
                            <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                        {/* Page numbers */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                            <button
                                key={pageNumber}
                                onClick={() => paginate(pageNumber)}
                                aria-current={currentPage === pageNumber ? 'page' : undefined}
                                className={`relative flex items-center justify-center px-4 py-2 w-12 h-12 font-semibold rounded-3xl cursor-pointer ${currentPage === pageNumber ? 'z-10 bg-primary text-neutral-900' : 'bg-lightgray hover:bg-lightborder text-neutral-900 dark:bg-primarybox dark:hover:bg-secondarybox dark:text-white'} focus:z-10 focus:outline-none`}
                            >
                                {pageNumber}
                            </button>
                        ))}
                        <button
                            onClick={goToNextPage}
                            className="relative flex items-center justify-center rounded-3xl px-2 py-2 w-12 h-12 bg-lightgray dark:bg-primarybox dark:hover:bg-secondarybox text-sm font-medium text-neutral-900 dark:text-white hover:bg-lightborder focus:outline-none cursor-pointer"
                            aria-label="Next"
                            disabled={currentPage === totalPages}
                        >
                            <span className="sr-only">Next</span>
                            {/* Heroicon name: solid/chevron-right */}
                            <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
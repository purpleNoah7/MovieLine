'use client'

import React, { useState } from "react";

export default function Pagination() {
    const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="max-w-screen-xl mx-auto mt-12 px-4 text-gray-600 md:px-8">
      <div className="flex items-center justify-between text-sm text-gray-600 font-medium">
        <button
          onClick={handlePreviousPage}
          className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50"
        >
          Previous
        </button>
        <div>Page {currentPage}</div>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ offset, limit, handlePrevious, handleNext, isLoading }) => {
  return (
    <div className="flex justify-center items-center gap-6 mt-10 mb-6">
      <button
        onClick={handlePrevious}
        disabled={offset === 0 || isLoading}
        className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-colors ${
          offset === 0 || isLoading
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg'
        }`}
      >
        <ChevronLeft className="w-5 h-5" />
        Previous
      </button>
      
      <span className="text-gray-600 font-medium">
        Page {Math.floor(offset / limit) + 1}
      </span>

      <button
        onClick={handleNext}
        disabled={isLoading}
        className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-colors ${
          isLoading
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg'
        }`}
      >
        Next
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;

import React from "react";

const Paginationbutton = ({
  handlePrevPage,
  currentPage,
  handleNextPage,
  itemsPerPage,
  totalItems,
}) => {
  return (
    <div className="pagination w-full flex items-center justify-between h-[80px] rounded-md mt-4">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className={`
    ${currentPage === 1 ? "disabled:bg-red-200" : ""}
     text-white bg-red-500 hover:bg-red-700 px-4 py-1 rounded'
     `}
      >
        Next
      </button>
      <button
        onClick={handleNextPage}
        disabled={currentPage * itemsPerPage >= totalItems}
        className={` 
    ${currentPage * itemsPerPage >= totalItems ? "disabled:bg-red-200" : ""}
     text-white bg-red-500 hover:bg-red-700 px-4 py-1 rounded 
          `}
      >
        Prev
      </button>
    </div>
  );
};

export default Paginationbutton;

import React from "react";
import PropTypes from "prop-types";
import { IconButton, Typography } from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
} from "@mui/icons-material";

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  hasNextPage,
  hasPrevPage,
  onPageChange,
}) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Tạo mảng các trang hiển thị với dấu chấm lửng
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="mt-6 flex flex-col items-center gap-3">
      <Typography variant="body2" className="text-gray-600">
        Hiển thị {startItem}-{endItem} của {totalItems} kết quả
      </Typography>

      <div className="flex items-center gap-1">
        <IconButton
          size="small"
          disabled={!hasPrevPage}
          onClick={() => handlePageChange(1)}
          className="rounded-full text-gray-600 hover:bg-amber-100 hover:text-amber-700 disabled:text-gray-300"
        >
          <FirstPageIcon />
        </IconButton>

        <IconButton
          size="small"
          disabled={!hasPrevPage}
          onClick={() => handlePageChange(currentPage - 1)}
          className="rounded-full text-gray-600 hover:bg-amber-100 hover:text-amber-700 disabled:text-gray-300"
        >
          <ChevronLeftIcon />
        </IconButton>

        <div className="flex gap-1">
          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className="flex h-8 w-8 items-center justify-center text-gray-600"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`flex h-8 w-8 items-center justify-center rounded-full font-medium transition-colors ${
                  currentPage === page
                    ? "bg-amber-600 text-white hover:bg-amber-700"
                    : "bg-amber-100 text-gray-700 hover:bg-amber-200"
                }`}
              >
                {page}
              </button>
            ),
          )}
        </div>

        <IconButton
          size="small"
          disabled={!hasNextPage}
          onClick={() => handlePageChange(currentPage + 1)}
          className="rounded-full text-gray-600 hover:bg-amber-100 hover:text-amber-700 disabled:text-gray-300"
        >
          <ChevronRightIcon />
        </IconButton>

        <IconButton
          size="small"
          disabled={!hasNextPage}
          onClick={() => handlePageChange(totalPages)}
          className="rounded-full text-gray-600 hover:bg-amber-100 hover:text-amber-700 disabled:text-gray-300"
        >
          <LastPageIcon />
        </IconButton>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
  hasPrevPage: PropTypes.bool.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;

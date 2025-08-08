import React, { useState, useEffect } from "react";
import { Typography, Paper } from "@mui/material";
import FeedbackFilters from "@/components/admin/FeedbackFilters";
import FeedbackList from "@/components/feedback/FeedbackList";
import Pagination from "@/components/common/Pagination";
import {
  getAllFeedbacksWithDetails,
  filterFeedbacks,
  sortFeedbacks,
  paginateFeedbacks,
} from "@/metadata/QuangMockData";
import { ITEMS_PER_PAGE } from "@/utils/constants";

const FeedbackManagementPage = () => {
  // State management
  const [allFeedbacks] = useState(getAllFeedbacksWithDetails());
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginatedData, setPaginatedData] = useState({
    data: [],
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });

  // Filter states
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    priority: "all",
    status: "all",
  });

  // Sort and pagination states
  const [sortBy, setSortBy] = useState("submitted_at_desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);

  // Apply filters, sort, and pagination
  useEffect(() => {
    const applyFilters = async () => {
      setLoading(true);

      try {
        await new Promise((resolve) => setTimeout(resolve, 300));
        let filtered = filterFeedbacks(allFeedbacks, filters);
        filtered = sortFeedbacks(filtered, sortBy);
        setFilteredFeedbacks(filtered);
        const paginated = paginateFeedbacks(filtered, currentPage, itemsPerPage);
        setPaginatedData(paginated);
      } catch (error) {
        console.error("Error applying filters:", error);
      } finally {
        setLoading(false);
      }
    };

    applyFilters();
  }, [allFeedbacks, filters, sortBy, currentPage, itemsPerPage]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy, itemsPerPage]);

  // Event handlers
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8 text-center">
        <Typography variant="h1" className="mb-4 text-4xl font-bold text-gray-900">
          Quản Lý Phản Hồi
        </Typography>
        <Typography variant="body1" className="text-lg text-gray-600">
          Quản lý và xử lý tất cả phản hồi từ người dùng
        </Typography>
      </div>

      {/* Filters */}
      <Paper className="p-6 shadow-sm">
        <FeedbackFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          totalResults={filteredFeedbacks.length}
        />
      </Paper>

      {/* Feedback List */}
      <Paper className="p-6 shadow-sm">
        <FeedbackList feedbacks={paginatedData.data} loading={loading} />
      </Paper>

      {/* Pagination */}
      {paginatedData.totalPages > 1 && (
        <Pagination
          currentPage={paginatedData.currentPage}
          totalPages={paginatedData.totalPages}
          totalItems={paginatedData.totalItems}
          itemsPerPage={itemsPerPage}
          hasNextPage={paginatedData.hasNextPage}
          hasPrevPage={paginatedData.hasPrevPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      )}
    </div>
  );
};

export default FeedbackManagementPage;

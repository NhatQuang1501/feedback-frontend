import React from "react";
import { Typography, Paper, Box } from "@mui/material";
import FeedbackFilters from "@/components/feedback/FeedbackFilters";
import FeedbackList from "@/components/feedback/FeedbackList";
import Pagination from "@/components/common/Pagination";
import { useFeedbackList, useExportFeedback } from "@/hooks/useFeedback";

const AdminFeedbackManagementPage = () => {
  const {
    feedbacks,
    totalItems,
    currentPage,
    isLoading,
    filters,
    handleFilterChange,
    handlePageChange,
    itemsPerPage,
    totalPages,
  } = useFeedbackList();

  const { isExporting, exportStatus, exportUrl, startExport, downloadFile } = useExportFeedback();

  // Xử lý export feedback
  const handleExport = () => {
    startExport({
      status: filters.status,
      type: filters.type,
      priority: filters.priority,
      q: filters.q,
      sort: filters.sort,
    });
  };

  // Xử lý download file
  const handleDownload = () => {
    downloadFile();
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="relative mb-8 text-center">
        <Typography variant="h1" className="mb-4 text-4xl font-bold text-gray-900">
          Quản Lý Phản Hồi
        </Typography>
        <Typography variant="body1" className="text-lg text-gray-600">
          Quản lý và xử lý tất cả phản hồi từ người dùng
        </Typography>
      </div>

      {/* Filters */}
      <Paper className="p-6 shadow-sm">
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <FeedbackFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            sortBy={filters.sort}
            onSortChange={(sort) => handleFilterChange("sort", sort)}
            totalResults={totalItems}
          />
        </Box>
      </Paper>

      {/* Feedback List */}
      <Paper className="p-6 shadow-sm">
        <FeedbackList feedbacks={feedbacks} loading={isLoading} />
      </Paper>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          hasNextPage={currentPage < totalPages}
          hasPrevPage={currentPage > 1}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default AdminFeedbackManagementPage;

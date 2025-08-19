import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFeedbacks,
  fetchFeedbackDetail,
  updateFeedbackStatus,
  exportFeedbacks,
  checkExportStatus,
  setCurrentPage,
} from "../store/slices/feedbackSlice";
import { useDebounce } from "./useDebounce";
import { ITEMS_PER_PAGE } from "@/utils/constants";

export const useFeedbackList = (initialFilters = {}) => {
  const dispatch = useDispatch();
  const { feedbacks, totalItems, currentPage, isLoading, error } = useSelector(
    (state) => state.feedback,
  );

  const [filters, setFilters] = useState({
    status: initialFilters.status || [],
    type: initialFilters.type || [],
    priority: initialFilters.priority || [],
    q: initialFilters.q || "",
    sort: initialFilters.sort || "newest",
  });

  const debouncedKeyword = useDebounce(filters.q, 500);

  // Tải danh sách feedback
  const loadFeedbacks = useCallback(() => {
    const params = {
      page: currentPage,
      status: filters.status,
      type: filters.type,
      priority: filters.priority,
      q: debouncedKeyword,
      sort: filters.sort,
    };
    dispatch(fetchFeedbacks(params));
  }, [
    dispatch,
    currentPage,
    filters.status,
    filters.type,
    filters.priority,
    debouncedKeyword,
    filters.sort,
  ]);

  // Xử lý thay đổi filter - Sửa để tránh lỗi Maximum update depth
  const handleFilterChange = useCallback((filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  }, []);

  // Xử lý thay đổi trang
  const handlePageChange = useCallback(
    (page) => {
      dispatch(setCurrentPage(page));
    },
    [dispatch],
  );

  // Xử lý reset về trang 1 khi filter thay đổi
  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [dispatch, filters.status, filters.type, filters.priority, filters.q, filters.sort]);

  // Tải dữ liệu khi component mount hoặc filters/currentPage thay đổi
  useEffect(() => {
    loadFeedbacks();
  }, [loadFeedbacks]);

  return {
    feedbacks,
    totalItems,
    currentPage,
    isLoading,
    error,
    filters,
    handleFilterChange,
    handlePageChange,
    itemsPerPage: ITEMS_PER_PAGE,
    totalPages: Math.ceil(totalItems / ITEMS_PER_PAGE),
    refresh: loadFeedbacks,
  };
};

export const useFeedbackDetail = (feedbackId) => {
  const dispatch = useDispatch();
  const { selectedFeedback, isLoadingDetail, detailError, isUpdating, updateError } = useSelector(
    (state) => state.feedback,
  );

  // Tải chi tiết feedback
  const loadFeedbackDetail = useCallback(() => {
    if (feedbackId) {
      dispatch(fetchFeedbackDetail(feedbackId));
    }
  }, [dispatch, feedbackId]);

  // Cập nhật trạng thái feedback
  const handleStatusUpdate = async (statusId) => {
    if (feedbackId) {
      await dispatch(updateFeedbackStatus({ id: feedbackId, statusId }));
      return true;
    }
    return false;
  };

  // Tải dữ liệu khi component mount hoặc feedbackId thay đổi
  useEffect(() => {
    loadFeedbackDetail();
  }, [loadFeedbackDetail]);

  return {
    feedback: selectedFeedback,
    isLoading: isLoadingDetail,
    error: detailError,
    isUpdating,
    updateError,
    updateStatus: handleStatusUpdate,
    refresh: loadFeedbackDetail,
  };
};

export const useExportFeedback = () => {
  const dispatch = useDispatch();
  const { exportTaskId, exportStatus, exportUrl, isExporting, exportError } = useSelector(
    (state) => state.feedback,
  );

  // Bắt đầu export
  const startExport = async (filters) => {
    await dispatch(exportFeedbacks(filters));
  };

  // Kiểm tra trạng thái export
  const checkStatus = async () => {
    if (exportTaskId) {
      await dispatch(checkExportStatus(exportTaskId));
    }
  };

  // Tự động kiểm tra trạng thái export
  useEffect(() => {
    let interval;
    if (exportTaskId && exportStatus === "processing") {
      interval = setInterval(() => {
        dispatch(checkExportStatus(exportTaskId));
      }, 2000); // Kiểm tra mỗi 2 giây
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [dispatch, exportTaskId, exportStatus]);

  // Download file khi có URL
  const downloadFile = async () => {
    if (exportUrl) {
      try {
        window.open(exportUrl, "_blank");
        return true;
      } catch (error) {
        console.error("Download error:", error);
        return false;
      }
    }
    return false;
  };

  return {
    exportTaskId,
    exportStatus,
    exportUrl,
    isExporting,
    exportError,
    startExport,
    checkStatus,
    downloadFile,
  };
};

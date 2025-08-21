import React, { useState, useEffect } from "react";
import { Container, Typography, Paper, Box } from "@mui/material";
import { Send as SendIcon, CheckCircle as CheckCircleIcon } from "@mui/icons-material";
import { useSelector } from "react-redux";
import CustomTabs from "@/components/common/CustomTabs";
import FeedbackList from "@/components/feedback/FeedbackList";
import Pagination from "@/components/common/Pagination";
import FeedbackFilters from "@/components/feedback/FeedbackFilters";
import { feedbackApi } from "@/api/feedbackApi";
import { useToast } from "@/components/common/Toast";

const UserFeedbackPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { showToast } = useToast();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [allFeedbacks, setAllFeedbacks] = useState([]);
  const [allFeedbacksCount, setAllFeedbacksCount] = useState(0);
  const [allFeedbacksPage, setAllFeedbacksPage] = useState(1);
  const [allFeedbacksFilters, setAllFeedbacksFilters] = useState({
    q: "",
    type: [],
    priority: [],
    page: 1,
    page_size: 10,
  });

  const [pendingFeedbacks, setPendingFeedbacks] = useState([]);
  const [pendingFeedbacksCount, setPendingFeedbacksCount] = useState(0);
  const [pendingFeedbacksPage, setPendingFeedbacksPage] = useState(1);
  const [pendingFeedbacksFilters, setPendingFeedbacksFilters] = useState({
    q: "",
    type: [],
    priority: [],
    status: ["pending", "processing"],
    page: 1,
    page_size: 10,
  });

  const [resolvedFeedbacks, setResolvedFeedbacks] = useState([]);
  const [resolvedFeedbacksCount, setResolvedFeedbacksCount] = useState(0);
  const [resolvedFeedbacksPage, setResolvedFeedbacksPage] = useState(1);
  const [resolvedFeedbacksFilters, setResolvedFeedbacksFilters] = useState({
    q: "",
    type: [],
    priority: [],
    status: ["resolved"],
    page: 1,
    page_size: 10,
  });

  const [allSort, setAllSort] = useState("newest");
  const [pendingSort, setPendingSort] = useState("newest");
  const [resolvedSort, setResolvedSort] = useState("newest");

  const fetchAllFeedbacks = async () => {
    try {
      setLoading(true);
      const params = {
        ...allFeedbacksFilters,
        sort: allSort === "newest" ? "-created_at" : "created_at",
      };

      const response = await feedbackApi.getFeedbacks(params);
      setAllFeedbacks(response.data || []);
      setAllFeedbacksCount(response.count || 0);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
      showToast("Có lỗi xảy ra khi tải dữ liệu phản hồi", "error");
      setAllFeedbacks([]);
      setAllFeedbacksCount(0);
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingFeedbacks = async () => {
    try {
      setLoading(true);
      const params = {
        ...pendingFeedbacksFilters,
        sort: pendingSort === "newest" ? "-created_at" : "created_at",
      };

      const response = await feedbackApi.getFeedbacks(params);
      setPendingFeedbacks(response.data || []);
      setPendingFeedbacksCount(response.count || 0);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu phản hồi đang xử lý:", error);
      showToast("Có lỗi xảy ra khi tải dữ liệu phản hồi đang xử lý", "error");
      setPendingFeedbacks([]);
      setPendingFeedbacksCount(0);
    } finally {
      setLoading(false);
    }
  };

  const fetchResolvedFeedbacks = async () => {
    try {
      setLoading(true);
      const params = {
        ...resolvedFeedbacksFilters,
        sort: resolvedSort === "newest" ? "-created_at" : "created_at",
      };

      const response = await feedbackApi.getFeedbacks(params);
      setResolvedFeedbacks(response.data || []);
      setResolvedFeedbacksCount(response.count || 0);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu phản hồi đã giải quyết:", error);
      showToast("Có lỗi xảy ra khi tải dữ liệu phản hồi đã giải quyết", "error");
      setResolvedFeedbacks([]);
      setResolvedFeedbacksCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    switch (tabValue) {
      case 0:
        fetchAllFeedbacks();
        break;
      case 1:
        fetchPendingFeedbacks();
        break;
      case 2:
        fetchResolvedFeedbacks();
        break;
      default:
        fetchAllFeedbacks();
    }
  }, [
    tabValue,
    allFeedbacksFilters,
    pendingFeedbacksFilters,
    resolvedFeedbacksFilters,
    allSort,
    pendingSort,
    resolvedSort,
  ]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAllFilterChange = (key, value) => {
    setAllFeedbacksFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1,
    }));
  };

  const handlePendingFilterChange = (key, value) => {
    setPendingFeedbacksFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1,
    }));
  };

  const handleResolvedFilterChange = (key, value) => {
    setResolvedFeedbacksFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1,
    }));
  };

  const handleAllPageChange = (page) => {
    setAllFeedbacksPage(page);
    setAllFeedbacksFilters((prev) => ({
      ...prev,
      page: page,
    }));
  };

  const handlePendingPageChange = (page) => {
    setPendingFeedbacksPage(page);
    setPendingFeedbacksFilters((prev) => ({
      ...prev,
      page: page,
    }));
  };

  const handleResolvedPageChange = (page) => {
    setResolvedFeedbacksPage(page);
    setResolvedFeedbacksFilters((prev) => ({
      ...prev,
      page: page,
    }));
  };

  const handleAllSortChange = (value) => {
    setAllSort(value);
  };

  const handlePendingSortChange = (value) => {
    setPendingSort(value);
  };

  const handleResolvedSortChange = (value) => {
    setResolvedSort(value);
  };

  const tabs = [
    {
      label: "Tất cả phản hồi",
      icon: <SendIcon />,
      content: (
        <div className="space-y-6 p-6">
          <FeedbackFilters
            filters={allFeedbacksFilters}
            onFilterChange={handleAllFilterChange}
            sortBy={allSort}
            onSortChange={handleAllSortChange}
            totalResults={allFeedbacksCount}
          />
          <FeedbackList
            feedbacks={allFeedbacks}
            loading={loading}
            emptyMessage="Bạn chưa gửi phản hồi nào"
            detailUrlPrefix="/feedbacks/"
          />
          {Math.ceil(allFeedbacksCount / allFeedbacksFilters.page_size) > 1 && (
            <Pagination
              currentPage={allFeedbacksPage}
              totalPages={Math.ceil(allFeedbacksCount / allFeedbacksFilters.page_size)}
              totalItems={allFeedbacksCount}
              itemsPerPage={allFeedbacksFilters.page_size}
              hasNextPage={
                allFeedbacksPage < Math.ceil(allFeedbacksCount / allFeedbacksFilters.page_size)
              }
              hasPrevPage={allFeedbacksPage > 1}
              onPageChange={handleAllPageChange}
            />
          )}
        </div>
      ),
    },
    {
      label: "Đang xử lý",
      icon: <SendIcon />,
      content: (
        <div className="space-y-6 p-6">
          <FeedbackFilters
            filters={pendingFeedbacksFilters}
            onFilterChange={handlePendingFilterChange}
            sortBy={pendingSort}
            onSortChange={handlePendingSortChange}
            totalResults={pendingFeedbacksCount}
          />
          <FeedbackList
            feedbacks={pendingFeedbacks}
            loading={loading}
            emptyMessage="Không có phản hồi nào đang xử lý"
            detailUrlPrefix="/feedbacks/"
          />
          {Math.ceil(pendingFeedbacksCount / pendingFeedbacksFilters.page_size) > 1 && (
            <Pagination
              currentPage={pendingFeedbacksPage}
              totalPages={Math.ceil(pendingFeedbacksCount / pendingFeedbacksFilters.page_size)}
              totalItems={pendingFeedbacksCount}
              itemsPerPage={pendingFeedbacksFilters.page_size}
              hasNextPage={
                pendingFeedbacksPage <
                Math.ceil(pendingFeedbacksCount / pendingFeedbacksFilters.page_size)
              }
              hasPrevPage={pendingFeedbacksPage > 1}
              onPageChange={handlePendingPageChange}
            />
          )}
        </div>
      ),
    },
    {
      label: "Đã xử lý",
      icon: <CheckCircleIcon />,
      content: (
        <div className="space-y-6 p-6">
          <FeedbackFilters
            filters={resolvedFeedbacksFilters}
            onFilterChange={handleResolvedFilterChange}
            sortBy={resolvedSort}
            onSortChange={handleResolvedSortChange}
            totalResults={resolvedFeedbacksCount}
          />
          <FeedbackList
            feedbacks={resolvedFeedbacks}
            loading={loading}
            emptyMessage="Chưa có phản hồi nào được giải quyết"
            detailUrlPrefix="/feedbacks/"
          />
          {Math.ceil(resolvedFeedbacksCount / resolvedFeedbacksFilters.page_size) > 1 && (
            <Pagination
              currentPage={resolvedFeedbacksPage}
              totalPages={Math.ceil(resolvedFeedbacksCount / resolvedFeedbacksFilters.page_size)}
              totalItems={resolvedFeedbacksCount}
              itemsPerPage={resolvedFeedbacksFilters.page_size}
              hasNextPage={
                resolvedFeedbacksPage <
                Math.ceil(resolvedFeedbacksCount / resolvedFeedbacksFilters.page_size)
              }
              hasPrevPage={resolvedFeedbacksPage > 1}
              onPageChange={handleResolvedPageChange}
            />
          )}
        </div>
      ),
    },
  ];

  return (
    <Container maxWidth="lg" className="py-8">
      {/* Page Header */}
      <Box className="mb-8 text-center">
        <Typography variant="h4" className="mb-2 font-bold text-gray-900">
          Quản Lý Phản Hồi Của Tôi
        </Typography>
        <Typography variant="body1" className="text-gray-600">
          Theo dõi và quản lý tất cả các phản hồi bạn đã gửi
        </Typography>
      </Box>

      {/* Hiển thị thông tin người dùng */}
      <Paper className="mb-6 flex items-center justify-between rounded-lg bg-blue-50 p-4">
        <div>
          <Typography variant="h6" className="font-medium text-gray-900">
            {user?.full_name}
          </Typography>
          <Typography variant="body2" className="text-gray-600">
            {user?.email}
          </Typography>
        </div>
        <Typography variant="body2" className="rounded-full bg-blue-100 px-3 py-1 text-blue-800">
          Tổng phản hồi: {allFeedbacksCount}
        </Typography>
      </Paper>

      {/* Main Content */}
      <Paper className="overflow-hidden rounded-xl shadow-md">
        <CustomTabs tabs={tabs} value={tabValue} onChange={handleTabChange} />
      </Paper>
    </Container>
  );
};

export default UserFeedbackPage;

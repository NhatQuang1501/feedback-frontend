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

  // State cho phản hồi đang xử lý
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

  // State cho phản hồi đã giải quyết
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

  // State cho sắp xếp
  const [allSort, setAllSort] = useState("newest");
  const [pendingSort, setPendingSort] = useState("newest");
  const [resolvedSort, setResolvedSort] = useState("newest");

  // Fetch tất cả phản hồi
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

  // Fetch phản hồi đang xử lý
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

  // Fetch phản hồi đã giải quyết
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

  // Effect để load dữ liệu khi component mount hoặc khi tab thay đổi
  useEffect(() => {
    switch (tabValue) {
      case 0: // Tab Tất cả
        fetchAllFeedbacks();
        break;
      case 1: // Tab Đang xử lý
        fetchPendingFeedbacks();
        break;
      case 2: // Tab Đã giải quyết
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

  // Xử lý thay đổi tab
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Xử lý thay đổi filter cho tab Tất cả
  const handleAllFilterChange = (key, value) => {
    setAllFeedbacksFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1, // Reset về trang 1 khi filter thay đổi
    }));
  };

  // Xử lý thay đổi filter cho tab Đang xử lý
  const handlePendingFilterChange = (key, value) => {
    setPendingFeedbacksFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1, // Reset về trang 1 khi filter thay đổi
    }));
  };

  // Xử lý thay đổi filter cho tab Đã giải quyết
  const handleResolvedFilterChange = (key, value) => {
    setResolvedFeedbacksFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1, // Reset về trang 1 khi filter thay đổi
    }));
  };

  // Xử lý thay đổi trang cho tab Tất cả
  const handleAllPageChange = (event, value) => {
    setAllFeedbacksPage(value);
    setAllFeedbacksFilters((prev) => ({
      ...prev,
      page: value,
    }));
  };

  // Xử lý thay đổi trang cho tab Đang xử lý
  const handlePendingPageChange = (event, value) => {
    setPendingFeedbacksPage(value);
    setPendingFeedbacksFilters((prev) => ({
      ...prev,
      page: value,
    }));
  };

  // Xử lý thay đổi trang cho tab Đã giải quyết
  const handleResolvedPageChange = (event, value) => {
    setResolvedFeedbacksPage(value);
    setResolvedFeedbacksFilters((prev) => ({
      ...prev,
      page: value,
    }));
  };

  // Xử lý thay đổi sắp xếp
  const handleAllSortChange = (value) => {
    setAllSort(value);
  };

  const handlePendingSortChange = (value) => {
    setPendingSort(value);
  };

  const handleResolvedSortChange = (value) => {
    setResolvedSort(value);
  };

  // Nội dung các tab
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
            detailUrlPrefix="/feedbacks/" // Đường dẫn đúng cho người dùng
          />
          {allFeedbacksCount > 0 && (
            <Box className="flex justify-center pt-4">
              <Pagination
                count={Math.ceil(allFeedbacksCount / allFeedbacksFilters.page_size)}
                page={allFeedbacksPage}
                onChange={handleAllPageChange}
              />
            </Box>
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
            detailUrlPrefix="/feedbacks/" // Đường dẫn đúng cho người dùng
          />
          {pendingFeedbacksCount > 0 && (
            <Box className="flex justify-center pt-4">
              <Pagination
                count={Math.ceil(pendingFeedbacksCount / pendingFeedbacksFilters.page_size)}
                page={pendingFeedbacksPage}
                onChange={handlePendingPageChange}
              />
            </Box>
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
          {resolvedFeedbacksCount > 0 && (
            <Box className="flex justify-center pt-4">
              <Pagination
                count={Math.ceil(resolvedFeedbacksCount / resolvedFeedbacksFilters.page_size)}
                page={resolvedFeedbacksPage}
                onChange={handleResolvedPageChange}
              />
            </Box>
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

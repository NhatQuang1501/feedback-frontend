import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Grid, Box, Alert, CircularProgress } from "@mui/material";

import {
  TrendingUp as TrendingUpIcon,
  Assignment as AssignmentIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import StatCard from "@/components/dashboard/StatCard";
import PieChartCard from "@/components/dashboard/PieChartCard";
import LineChartWithSlider from "@/components/dashboard/LineChart";
import PriorityDonutChart from "@/components/dashboard/PriorityDonutChart";
import ProcessingSpeedAreaChart from "@/components/dashboard/ProcessingSpeedAreaChart";
import RecentFeedbackTable from "@/components/dashboard/RecentFeedbackTable";
import {
  fetchOverviewStats,
  fetchFeedbacksByMonth,
  fetchFeedbackTypes,
  fetchPriorityDistribution,
  fetchHandlingSpeed,
  fetchRecentFeedbacks,
} from "@/store/slices/dashboardSlice";

export default function AdminDashboardPage() {
  const dispatch = useDispatch();
  const {
    overviewStats,
    feedbacksByMonth,
    feedbackTypes,
    priorityDistribution,
    handlingSpeed,
    recentFeedbacks,
    loading,
    error,
  } = useSelector((state) => state.dashboard);

  // Tính toán date range mặc định (5 tháng gần nhất)
  const getDefaultDateRange = () => {
    const today = new Date();
    const fiveMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 5, 1);

    return {
      from: fiveMonthsAgo.toISOString().split("T")[0],
      to: today.toISOString().split("T")[0],
    };
  };

  const [dateRange, setDateRange] = useState(getDefaultDateRange());

  useEffect(() => {
    // Load thống kê tổng quan
    dispatch(fetchOverviewStats());
  }, [dispatch]);

  useEffect(() => {
    // Load dữ liệu biểu đồ theo date range
    const params = {
      from: dateRange.from,
      to: dateRange.to,
      order: "asc",
    };

    dispatch(fetchFeedbacksByMonth(params));
    dispatch(fetchFeedbackTypes(params));
    dispatch(fetchPriorityDistribution(params));
    dispatch(fetchHandlingSpeed(params));

    // Load recent feedbacks (10 items đầu tiên)
    dispatch(fetchRecentFeedbacks({ page_size: 10, page: 1 }));
  }, [dispatch, dateRange]);

  if (loading && !overviewStats) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <>
      {/* Header */}
      <Typography align="center" className="text-lg font-bold" sx={{ mb: 2 }}>
        Dashboard Quản Trị
      </Typography>
      <Box sx={{ height: 50, mb: 0 }} />
      <Box sx={{ transform: "scale(0.7)", transformOrigin: "top center" }}>
        {/* Thống kê */}
        <Grid
          container
          spacing={6}
          columns={{ xs: 12, sm: 12, md: 12, lg: 15 }}
          justifyContent="center"
        >
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <StatCard
              title="Tổng phản hồi"
              value={overviewStats?.total_feedbacks || 0}
              icon={<AssignmentIcon className="h-8 w-8 text-blue-600" />}
              color="text-blue-600"
              subtitle="Tất cả phản hồi"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <StatCard
              title="Phản hồi mới"
              value={overviewStats?.pending_feedbacks || 0}
              icon={<ScheduleIcon className="h-8 w-8 text-orange-600" />}
              color="text-orange-600"
              subtitle="Chưa xử lý"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <StatCard
              title="Đang xử lý"
              value={overviewStats?.processing_feedbacks || 0}
              icon={<TrendingUpIcon className="h-8 w-8 text-blue-600" />}
              color="text-blue-600"
              subtitle="Đang được xử lý"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <StatCard
              title="Đã giải quyết"
              value={overviewStats?.resolved_feedbacks || 0}
              icon={<CheckCircleIcon className="h-8 w-8 text-green-600" />}
              color="text-green-600"
              subtitle="Hoàn thành"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <StatCard
              title="Khẩn cấp"
              value={overviewStats?.high_priority_pending_feedbacks || 0}
              icon={<CancelIcon className="h-8 w-8 text-red-600" />}
              color="text-red-600"
              subtitle="Cần xử lý ngay"
            />
          </Grid>
        </Grid>
        <Box sx={{ height: 50, mb: 0 }} />
        {/* Biểu đồ đầu tiên - Line Chart và Pie Chart */}
        <Grid
          container
          spacing={1}
          sx={{ mb: 6 }}
          columns={{ xs: 12, sm: 12, md: 12, lg: 15 }}
          justifyContent="center"
        >
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <LineChartWithSlider
              data={feedbacksByMonth}
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <PieChartCard title="Loại phản hồi" data={feedbackTypes} />
          </Grid>
        </Grid>
        {/* Khoảng cách giữa 2 hàng chart */}
        <Box sx={{ height: 50, mb: 0 }} />

        {/* Biểu đồ thứ hai - Area Chart và Donut Chart */}
        <Grid
          container
          spacing={1}
          sx={{ mb: 6 }}
          columns={{ xs: 12, sm: 12, md: 12, lg: 15 }}
          justifyContent="center"
        >
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <ProcessingSpeedAreaChart
              data={handlingSpeed}
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <PriorityDonutChart
              data={priorityDistribution}
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
            />
          </Grid>
        </Grid>
        <Box sx={{ height: 50, mb: 0 }} />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <RecentFeedbackTable feedbacks={recentFeedbacks?.data || []} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

import React from "react";
import { Typography, Grid, Box } from "@mui/material";

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
import { getRecentFeedbacks, getDashboardStats } from "@/metadata/DashboardMockData";

export default function AdminDashboardPage() {
  // Lấy dữ liệu thống kê từ DashboardMockData
  const stats = React.useMemo(() => getDashboardStats(), []);

  // Lấy top 10 phản hồi gần đây
  const recentFeedbacks = React.useMemo(() => getRecentFeedbacks(10), []);

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
              value={stats.total}
              icon={<AssignmentIcon className="h-8 w-8 text-blue-600" />}
              color="text-blue-600"
              subtitle="Tất cả phản hồi"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <StatCard
              title="Phản hồi mới"
              value={stats.new}
              icon={<ScheduleIcon className="h-8 w-8 text-orange-600" />}
              color="text-orange-600"
              subtitle="Chưa xử lý"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <StatCard
              title="Đang xử lý"
              value={stats.inProgress}
              icon={<TrendingUpIcon className="h-8 w-8 text-blue-600" />}
              color="text-blue-600"
              subtitle="Đang được xử lý"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <StatCard
              title="Đã giải quyết"
              value={stats.resolved}
              icon={<CheckCircleIcon className="h-8 w-8 text-green-600" />}
              color="text-green-600"
              subtitle="Hoàn thành"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <StatCard
              title="Khẩn cấp"
              value={stats.urgent}
              icon={<CancelIcon className="h-8 w-8 text-red-600" />}
              color="text-red-600"
              subtitle="Cần xử lý ngay"
            />
          </Grid>
        </Grid>
        <Box sx={{ height: 50, mb: 0 }} />
          {/* Biểu đồ đầu tiên - Line Chart và Pie Chart */}
        <Grid container spacing={1} sx={{ mb: 6 }} columns={{ xs: 12, sm: 12, md: 12, lg: 15 }} justifyContent="center">
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <LineChartWithSlider />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <PieChartCard
              title="Loại phản hồi"
              data={[
                { id: "bug", label: "Báo lỗi", value: stats.bug },
                { id: "featureRequest", label: "Yêu cầu tính năng", value: stats.featureRequest },
                { id: "ui", label: "Giao diện", value: stats.ui },
                { id: "other", label: "Khác", value: stats.other },
              ]}
            />
          </Grid>
        </Grid>
        {/* Khoảng cách giữa 2 hàng chart */}
        <Box sx={{ height: 50, mb: 0 }} />

        {/* Biểu đồ thứ hai - Area Chart và Donut Chart */}
        <Grid container spacing={1} sx={{ mb: 6 }} columns={{ xs: 12, sm: 12, md: 12, lg: 15 }} justifyContent="center">
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <ProcessingSpeedAreaChart />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <PriorityDonutChart />
          </Grid>
        </Grid>
        <Box sx={{ height: 50, mb: 0 }} />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <RecentFeedbackTable feedbacks={recentFeedbacks} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

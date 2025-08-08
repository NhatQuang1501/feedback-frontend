import React from "react";
import { Typography, Paper, Grid, Card, CardContent, LinearProgress, Chip } from "@mui/material";
import {
  TrendingUp as TrendingUpIcon,
  Assignment as AssignmentIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { getAllFeedbacksWithDetails } from "@/metadata/QuangMockData";

const AdminDashboardPage = () => {
  // Lấy dữ liệu và tính toán thống kê
  const feedbacksWithDetails = getAllFeedbacksWithDetails();

  const stats = {
    total: feedbacksWithDetails.length,
    pending: feedbacksWithDetails.filter((f) => f.status?.name === "pending").length,
    processing: feedbacksWithDetails.filter((f) => f.status?.name === "processing").length,
    resolved: feedbacksWithDetails.filter((f) => f.status?.name === "resolved").length,
    closed: feedbacksWithDetails.filter((f) => f.status?.name === "closed").length,
    highPriority: feedbacksWithDetails.filter((f) => f.priority?.name === "high").length,
  };

  const recentFeedbacks = feedbacksWithDetails
    .sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at))
    .slice(0, 5);

  const StatCard = ({ title, value, icon, color, subtitle }) => (
    <Card className="h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <Typography variant="h6" className="mb-2 font-semibold text-gray-700">
              {title}
            </Typography>
            <Typography variant="h3" className={`font-bold ${color}`}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" className="mt-1 text-gray-500">
                {subtitle}
              </Typography>
            )}
          </div>
          <div
            className={`rounded-full p-3 ${color.replace("text-", "bg-").replace("600", "100")}`}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <Typography variant="h4" className="mb-2 font-bold text-gray-900">
          Dashboard Quản Trị
        </Typography>
        <Typography variant="body1" className="text-gray-600">
          Tổng quan về tình trạng phản hồi và hoạt động hệ thống
        </Typography>
      </div>

      {/* Statistics Cards */}
      <Grid container spacing={3} className="mb-8">
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard
            title="Tổng phản hồi"
            value={stats.total}
            icon={<AssignmentIcon className="h-8 w-8 text-blue-600" />}
            color="text-blue-600"
            subtitle="Tất cả phản hồi"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard
            title="Chờ xử lý"
            value={stats.pending}
            icon={<ScheduleIcon className="h-8 w-8 text-yellow-600" />}
            color="text-yellow-600"
            subtitle="Cần xử lý ngay"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard
            title="Đang xử lý"
            value={stats.processing}
            icon={<TrendingUpIcon className="h-8 w-8 text-blue-600" />}
            color="text-blue-600"
            subtitle="Đang được xử lý"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard
            title="Đã giải quyết"
            value={stats.resolved}
            icon={<CheckCircleIcon className="h-8 w-8 text-green-600" />}
            color="text-green-600"
            subtitle="Hoàn thành"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard
            title="Ưu tiên cao"
            value={stats.highPriority}
            icon={<CancelIcon className="h-8 w-8 text-red-600" />}
            color="text-red-600"
            subtitle="Cần ưu tiên"
          />
        </Grid>
      </Grid>

      {/* Progress Charts */}
      <Grid container spacing={3} className="mb-8">
        <Grid item xs={12} md={6}>
          <Paper className="p-6">
            <Typography variant="h6" className="mb-4 font-semibold">
              Tiến độ xử lý
            </Typography>
            <div className="space-y-4">
              <div>
                <div className="mb-1 flex justify-between">
                  <span className="text-sm text-gray-600">Đã giải quyết</span>
                  <span className="text-sm font-medium">
                    {Math.round((stats.resolved / stats.total) * 100)}%
                  </span>
                </div>
                <LinearProgress
                  variant="determinate"
                  value={(stats.resolved / stats.total) * 100}
                  className="h-2 rounded-full bg-gray-200"
                />
              </div>
              <div>
                <div className="mb-1 flex justify-between">
                  <span className="text-sm text-gray-600">Đang xử lý</span>
                  <span className="text-sm font-medium">
                    {Math.round((stats.processing / stats.total) * 100)}%
                  </span>
                </div>
                <LinearProgress
                  variant="determinate"
                  value={(stats.processing / stats.total) * 100}
                  className="h-2 rounded-full bg-gray-200"
                />
              </div>
              <div>
                <div className="mb-1 flex justify-between">
                  <span className="text-sm text-gray-600">Chờ xử lý</span>
                  <span className="text-sm font-medium">
                    {Math.round((stats.pending / stats.total) * 100)}%
                  </span>
                </div>
                <LinearProgress
                  variant="determinate"
                  value={(stats.pending / stats.total) * 100}
                  className="h-2 rounded-full bg-gray-200"
                />
              </div>
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className="p-6">
            <Typography variant="h6" className="mb-4 font-semibold">
              Phản hồi mới nhất
            </Typography>
            <div className="space-y-3">
              {recentFeedbacks.map((feedback) => (
                <div
                  key={feedback.feedback_id}
                  className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                >
                  <div className="flex-1">
                    <Typography variant="body2" className="truncate font-medium text-gray-900">
                      {feedback.title}
                    </Typography>
                    <Typography variant="caption" className="text-gray-500">
                      {feedback.user?.full_name} -{" "}
                      {new Date(feedback.submitted_at).toLocaleDateString("vi-VN")}
                    </Typography>
                  </div>
                  <div className="flex gap-2">
                    <Chip
                      size="small"
                      label={feedback.status?.description}
                      className={`${getStatusColor(feedback.status?.name)} font-medium`}
                    />
                    <Chip
                      size="small"
                      label={feedback.priority?.description}
                      className={`${getPriorityColor(feedback.priority?.name)} font-medium`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Paper>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Paper className="p-6">
        <Typography variant="h6" className="mb-4 font-semibold">
          Thao tác nhanh
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Card className="cursor-pointer p-4 text-center transition-all duration-200 hover:shadow-lg">
              <AssignmentIcon className="mx-auto mb-2 h-12 w-12 text-blue-600" />
              <Typography variant="body2" className="font-medium">
                Xem tất cả phản hồi
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className="cursor-pointer p-4 text-center transition-all duration-200 hover:shadow-lg">
              <ScheduleIcon className="mx-auto mb-2 h-12 w-12 text-yellow-600" />
              <Typography variant="body2" className="font-medium">
                Phản hồi chờ xử lý
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className="cursor-pointer p-4 text-center transition-all duration-200 hover:shadow-lg">
              <TrendingUpIcon className="mx-auto mb-2 h-12 w-12 text-green-600" />
              <Typography variant="body2" className="font-medium">
                Báo cáo thống kê
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className="cursor-pointer p-4 text-center transition-all duration-200 hover:shadow-lg">
              <CheckCircleIcon className="mx-auto mb-2 h-12 w-12 text-purple-600" />
              <Typography variant="body2" className="font-medium">
                Cài đặt hệ thống
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default AdminDashboardPage;

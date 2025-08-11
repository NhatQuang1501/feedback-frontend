import React, { useMemo, useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Slider, Chip, Stack } from "@mui/material";
import { PriorityHigh as PriorityIcon, TrendingUp as TrendingIcon } from "@mui/icons-material";
import { PieChart } from "@mui/x-charts/PieChart";
import { getAllDashboardFeedbacksWithDetails } from "@/metadata/DashboardMockData";

export default function PriorityDonutChart() {
  const [timeRange, setTimeRange] = useState([0, 0]);

  // Lấy tất cả feedback và sắp xếp theo thời gian
  const allFeedbacks = useMemo(() => {
    const feedbacks = getAllDashboardFeedbacksWithDetails();
    return feedbacks
      .filter((f) => f.submitted_at)
      .sort((a, b) => new Date(a.submitted_at) - new Date(b.submitted_at));
  }, []);

  // Tạo timeline data theo tháng từ sớm nhất đến muộn nhất
  const timelineData = useMemo(() => {
    if (allFeedbacks.length === 0) return [];

    const monthlyData = new Map();

    allFeedbacks.forEach((feedback) => {
      const date = new Date(feedback.submitted_at);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      const monthLabel = `${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;

      if (!monthlyData.has(monthKey)) {
        monthlyData.set(monthKey, {
          key: monthKey,
          label: monthLabel,
          date: new Date(date.getFullYear(), date.getMonth(), 1),
        });
      }
    });

    return Array.from(monthlyData.values()).sort((a, b) => a.date - b.date);
  }, [allFeedbacks]);

  // Set initial range to show all data
  useEffect(() => {
    if (timelineData.length > 0) {
      setTimeRange([0, timelineData.length - 1]);
    }
  }, [timelineData]);

  // Filtered data based on slider range
  const filteredFeedbacks = useMemo(() => {
    if (timelineData.length === 0) return allFeedbacks;

    const startDate = timelineData[timeRange[0]]?.date;
    const endDate = timelineData[timeRange[1]]?.date;

    if (!startDate || !endDate) return allFeedbacks;

    return allFeedbacks.filter((feedback) => {
      const feedbackDate = new Date(feedback.submitted_at);
      return feedbackDate >= startDate && feedbackDate <= endDate;
    });
  }, [allFeedbacks, timelineData, timeRange]);

  // Tính toán phân bố theo độ ưu tiên
  const priorityData = useMemo(() => {
    const priorityStats = {
      urgent: { count: 0, label: "Khẩn cấp", color: "#d32f2f" },
      high: { count: 0, label: "Cao", color: "#ed6c02" },
      medium: { count: 0, label: "Trung bình", color: "#1976d2" },
      low: { count: 0, label: "Thấp", color: "#2e7d32" },
    };

    filteredFeedbacks.forEach((feedback) => {
      const priorityName = feedback.priority?.name?.toLowerCase();
      if (priorityName === "urgent") priorityStats.urgent.count++;
      else if (priorityName === "high") priorityStats.high.count++;
      else if (priorityName === "medium") priorityStats.medium.count++;
      else if (priorityName === "low") priorityStats.low.count++;
    });

    const total = Object.values(priorityStats).reduce((sum, stat) => sum + stat.count, 0);

    return {
      data: Object.entries(priorityStats)
        .filter(([_, stat]) => stat.count > 0)
        .map(([key, stat]) => ({
          id: key,
          label: `${stat.label} (${stat.count})`,
          value: stat.count,
          color: stat.color,
          percentage: total > 0 ? ((stat.count / total) * 100).toFixed(1) : 0,
        })),
      total,
    };
  }, [filteredFeedbacks]);

  // Chart data for MUI X Charts
  const chartData = useMemo(() => {
    return priorityData.data.map((item) => ({
      id: item.id,
      label: item.label.split(" (")[0], // Chỉ lấy phần text trước dấu ngoặc
      value: item.value,
    }));
  }, [priorityData.data]);

  const colors = useMemo(() => {
    return priorityData.data.map((item) => item.color);
  }, [priorityData.data]);

  // Slider marks
  const sliderMarks = useMemo(() => {
    if (timelineData.length === 0) return [];

    if (timelineData.length <= 4) {
      return timelineData.map((item, index) => ({
        value: index,
        label: item.label,
      }));
    }

    const marks = [];
    marks.push({
      value: 0,
      label: timelineData[0].label,
    });

    if (timelineData.length > 6) {
      const step = Math.floor(timelineData.length / 4);
      for (let i = step; i < timelineData.length - step; i += step) {
        marks.push({
          value: i,
          label: timelineData[i].label,
        });
      }
    } else {
      const middleIndex = Math.floor(timelineData.length / 2);
      marks.push({
        value: middleIndex,
        label: timelineData[middleIndex].label,
      });
    }

    marks.push({
      value: timelineData.length - 1,
      label: timelineData[timelineData.length - 1].label,
    });

    return marks;
  }, [timelineData]);

  const sliderMarksNoLabel = useMemo(
    () => sliderMarks.map((m) => ({ value: m.value })),
    [sliderMarks],
  );

  const handleRangeChange = (event, newValue) => {
    setTimeRange(newValue);
  };

  // Get date range info
  const dateRangeInfo = useMemo(() => {
    if (timelineData.length === 0) {
      return { start: "", end: "", total: 0 };
    }

    const start = timelineData[timeRange[0]]?.label || "";
    const end = timelineData[timeRange[1]]?.label || "";

    return { start, end, total: priorityData.total };
  }, [timelineData, timeRange, priorityData.total]);

  // Dimensions
  const chartWidth = 644;
  const chartHeight = 400;
  const sliderWidth = 600;

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography align="center" sx={{ fontSize: "1rem", fontWeight: "bold", mb: 2 }}>
          Phân bố theo mức độ ưu tiên
        </Typography>

        {/* Priority Stats */}
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 2, gap: 3 }}
        >
          <Chip
            icon={<PriorityIcon />}
            label={`${dateRangeInfo.start} - ${dateRangeInfo.end}`}
            variant="outlined"
            size="small"
          />
        </Stack>

        {/* Chart */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          {chartData.length > 0 ? (
            <PieChart
              series={[
                {
                  data: chartData,
                  innerRadius: 80,
                  paddingAngle: 2,
                  cornerRadius: 4,
                },
              ]}
              width={chartWidth}
              height={chartHeight}
              colors={colors}
              margin={{ top: 10, right: 10, bottom: 64, left: 10 }}
              slotProps={{
                legend: {
                  direction: "row",
                  position: { vertical: "bottom", horizontal: "middle" },
                },
                tooltip: {
                  sx: {
                    "& .MuiChartsTooltip-title": {
                      fontSize: 14,
                      fontWeight: 700,
                    },
                    "& .MuiChartsTooltip-content": { fontSize: 13 },
                  },
                },
              }}
              sx={{
                "& .MuiChartsLegend-label": { fontSize: 13 },
              }}
            />
          ) : (
            <Box
              sx={{
                width: chartWidth,
                height: chartHeight,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "text.secondary",
              }}
            >
              <Typography>Không có dữ liệu để hiển thị</Typography>
            </Box>
          )}
        </Box>

        {/* Priority Summary */}
        {priorityData.data.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2, textAlign: "center", fontWeight: 500 }}
            >
              📊 Tổng quan mức độ ưu tiên
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                gap: 1,
                maxWidth: chartWidth,
                mx: "auto",
              }}
            >
              {priorityData.data.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    border: `2px solid ${item.color}`,
                    backgroundColor: `${item.color}10`,
                    textAlign: "center",
                  }}
                >
                  <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                    {item.label.split(" (")[0]}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: item.color }}>
                    {item.count}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    {item.percentage}%
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* Time Range Slider */}
        {timelineData.length > 1 && (
          <Box sx={{ pb: 2 }}>
            {/* Slider Header */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 3,
                gap: 1,
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                📅 Khoảng thời gian
              </Typography>
            </Box>

            {/* Slider Container */}
            <Box
              sx={{
                width: "100%",
                maxWidth: chartWidth,
                mx: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              {/* Enhanced Slider */}
              <Box
                sx={{
                  position: "relative",
                  width: sliderWidth,
                  maxWidth: "100%",
                  py: 2,
                }}
              >
                <Slider
                  value={timeRange}
                  onChange={handleRangeChange}
                  valueLabelDisplay="off"
                  marks={sliderMarksNoLabel}
                  min={0}
                  max={Math.max(0, timelineData.length - 1)}
                  step={1}
                  sx={{
                    height: 12,
                    "& .MuiSlider-track": {
                      height: 8,
                      background: "linear-gradient(90deg, #d32f2f 0%, #ed6c02 50%, #1976d2 100%)",
                      border: "none",
                      borderRadius: 4,
                    },
                    "& .MuiSlider-rail": {
                      height: 8,
                      backgroundColor: "#fff3e0",
                      opacity: 1,
                      borderRadius: 4,
                      border: "1px solid #ffcc02",
                    },
                    "& .MuiSlider-thumb": {
                      width: 24,
                      height: 24,
                      backgroundColor: "#d32f2f",
                      border: "4px solid #fff",
                      boxShadow: "0 4px 12px rgba(211, 47, 47, 0.4)",
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        boxShadow: "0 6px 16px rgba(211, 47, 47, 0.5)",
                        transform: "scale(1.15)",
                      },
                      "&:focus, &.Mui-active": {
                        boxShadow: "0 6px 16px rgba(211, 47, 47, 0.5)",
                        transform: "scale(1.1)",
                      },
                    },
                    "& .MuiSlider-mark": {
                      backgroundColor: "#d32f2f",
                      height: 8,
                      width: 2,
                      borderRadius: 1,
                    },
                  }}
                />
              </Box>

              {/* Enhanced Range Info */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "linear-gradient(135deg, #fff3e0 0%, #ffebee 100%)",
                  padding: "16px 20px",
                  borderRadius: "12px",
                  border: "2px solid #ffcc02",
                  width: sliderWidth,
                  maxWidth: "100%",
                  boxShadow: "0 2px 8px rgba(211, 47, 47, 0.1)",
                }}
              >
                <Box sx={{ textAlign: "left" }}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      display: "block",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      fontSize: "0.75rem",
                    }}
                  >
                    Từ tháng
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 700,
                      color: "#d32f2f",
                      fontSize: "1rem",
                    }}
                  >
                    {timelineData[timeRange[0]]?.label}
                  </Typography>
                </Box>

                <Box sx={{ textAlign: "right" }}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      display: "block",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      fontSize: "0.75rem",
                    }}
                  >
                    Đến tháng
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 700,
                      color: "#d32f2f",
                      fontSize: "1rem",
                    }}
                  >
                    {timelineData[timeRange[1]]?.label}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

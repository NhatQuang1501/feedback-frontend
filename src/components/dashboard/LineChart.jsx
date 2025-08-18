import React, { useMemo, useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Slider, Chip, Stack, Divider } from "@mui/material";
import { CalendarToday as CalendarIcon, TrendingUp as TrendingIcon } from "@mui/icons-material";
import { LineChart } from "@mui/x-charts/LineChart";
import { getAllDashboardFeedbacksWithDetails } from "@/metadata/DashboardMockData";

export default function LineChartWithSlider() {
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
          value: 0,
          date: new Date(date.getFullYear(), date.getMonth(), 1),
        });
      }

      monthlyData.get(monthKey).value++;
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
  const filteredData = useMemo(() => {
    if (timelineData.length === 0) return [];

    const startIndex = Math.max(0, timeRange[0]);
    const endIndex = Math.min(timelineData.length - 1, timeRange[1]);

    return timelineData.slice(startIndex, endIndex + 1);
  }, [timelineData, timeRange]);

  // Chart data for MUI X Charts
  const chartData = useMemo(() => {
    return {
      xAxisData: filteredData.map((item) => item.label),
      seriesData: filteredData.map((item) => item.value),
    };
  }, [filteredData]);

  // Slider marks with labels (for logic only)
  const sliderMarks = useMemo(() => {
    if (timelineData.length === 0) return [];

    if (timelineData.length <= 4) {
      return timelineData.map((item, index) => ({
        value: index,
        label: item.label,
      }));
    }

    const marks = [];

    // Always show first mark
    marks.push({
      value: 0,
      label: timelineData[0].label,
    });

    // Show middle marks with good spacing
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

    // Always show last mark
    marks.push({
      value: timelineData.length - 1,
      label: timelineData[timelineData.length - 1].label,
    });

    return marks;
  }, [timelineData]);

  // Remove labels from marks so slider does not show any time text under the rail
  const sliderMarksNoLabel = useMemo(
    () => sliderMarks.map((m) => ({ value: m.value })),
    [sliderMarks],
  );

  const handleRangeChange = (event, newValue) => {
    setTimeRange(newValue);
  };

  // Get date range info
  const dateRangeInfo = useMemo(() => {
    if (timelineData.length === 0 || filteredData.length === 0) {
      return { start: "", end: "", total: 0 };
    }

    const start = filteredData[0].label;
    const end = filteredData[filteredData.length - 1].label;
    const total = filteredData.reduce((sum, item) => sum + item.value, 0);

    return { start, end, total };
  }, [filteredData, timelineData]);

  // Dimensions
  const chartWidth = 1060;
  const chartHeight = 350;

  // Make slider shorter than the chart (centered). Adjust this to taste.
  const sliderWidth = 900;

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography align="center" sx={{ fontSize: "1rem", fontWeight: "bold", mb: 2 }}>
          Xu hướng phản hồi theo thời gian
        </Typography>

        {/* Date Range Info */}
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 2, gap: 3 }}
        >
          <Chip
            icon={<CalendarIcon />}
            label={`${dateRangeInfo.start} - ${dateRangeInfo.end}`}
            variant="outlined"
            size="small"
          />
          <Chip
            label={`${dateRangeInfo.total} phản hồi`}
            color="primary"
            size="small"
            variant="filled"
            sx={{
              fontSize: "0.8rem",
              minWidth: 120,
              fontWeight: 700,
            }}
          />
        </Stack>

        {/* Chart */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          {chartData.xAxisData.length > 0 ? (
            <LineChart
              width={chartWidth}
              height={chartHeight}
              xAxis={[
                {
                  scaleType: "point",
                  data: chartData.xAxisData,
                  tickLabelStyle: {
                    fontSize: 11,
                    fill: "#666",
                  },
                },
              ]}
              series={[
                {
                  data: chartData.seriesData,
                  color: "#1976d2",
                  curve: "linear",
                  showMark: true,
                  markSize: 6,
                },
              ]}
              yAxis={[
                {
                  tickLabelStyle: {
                    fontSize: 11,
                    fill: "#666",
                  },
                },
              ]}
              grid={{ horizontal: true, vertical: false }}
              sx={{
                "& .MuiLineElement-root": {
                  strokeWidth: 3,
                },
                "& .MuiMarkElement-root": {
                  fill: "#1976d2",
                  stroke: "#fff",
                  strokeWidth: 2,
                },
                "& .MuiChartsAxis-line": {
                  stroke: "#e0e0e0",
                },
                "& .MuiChartsAxis-tick": {
                  stroke: "#e0e0e0",
                },
              }}
              margin={{ left: 20, right: 80, top: 20, bottom: 20 }}
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

        {/* Time Range Slider */}
        {timelineData.length > 1 && (
          <Box sx={{ pb: 2 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 3,
                display: "block",
                textAlign: "center",
                fontWeight: 500,
                fontSize: "0.875rem",
              }}
            >
              📅 Chọn khoảng thời gian hiển thị
            </Typography>

            {/* Outer container matches chart width and centers its children */}
            <Box
              sx={{
                width: "100%",
                maxWidth: chartWidth,
                mx: "auto",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {/* Slider container: narrower than chart and centered by flex */}
              <Box
                sx={{
                  position: "relative",
                  mb: 4,
                  width: sliderWidth,
                  maxWidth: "100%",
                }}
              >
                <Slider
                  value={timeRange}
                  onChange={handleRangeChange}
                  // Turn off the bubble value label on the slider
                  valueLabelDisplay="off"
                  // Remove time text under marks by passing marks without 'label'
                  marks={sliderMarksNoLabel}
                  min={0}
                  max={Math.max(0, timelineData.length - 1)}
                  step={1}
                  sx={{
                    height: 8,
                    "& .MuiSlider-track": {
                      height: 6,
                      background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
                      border: "none",
                    },
                    "& .MuiSlider-rail": {
                      height: 6,
                      backgroundColor: "#e3f2fd",
                      opacity: 1,
                    },
                    "& .MuiSlider-thumb": {
                      width: 20,
                      height: 20,
                      backgroundColor: "#1976d2",
                      border: "3px solid #fff",
                      boxShadow: "0 2px 8px rgba(25, 118, 210, 0.3)",
                      "&:hover": {
                        boxShadow: "0 4px 12px rgba(25, 118, 210, 0.4)",
                        transform: "scale(1.1)",
                      },
                      "&:focus, &:hover, &.Mui-active": {
                        boxShadow: "0 4px 12px rgba(25, 118, 210, 0.4)",
                      },
                    },
                    // No need to style valueLabel or markLabel since they're hidden
                  }}
                />
              </Box>
            </Box>

            {/* Range Info aligned to the exact slider width and centered */}
            <Box
              sx={{
                width: "100%",
                maxWidth: chartWidth,
                mx: "auto",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#f8f9fa",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "1px solid #e9ecef",
                  width: sliderWidth,
                  maxWidth: "100%",
                }}
              >
                <Box sx={{ textAlign: "left" }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                    Từ ngày
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: "#1976d2" }}>
                    {timelineData[timeRange[0]]?.label}
                  </Typography>
                </Box>

                <Box sx={{ textAlign: "right" }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                    Đến ngày
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: "#1976d2" }}>
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

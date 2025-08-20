import React, { useMemo, useState, useEffect, useRef } from "react";
import { Box, Typography, Card, CardContent, Slider, Chip, Stack, Divider } from "@mui/material";
import { Speed as SpeedIcon, TrendingUp as TrendingIcon } from "@mui/icons-material";
import { LineChart } from "@mui/x-charts/LineChart";
import useContainerWidth from "@/hooks/useContainerWidth";

export default function ProcessingSpeedAreaChart({ data = [], dateRange, onDateRangeChange }) {
  const [timeRange, setTimeRange] = useState([0, 0]);
  const wrapperRef = useRef(null);
  const containerWidth = useContainerWidth(wrapperRef);

  const processingSpeedData = useMemo(() => {
    if (data.length === 0) return [];

    return data.map((item, index) => ({
      month: item.month,
      avgProcessingTime: item.avg_days,
      total: 0,
      resolved: 0,
      inProgress: 0,
      new: 0,
      date: new Date(item.month.split("/").reverse().join("-") + "-01"),
    }));
  }, [data]);

  const timelineData = useMemo(() => {
    if (processingSpeedData.length === 0) return [];

    const monthlyData = new Map();

    processingSpeedData.forEach((item) => {
      const date = new Date(item.month.split("/").reverse().join("-") + "-01");
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      const monthLabel = item.month;

      if (!monthlyData.has(monthKey)) {
        monthlyData.set(monthKey, {
          key: monthKey,
          label: monthLabel,
          date: date,
        });
      }
    });

    return Array.from(monthlyData.values()).sort((a, b) => a.date - b.date);
  }, [processingSpeedData]);

  useEffect(() => {
    if (timelineData.length > 0) {
      setTimeRange([0, timelineData.length - 1]);
    }
  }, [timelineData]);

  const filteredData = useMemo(() => {
    if (timelineData.length === 0) return processingSpeedData;

    const startDate = timelineData[timeRange[0]]?.date;
    const endDate = timelineData[timeRange[1]]?.date;

    if (!startDate || !endDate) return processingSpeedData;

    return processingSpeedData.filter((item) => {
      const itemDate = new Date(item.month.split("/").reverse().join("-") + "-01");
      return itemDate >= startDate && itemDate <= endDate;
    });
  }, [processingSpeedData, timelineData, timeRange]);

  // Chart data for MUI X Charts
  const chartData = useMemo(() => {
    if (filteredData.length === 0) return { xAxisData: [], seriesData: [] };

    return {
      xAxisData: filteredData.map((item) => item.month),
      seriesData: filteredData.map((item) => item.avgProcessingTime),
      resolvedData: filteredData.map((item) =>
        item.total > 0 ? Math.round((item.resolved / item.total) * 100) : 0,
      ),
    };
  }, [filteredData]);

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
      return { start: "", end: "", total: 0, avgSpeed: 0 };
    }

    const start = timelineData[timeRange[0]]?.label || "";
    const end = timelineData[timeRange[1]]?.label || "";
    const total = processingSpeedData.reduce((sum, item) => sum + item.total, 0);
    const avgSpeed =
      processingSpeedData.length > 0
        ? Math.round(
            (processingSpeedData.reduce((sum, item) => sum + item.avgProcessingTime, 0) /
              processingSpeedData.length) *
              10,
          ) / 10
        : 0;

    return { start, end, total, avgSpeed };
  }, [timelineData, timeRange, processingSpeedData]);

  const chartWidth = 820;
  const chartHeight = 350;
  const sliderWidth = 600;

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography align="center" sx={{ fontSize: "1rem", fontWeight: "bold", mb: 2 }}>
          Tốc độ xử lý phản hồi
        </Typography>

        {/* Processing Stats */}
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 2, gap: 3 }}
        >
          <Chip
            icon={<SpeedIcon />}
            label={`${dateRangeInfo.start} - ${dateRangeInfo.end}`}
            variant="outlined"
            size="small"
          />
          <Chip
            label={`${dateRangeInfo.avgSpeed} ngày TB`}
            color="success"
            size="small"
            variant="filled"
            sx={{
              fontSize: "0.8rem",
              minWidth: 100,
              fontWeight: 600,
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
                  color: "#4caf50",
                  curve: "linear",
                  area: true,
                  showMark: true,
                  markSize: 6,
                  label: "Thời gian xử lý TB (ngày)",
                },
              ]}
              yAxis={[
                {
                  tickLabelStyle: {
                    fontSize: 11,
                    fill: "#666",
                  },
                  label: "Ngày",
                  labelStyle: {
                    fontSize: 12,
                    fill: "#666",
                  },
                },
              ]}
              grid={{ horizontal: true, vertical: false }}
              sx={{
                "& .MuiAreaElement-root": {
                  fill: "url(#areaGradient)",
                  opacity: 0.8,
                },
                "& .MuiMarkElement-root": {
                  fill: "#4caf50",
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
              margin={{ left: 60, right: 20, top: 20, bottom: 50 }}
            >
              <defs>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4caf50" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#4caf50" stopOpacity={0.1} />
                </linearGradient>
              </defs>
            </LineChart>
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

        {/* Processing Summary */}
        {processingSpeedData.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2, textAlign: "center", fontWeight: 500 }}
            >
              Tổng quan hiệu suất xử lý
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: 2,
                maxWidth: chartWidth,
                mx: "auto",
              }}
            >
              {processingSpeedData.slice(-3).map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: "2px solid #e8f5e8",
                    backgroundColor: "#f8fff8",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                    {item.month}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "#4caf50" }}>
                    {item.avgProcessingTime} ngày
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    {item.resolved}/{item.total} đã xử lý
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
                Khoảng thời gian
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
                    "height": 12,
                    "& .MuiSlider-track": {
                      height: 8,
                      background: "linear-gradient(90deg, #4caf50 0%, #66bb6a 50%, #81c784 100%)",
                      border: "none",
                      borderRadius: 4,
                    },
                    "& .MuiSlider-rail": {
                      height: 8,
                      backgroundColor: "#f1f8e9",
                      opacity: 1,
                      borderRadius: 4,
                      border: "1px solid #c8e6c9",
                    },
                    "& .MuiSlider-thumb": {
                      "width": 24,
                      "height": 24,
                      "backgroundColor": "#4caf50",
                      "border": "4px solid #fff",
                      "boxShadow": "0 4px 12px rgba(76, 175, 80, 0.4)",
                      "transition": "all 0.2s ease-in-out",
                      "&:hover": {
                        boxShadow: "0 6px 16px rgba(76, 175, 80, 0.5)",
                        transform: "scale(1.15)",
                      },
                      "&:focus, &.Mui-active": {
                        boxShadow: "0 6px 16px rgba(76, 175, 80, 0.5)",
                        transform: "scale(1.1)",
                      },
                    },
                    "& .MuiSlider-mark": {
                      backgroundColor: "#4caf50",
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
                  background: "linear-gradient(135deg, #f1f8e9 0%, #e8f5e8 100%)",
                  padding: "16px 20px",
                  borderRadius: "12px",
                  border: "2px solid #c8e6c9",
                  width: sliderWidth,
                  maxWidth: "100%",
                  boxShadow: "0 2px 8px rgba(76, 175, 80, 0.1)",
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
                      color: "#4caf50",
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
                      color: "#4caf50",
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

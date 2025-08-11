import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

export default function PieChartCard({ title, data }) {
  const chartWidth = 644;
  const chartHeight = 400;

  // Visual tuning
  const legendFontSize = 13;
  const innerRadius = 50;
  const paddingAngle = 2;
  const cornerRadius = 4;

  const colors = [
    "#1976d2",
    "#2e7d32",
    "#ed6c02",
    "#d32f2f",
    "#9c27b0",
    "#0097a7",
    "#7cb342",
    "#8d6e63",
  ];

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ flex: 1 }}>
        <Typography align="center" sx={{ fontSize: "1.2rem", fontWeight: "bold", mb: 2 }}>
          {title}
        </Typography>

        {/* Container keeps the chart centered in the card */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: chartHeight,
            width: "100%",
          }}
        >
          <PieChart
            series={[
              {
                data,
                innerRadius,
                paddingAngle,
                cornerRadius,
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
              "& .MuiChartsLegend-label": { fontSize: legendFontSize },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

PieChartCard.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
      value: PropTypes.number,
    }),
  ).isRequired,
};

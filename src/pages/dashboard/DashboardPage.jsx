import React from "react";
import { Typography, Paper, Grid } from "@mui/material";

const DashboardPage = () => {
  return (
    <div>
      <Typography variant="h4" component="h1" className="mb-6 font-bold">
        Dashboard
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper className="p-4">
            <Typography variant="h6" className="mb-3">
              Thống kê phản hồi
            </Typography>
            <Typography variant="body1">Chưa có dữ liệu thống kê</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className="p-4">
            <Typography variant="h6" className="mb-3">
              Phản hồi gần đây
            </Typography>
            <Typography variant="body1">Chưa có phản hồi gần đây</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardPage;

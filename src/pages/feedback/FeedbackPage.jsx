import React from "react";
import FeedbackForm from "@/components/feedback/FeedbackForm";
import { Container, Paper, Typography } from "@mui/material";

const FeedbackPage = () => {
  return (
    <div className="from-primary-light via-background-default to-secondary-light/10 min-h-screen bg-gradient-to-br py-16">
      {/* Header decoration */}
      <div className="bg-primary-main/30 absolute inset-x-0 top-0 h-20"></div>

      <Container maxWidth="lg" className="relative z-10">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <Typography
              variant="h3"
              component="h1"
              align="center"
              className="text-primary-main text-shadow mb-2 font-bold"
            >
              Hệ Thống Phản Hồi
            </Typography>
            <Typography variant="subtitle1" align="center" className="mb-4 text-gray-600">
              Chúng tôi luôn lắng nghe ý kiến của bạn
            </Typography>
            <div className="bg-primary-main mx-auto mb-8 h-1 w-24 rounded-full"></div>
          </div>

          <Paper
            elevation={6}
            className="border-primary-light/30 overflow-hidden rounded-2xl border"
          >
            <FeedbackForm />
          </Paper>
        </div>
      </Container>
    </div>
  );
};

export default FeedbackPage;

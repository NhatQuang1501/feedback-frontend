import React from "react";
import FeedbackForm from "@/components/feedback/FeedbackForm";
import { Paper, Typography } from "@mui/material";

const FeedbackPage = () => {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-8 text-center">
        <Typography
          variant="h3"
          component="h1"
          align="center"
          className="text-primary-main text-shadow mb-2 text-[1.75rem] leading-tight font-bold sm:text-[2.25rem] md:text-[2.75rem]"
        >
          FeedbackHub
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          className="mx-auto mb-3 max-w-xl text-[0.9rem] leading-relaxed text-gray-600 sm:text-[1rem]"
        >
          Chúng tôi luôn lắng nghe ý kiến của bạn để cải thiện dịch vụ tốt hơn
        </Typography>
        <div className="bg-primary-main mx-auto mb-6 h-1 w-16 rounded-full"></div>
      </div>

      <Paper
        elevation={6}
        className="border-primary-light/30 overflow-hidden rounded-2xl border bg-gradient-to-br from-white to-[#fffef7] shadow-lg transition-all duration-300 ease-in-out"
      >
        <FeedbackForm />
      </Paper>
    </div>
  );
};

export default FeedbackPage;

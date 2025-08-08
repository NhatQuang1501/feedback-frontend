import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, Paper, Divider } from "@mui/material";
import FeedbackDetailHeader from "./FeedbackDetailHeader";
import FeedbackStatusActions from "./FeedbackStatusActions";
import FeedbackContent from "./FeedbackContent";
import FeedbackActions from "./FeedbackActions";

const FeedbackDetail = ({
  feedback,
  onReply,
  onStatusChange,
  onDelete,
  loading,
  isAdmin = false,
}) => {
  if (loading) {
    return (
      <Paper className="p-4">
        <Box className="animate-pulse space-y-4">
          <Box className="h-8 w-3/4 rounded bg-gray-200"></Box>
          <Box className="h-4 w-1/2 rounded bg-gray-200"></Box>
          <Box className="h-24 rounded bg-gray-200"></Box>
        </Box>
      </Paper>
    );
  }

  if (!feedback) {
    return (
      <Paper className="p-4">
        <Typography variant="h6" className="text-gray-600">
          Không tìm thấy phản hồi
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className="overflow-hidden rounded-xl shadow-md">
      {/* Header */}
      <Box className="bg-amber-50 px-4 py-3">
        <Box className="flex flex-col gap-4 md:flex-row md:gap-4">
          <FeedbackDetailHeader feedback={feedback} />

          {/* Chỉ hiển thị nút trạng thái nếu là admin */}
          {isAdmin && <FeedbackStatusActions feedback={feedback} onStatusChange={onStatusChange} />}
        </Box>
      </Box>

      <Divider />

      {/* Content */}
      <Box className="p-4">
        <FeedbackContent feedback={feedback} />

        {/* Actions */}
        <Box className="mt-8">
          <Divider className="mb-6" />
          <FeedbackActions
            feedbackId={feedback.feedback_id}
            onDelete={onDelete}
            onReply={onReply}
            isAdmin={isAdmin}
          />
        </Box>
      </Box>
    </Paper>
  );
};

FeedbackDetail.propTypes = {
  feedback: PropTypes.shape({
    feedback_id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    submitted_at: PropTypes.string.isRequired,
    type: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    priority: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    status: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    user: PropTypes.shape({
      full_name: PropTypes.string,
      email: PropTypes.string,
      role: PropTypes.string,
    }),
    attachments: PropTypes.array,
  }),
  onReply: PropTypes.func,
  onStatusChange: PropTypes.func,
  onDelete: PropTypes.func,
  loading: PropTypes.bool,
  isAdmin: PropTypes.bool,
};

export default FeedbackDetail;

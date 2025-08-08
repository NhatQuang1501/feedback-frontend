import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, Paper } from "@mui/material";

const FeedbackComments = ({ comments, loading }) => {
  if (loading) {
    return (
      <Box className="space-y-4">
        <Box className="animate-pulse space-y-2">
          <Box className="h-10 w-1/4 rounded bg-gray-200"></Box>
          <Box className="h-24 rounded bg-gray-200"></Box>
        </Box>
        <Box className="animate-pulse space-y-2">
          <Box className="h-10 w-1/4 rounded bg-gray-200"></Box>
          <Box className="h-16 rounded bg-gray-200"></Box>
        </Box>
      </Box>
    );
  }

  if (!comments || comments.length === 0) {
    return (
      <Paper elevation={0} className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
        <Typography variant="body1" className="text-gray-600">
          Chưa có phản hồi nào
        </Typography>
      </Paper>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <Box className="space-y-6">
      <Typography variant="h6" className="font-bold text-gray-900">
        Phản hồi ({comments.length})
      </Typography>

      {comments.map((comment) => (
        <Paper
          key={comment.id}
          elevation={0}
          className="rounded-lg border border-gray-200 bg-white p-4"
        >
          <Box className="mb-2 flex items-center justify-between">
            <Box className="flex items-center gap-3">
              <Box>
                <Typography variant="subtitle2" className="font-semibold text-gray-900">
                  {comment.user.full_name}
                  {comment.user.role === "admin" && (
                    <span className="ml-2 rounded bg-amber-100 px-2 py-0.5 text-xs text-amber-800">
                      Quản trị viên
                    </span>
                  )}
                </Typography>
                <Typography variant="caption" className="text-gray-500">
                  {formatDate(comment.created_at)}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Typography variant="body2" className="whitespace-pre-line text-gray-800">
            {comment.content}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};

FeedbackComments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      user: PropTypes.shape({
        full_name: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ),
  loading: PropTypes.bool,
};

export default FeedbackComments;

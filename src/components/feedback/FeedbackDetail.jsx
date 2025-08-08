import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, Paper, Grid, Divider, Avatar, Button } from "@mui/material";
import {
  AccessTime as AccessTimeIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Reply as ReplyIcon,
} from "@mui/icons-material";
import { TypeBadge, PriorityBadge, StatusBadge } from "@/utils/customBadge";
import FileAttachmentList from "./FileAttachmentList";

const FeedbackDetail = ({ feedback, onReply, loading }) => {
  if (loading) {
    return (
      <Paper className="p-6">
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
      <Paper className="p-6">
        <Typography variant="h6" className="text-gray-600">
          Không tìm thấy phản hồi
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
    <Paper className="overflow-hidden rounded-xl shadow-md">
      {/* Header */}
      <Box className="bg-amber-50 p-6">
        <Typography variant="h5" className="mb-2 font-bold text-gray-900">
          {feedback.title}
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Box className="flex items-center gap-1 text-gray-600">
              <AccessTimeIcon fontSize="small" />
              <Typography variant="body2">{formatDate(feedback.submitted_at)}</Typography>
            </Box>
          </Grid>
          <Grid item>
            <TypeBadge type={feedback.type?.name} />
          </Grid>
          <Grid item>
            <PriorityBadge priority={feedback.priority?.name} />
          </Grid>
          <Grid item>
            <StatusBadge status={feedback.status?.name} />
          </Grid>
        </Grid>
      </Box>

      <Divider />

      {/* User Info */}
      <Box className="p-6">
        <Box className="mb-6 flex items-center gap-4">
          <Avatar className="h-14 w-14 bg-amber-600 text-xl">
            {feedback.user?.full_name?.charAt(0) || "U"}
          </Avatar>
          <Box>
            <Typography variant="h6" className="font-semibold text-gray-900">
              {feedback.user?.full_name || "Người dùng ẩn danh"}
            </Typography>
            <Box className="flex flex-wrap items-center gap-x-4 gap-y-1 text-gray-600">
              <Box className="flex items-center gap-1">
                <PersonIcon fontSize="small" />
                <Typography variant="body2">
                  {feedback.user?.role === "admin" ? "Quản trị viên" : "Người dùng"}
                </Typography>
              </Box>
              {feedback.user?.email && (
                <Box className="flex items-center gap-1">
                  <EmailIcon fontSize="small" />
                  <Typography variant="body2">{feedback.user.email}</Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>

        {/* Content */}
        <Box className="mb-6">
          <Typography variant="subtitle1" className="mb-2 font-semibold text-gray-800">
            Nội dung phản hồi:
          </Typography>
          <Paper elevation={0} className="rounded-lg bg-gray-50 p-4">
            <Typography variant="body1" className="whitespace-pre-line text-gray-800">
              {feedback.content}
            </Typography>
          </Paper>
        </Box>

        {/* Attachments */}
        {feedback.attachments && feedback.attachments.length > 0 && (
          <Box className="mb-6">
            <Typography variant="subtitle1" className="mb-2 font-semibold text-gray-800">
              Tệp đính kèm:
            </Typography>
            <FileAttachmentList attachments={feedback.attachments} />
          </Box>
        )}

        {/* Actions */}
        <Box className="mt-8 flex justify-end gap-3">
          <Button
            variant="outlined"
            className="border-amber-600 text-amber-600 hover:border-amber-700 hover:bg-amber-50"
            onClick={() => window.history.back()}
          >
            Quay lại
          </Button>
          <Button
            variant="contained"
            startIcon={<ReplyIcon />}
            className="bg-amber-500 text-white hover:bg-amber-600"
            onClick={onReply}
          >
            Phản hồi
          </Button>
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
  onReply: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default FeedbackDetail;

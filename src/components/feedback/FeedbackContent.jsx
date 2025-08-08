import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, Paper } from "@mui/material";
import { Person as PersonIcon, Email as EmailIcon } from "@mui/icons-material";
import FileAttachmentList from "./FileAttachmentList";

const FeedbackContent = ({ feedback }) => {
  return (
    <>
      {/* User Info */}
      <Box className="mb-6 rounded-lg bg-gray-50 p-4">
        <Typography variant="subtitle1" className="mb-2 font-semibold text-gray-800">
          Thông tin người gửi:
        </Typography>
        <Box className="flex flex-col gap-2 sm:flex-row sm:gap-4">
          <Box className="flex items-center gap-2">
            <PersonIcon fontSize="small" className="text-gray-600" />
            <Typography variant="body2" className="font-medium text-gray-800">
              {feedback.user?.full_name || "Người dùng ẩn danh"}
            </Typography>
          </Box>
          {feedback.user?.email && (
            <Box className="flex items-center gap-2">
              <EmailIcon fontSize="small" className="text-gray-600" />
              <Typography variant="body2" className="text-gray-800">
                {feedback.user.email}
              </Typography>
            </Box>
          )}
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
    </>
  );
};

FeedbackContent.propTypes = {
  feedback: PropTypes.shape({
    content: PropTypes.string.isRequired,
    user: PropTypes.shape({
      full_name: PropTypes.string,
      email: PropTypes.string,
    }),
    attachments: PropTypes.array,
  }).isRequired,
};

export default FeedbackContent;

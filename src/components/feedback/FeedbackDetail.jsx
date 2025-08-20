import React from "react";
import PropTypes from "prop-types";
import { Paper, Box, Divider } from "@mui/material";
import FeedbackDetailHeader from "./FeedbackDetailHeader";
import FileAttachmentList from "./FileAttachmentList";
import FeedbackContent from "./FeedbackContent";
import FeedbackActions from "./FeedbackActions";

const FeedbackDetail = ({
  feedback,
  loading,
  onReply,
  onStatusChange,
  onDelete,
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
        <div className="text-gray-600">Không tìm thấy phản hồi</div>
      </Paper>
    );
  }

  return (
    <Paper className="overflow-hidden rounded-xl border border-gray-100 shadow-md">
      <Box className="bg-amber-50 px-6 py-5">
        <FeedbackDetailHeader
          feedback={feedback}
          isAdmin={isAdmin}
          onStatusChange={onStatusChange}
        />
      </Box>
      <Divider />
      <Box className="p-6">
        <div>
          <Paper elevation={0} className="mb-6 border border-gray-100 bg-gray-50 p-4">
            <FeedbackContent feedback={feedback} />
          </Paper>
        </div>
        {feedback.attachments && feedback.attachments.length > 0 && (
          <div className="mt-6">
            <div className="mb-3 font-semibold text-gray-900">Tệp đính kèm</div>
            <FileAttachmentList attachments={feedback.attachments} />
          </div>
        )}
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
  feedback: PropTypes.object,
  loading: PropTypes.bool,
  onReply: PropTypes.func,
  onStatusChange: PropTypes.func,
  onDelete: PropTypes.func,
  isAdmin: PropTypes.bool,
};

export default FeedbackDetail;

import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import Button from "@/components/common/Button";

const FeedbackActions = ({ feedbackId, onDelete, onReply, isAdmin = false }) => {
  return (
    <Box className="flex justify-end gap-2">
      {isAdmin && onDelete && (
        <Button
          variant="danger"
          size="medium"
          startIcon={<DeleteIcon />}
          onClick={() => onDelete(feedbackId)}
        >
          Xóa phản hồi
        </Button>
      )}
      {onReply && (
        <Button variant="primary" size="medium" onClick={() => onReply()}>
          Phản hồi
        </Button>
      )}
    </Box>
  );
};

FeedbackActions.propTypes = {
  feedbackId: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  onReply: PropTypes.func,
  isAdmin: PropTypes.bool,
};

export default FeedbackActions;

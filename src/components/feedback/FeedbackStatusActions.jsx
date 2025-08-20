import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import {
  ArrowForward as ArrowForwardIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import Button from "@/components/common/Button";

const FeedbackStatusActions = ({ feedback, onStatusChange }) => {
  if (!onStatusChange) return null;

  return (
    <Box className="flex flex-col gap-2 md:mr-2 md:ml-4 md:w-[180px]">
      {feedback.status?.name !== "processing" && (
        <Button
          variant="outlined"
          size="medium"
          startIcon={<ArrowForwardIcon />}
          onClick={() => onStatusChange("processing")}
          className="w-full rounded-xl border-blue-500 text-base font-semibold text-blue-500 normal-case transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-blue-600 hover:bg-blue-50 hover:shadow-md"
        >
          Đang xử lý
        </Button>
      )}
      {feedback.status?.name !== "resolved" && (
        <Button
          variant="outlined"
          size="medium"
          startIcon={<CheckCircleIcon />}
          onClick={() => onStatusChange("resolved")}
          className="w-full rounded-xl border-green-500 text-base font-semibold text-green-500 normal-case transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-green-600 hover:bg-green-50 hover:shadow-md"
        >
          Đã giải quyết
        </Button>
      )}
      {feedback.status?.name !== "closed" && (
        <Button
          variant="outlined"
          size="medium"
          startIcon={<CancelIcon />}
          onClick={() => onStatusChange("closed")}
          className="w-full rounded-xl border-gray-500 text-base font-semibold text-gray-500 normal-case transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-gray-600 hover:bg-gray-50 hover:shadow-md"
        >
          Đóng phản hồi
        </Button>
      )}
    </Box>
  );
};

FeedbackStatusActions.propTypes = {
  feedback: PropTypes.shape({
    status: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onStatusChange: PropTypes.func,
};

export default FeedbackStatusActions;

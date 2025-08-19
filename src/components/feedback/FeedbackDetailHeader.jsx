import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Typography, Avatar, CircularProgress } from "@mui/material";
import {
  AccessTime as AccessTimeIcon,
  Email as EmailIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import { TypeBadge, PriorityBadge, StatusBadge } from "@/components/common/CustomBadge";
import { getTypeInfo, getPriorityInfo, getStatusInfo } from "@/utils/constants";
import { formatDate } from "@/utils/formatters";
import Button from "@/components/common/Button";
import { feedbackApi } from "@/api/feedbackApi";

const STATUS = {
  pending: { id: 1, name: "pending", display: "Chờ xử lý" },
  processing: { id: 2, name: "processing", display: "Đang xử lý" },
  resolved: { id: 3, name: "resolved", display: "Đã xử lý" },
};

const FeedbackDetailHeader = ({ feedback, isAdmin, onStatusChange }) => {
  const [loading, setLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(feedback.status_display);

  // Xác định trạng thái hiện tại dựa vào state nội bộ (cho phép cập nhật ngay không cần reload)
  const statusName = getStatusInfo(currentStatus).value;

  let nextStatus = null;
  if (statusName === "pending") nextStatus = STATUS.processing;
  if (statusName === "processing") nextStatus = STATUS.resolved;

  const handleChangeStatus = async () => {
    if (!nextStatus) return;
    try {
      setLoading(true);
      await feedbackApi.updateFeedbackStatus(feedback.feedback_id, nextStatus.id);

      // Cập nhật state nội bộ thay vì reload trang
      setCurrentStatus(nextStatus.display);

      // Gọi callback (có thể dùng để hiển thị toast, không cần reload data)
      if (onStatusChange) {
        onStatusChange(nextStatus.name);
      }
    } catch (e) {
      console.error("Error updating feedback status:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="flex flex-col gap-6 py-2 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-6">
        <Avatar className="bg-blue-100 text-blue-700" sx={{ width: 64, height: 64, fontSize: 32 }}>
          {feedback.user_full_name?.[0] || "?"}
        </Avatar>
        <div>
          <Typography variant="h4" className="mb-3 leading-snug font-bold text-gray-900">
            {feedback.title}
          </Typography>
          <div className="mb-3 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">Loại:</span>
              <TypeBadge
                type={getTypeInfo(feedback.type_display).value}
                className="px-3 py-1 text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">Ưu tiên:</span>
              <PriorityBadge
                priority={getPriorityInfo(feedback.priority_display).value}
                className="px-3 py-1 text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">Trạng thái:</span>
              <StatusBadge
                status={getStatusInfo(currentStatus).value}
                className="px-3 py-1 text-sm"
              />
            </div>
          </div>
          <Typography variant="body1" className="mb-1 text-gray-700">
            Gửi bởi: <span className="font-semibold text-gray-900">{feedback.user_full_name}</span>
          </Typography>
          {feedback.user_email && (
            <Typography variant="body2" className="mb-2 flex items-center text-gray-500">
              <EmailIcon fontSize="inherit" className="mr-1" />
              {feedback.user_email}
            </Typography>
          )}
          <Typography variant="body2" className="flex items-center text-gray-600">
            <AccessTimeIcon fontSize="small" className="mr-1" />
            {formatDate(feedback.created_at)}
          </Typography>
        </div>
      </div>

      {/* Status Action Buttons */}
      {isAdmin && (
        <div className="mt-4 flex justify-end md:mt-0">
          {statusName === "resolved" ? (
            <Button
              variant="success"
              size="medium"
              disabled
              className="min-w-[180px] py-2 text-base opacity-80"
              startIcon={<CheckCircleIcon />}
            >
              Đã xử lý
            </Button>
          ) : nextStatus ? (
            <Button
              variant={nextStatus.id === 2 ? "primary" : "success"}
              size="medium"
              onClick={handleChangeStatus}
              disabled={loading}
              className="min-w-[180px] py-2 text-base"
            >
              {loading ? <CircularProgress size={20} color="inherit" /> : <>{nextStatus.display}</>}
            </Button>
          ) : null}
        </div>
      )}
    </Box>
  );
};

FeedbackDetailHeader.propTypes = {
  feedback: PropTypes.shape({
    feedback_id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    type_display: PropTypes.string,
    priority_display: PropTypes.string,
    status_display: PropTypes.string,
    user_full_name: PropTypes.string,
    user_email: PropTypes.string,
  }).isRequired,
  isAdmin: PropTypes.bool,
  onStatusChange: PropTypes.func,
};

export default FeedbackDetailHeader;

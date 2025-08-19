import React from "react";
import PropTypes from "prop-types";
import Badge from "@/components/common/Badge";
import { FEEDBACK_TYPES, PRIORITY_LEVELS, FEEDBACK_STATUS } from "@/utils/constants";

// Màu sắc cho các loại badge
const COLORS = {
  // Loại phản hồi
  TYPE: {
    suggestion: "#8b5cf6", // Tím
    bug: "#ef4444", // Đỏ
    other: "#6b7280", // Xám
  },
  // Mức độ ưu tiên
  PRIORITY: {
    high: "#ef4444", // Đỏ
    medium: "#c7a84b", // Vàng
    low: "#4b5563", // Xám
  },
  // Trạng thái
  STATUS: {
    pending: "#fbbf24", // Vàng sáng
    processing: "#3b82f6", // Xanh dương
    resolved: "#16a34a", // Xanh lá
  },
};

// Màu mặc định nếu không tìm thấy
const DEFAULT_COLOR = "#6b7280"; // Xám

// Badge cho loại phản hồi
export const TypeBadge = ({ type }) => {
  const color = COLORS.TYPE[type] || DEFAULT_COLOR;
  const label = FEEDBACK_TYPES.find((item) => item.value === type)?.label || type;

  return (
    <Badge variant="secondary" color={color}>
      {label}
    </Badge>
  );
};

// Badge cho mức độ ưu tiên
export const PriorityBadge = ({ priority }) => {
  const color = COLORS.PRIORITY[priority] || DEFAULT_COLOR;
  const label = PRIORITY_LEVELS.find((item) => item.value === priority)?.label || priority;

  return (
    <Badge variant="secondary" color={color}>
      {label}
    </Badge>
  );
};

// Badge cho trạng thái
export const StatusBadge = ({ status }) => {
  const color = COLORS.STATUS[status] || DEFAULT_COLOR;
  const label = FEEDBACK_STATUS.find((item) => item.value === status)?.label || status;

  return (
    <Badge variant="secondary" color={color}>
      {label}
    </Badge>
  );
};

// PropTypes
TypeBadge.propTypes = {
  type: PropTypes.string,
};

PriorityBadge.propTypes = {
  priority: PropTypes.string,
};

StatusBadge.propTypes = {
  status: PropTypes.string,
};

export default {
  TypeBadge,
  PriorityBadge,
  StatusBadge,
};

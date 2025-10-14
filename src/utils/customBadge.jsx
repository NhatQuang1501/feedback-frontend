import React from "react";
import PropTypes from "prop-types";
import Badge from "@/components/common/Badge";
import {
  ArrowForward as ArrowForwardIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";

const COLORS = {
  TYPE: {
    feedback: "#8b5cf6",
    report: "#3b82f6",
    other: "#6b7280",
    default: "#6b7280",
  },
  PRIORITY: {
    high: "#ef4444",
    medium: "#c7a84b",
    low: "#16a34a",
    default: "#6b7280",
  },
  STATUS: {
    pending: "#c7a84b",
    processing: "#3b82f6",
    resolved: "#16a34a",
    closed: "#6b7280",
    default: "#6b7280",
  },
};

export const TypeBadge = ({ type }) => {
  const color = COLORS.TYPE[type] || COLORS.TYPE.default;

  let label = "Khác";
  if (type === "feedback") label = "Góp ý";
  else if (type === "report") label = "Báo lỗi";

  return (
    <Badge variant="secondary" color={color}>
      {label}
    </Badge>
  );
};

export const PriorityBadge = ({ priority }) => {
  const color = COLORS.PRIORITY[priority] || COLORS.PRIORITY.default;

  let label = "Không xác định";
  if (priority === "high") label = "Cao";
  else if (priority === "medium") label = "Trung bình";
  else if (priority === "low") label = "Thấp";

  return (
    <Badge variant="secondary" color={color}>
      {label}
    </Badge>
  );
};

export const StatusBadge = ({ status }) => {
  const color = COLORS.STATUS[status] || COLORS.STATUS.default;

  if (status === "pending") {
    return (
      <Badge variant="secondary" color={color}>
        Chờ xử lý
      </Badge>
    );
  } else if (status === "processing") {
    return (
      <Badge variant="secondary" color={color}>
        <>
          <ArrowForwardIcon className="mr-1 h-4 w-4" />
          Đang xử lý
        </>
      </Badge>
    );
  } else if (status === "resolved") {
    return (
      <Badge variant="secondary" color={color}>
        <>
          <CheckCircleIcon className="mr-1 h-4 w-4" />
          Đã giải quyết
        </>
      </Badge>
    );
  } else if (status === "closed") {
    return (
      <Badge variant="secondary" color={color}>
        <>
          <CancelIcon className="mr-1 h-4 w-4" />
          Đã đóng
        </>
      </Badge>
    );
  } else {
    return (
      <Badge variant="secondary" color={color}>
        {status || "Không xác định"}
      </Badge>
    );
  }
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

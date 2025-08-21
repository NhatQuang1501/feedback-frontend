import React from "react";
import PropTypes from "prop-types";
import Badge from "@/components/common/Badge";
import { FEEDBACK_TYPES, PRIORITY_LEVELS, FEEDBACK_STATUS } from "@/utils/constants";

const COLORS = {
  TYPE: {
    suggestion: "#8b5cf6",
    bug: "#ef4444",
    other: "#6b7280",
  },
  PRIORITY: {
    high: "#ef4444",
    medium: "#c7a84b",
    low: "#4b5563",
  },
  STATUS: {
    pending: "#fbbf24",
    processing: "#3b82f6",
    resolved: "#16a34a",
  },
};

const DEFAULT_COLOR = "#6b7280";

export const TypeBadge = ({ type }) => {
  const color = COLORS.TYPE[type] || DEFAULT_COLOR;
  const label = FEEDBACK_TYPES.find((item) => item.value === type)?.label || type;

  return (
    <Badge variant="secondary" color={color}>
      {label}
    </Badge>
  );
};

export const PriorityBadge = ({ priority }) => {
  const color = COLORS.PRIORITY[priority] || DEFAULT_COLOR;
  const label = PRIORITY_LEVELS.find((item) => item.value === priority)?.label || priority;

  return (
    <Badge variant="secondary" color={color}>
      {label}
    </Badge>
  );
};

export const StatusBadge = ({ status }) => {
  const color = COLORS.STATUS[status] || DEFAULT_COLOR;
  const label = FEEDBACK_STATUS.find((item) => item.value === status)?.label || status;

  return (
    <Badge variant="secondary" color={color}>
      {label}
    </Badge>
  );
};

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

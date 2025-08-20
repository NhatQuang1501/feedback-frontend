export const FEEDBACK_TYPES = [
  { value: "suggestion", label: "Góp ý", color: "suggestion" },
  { value: "bug", label: "Lỗi", color: "bug" },
  { value: "other", label: "Khác", color: "other" },
];

export const PRIORITY_LEVELS = [
  { value: "low", label: "Thấp", color: "low" },
  { value: "medium", label: "Trung bình", color: "medium" },
  { value: "high", label: "Cao", color: "high" },
];

export const FEEDBACK_STATUS = [
  { value: "pending", label: "Chờ xử lý", color: "pending" },
  { value: "processing", label: "Đang xử lý", color: "processing" },
  { value: "resolved", label: "Đã xử lý", color: "resolved" },
];

export const SORT_OPTIONS = [
  { value: "newest", label: "Mới nhất" },
  { value: "oldest", label: "Cũ nhất" },
];

export const ITEMS_PER_PAGE = 10;

export const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "application/pdf",
  "text/plain",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Value mapping
export const getTypeInfo = (typeDisplay) => {
  const mapping = {
    "Góp ý": "suggestion",
    "Lỗi": "bug",
    "Khác": "other",
  };

  const value = mapping[typeDisplay] || typeDisplay;
  return (
    FEEDBACK_TYPES.find((type) => type.value === value) || {
      value,
      label: typeDisplay,
      color: "default",
    }
  );
};

export const getPriorityInfo = (priorityDisplay) => {
  const mapping = {
    "Thấp": "low",
    "Trung bình": "medium",
    "Cao": "high",
  };

  const value = mapping[priorityDisplay] || priorityDisplay;
  return (
    PRIORITY_LEVELS.find((priority) => priority.value === value) || {
      value,
      label: priorityDisplay,
      color: "default",
    }
  );
};

export const getStatusInfo = (statusDisplay) => {
  const mapping = {
    "Chờ xử lý": "pending",
    "Đang xử lý": "processing",
    "Đã xử lý": "resolved",
  };

  const value = mapping[statusDisplay] || statusDisplay;
  return (
    FEEDBACK_STATUS.find((status) => status.value === value) || {
      value,
      label: statusDisplay,
      color: "default",
    }
  );
};

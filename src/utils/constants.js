export const FEEDBACK_TYPES = [
  { value: "feedback", label: "Góp ý" },
  { value: "report", label: "Báo lỗi" },
  { value: "other", label: "Khác" },
];

export const PRIORITY_LEVELS = [
  { value: "low", label: "Thấp" },
  { value: "medium", label: "Trung bình" },
  { value: "high", label: "Cao" },
];

export const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "application/pdf",
  "text/plain",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Admin feedback status
export const FEEDBACK_STATUS = [
  { value: "pending", label: "Chờ xử lý", color: "status-pending" },
  { value: "processing", label: "Đang xử lý", color: "status-processing" },
  { value: "resolved", label: "Đã giải quyết", color: "status-resolved" },
  { value: "closed", label: "Đã đóng", color: "status-closed" },
];

// User roles
export const USER_ROLES = [
  { value: "user", label: "Người dùng" },
  { value: "admin", label: "Quản trị viên" },
];

// Admin settings
export const ITEMS_PER_PAGE = 10;

// Sort options for admin
export const SORT_OPTIONS = [
  { value: "submitted_at_desc", label: "Mới nhất" },
  { value: "submitted_at_asc", label: "Cũ nhất" },
];

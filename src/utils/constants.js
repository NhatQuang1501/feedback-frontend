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

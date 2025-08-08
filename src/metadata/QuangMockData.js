// Mock Users data
export const mockUsers = [
  {
    user_id: "550e8400-e29b-41d4-a716-446655440001",
    full_name: "Nguyễn Văn An",
    email: "nguyen.van.an@email.com",
    role_id: 2,
    created_at: "2024-01-15T08:30:00Z",
  },
  {
    user_id: "550e8400-e29b-41d4-a716-446655440002",
    full_name: "Trần Thị Bình",
    email: "tran.thi.binh@email.com",
    role_id: 2,
    created_at: "2024-01-20T10:15:00Z",
  },
  {
    user_id: "550e8400-e29b-41d4-a716-446655440003",
    full_name: "Admin User",
    email: "admin@feedbackhub.com",
    role_id: 1,
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    user_id: "550e8400-e29b-41d4-a716-446655440004",
    full_name: "Lê Văn Cường",
    email: "le.van.cuong@email.com",
    role_id: 2,
    created_at: "2024-02-01T14:20:00Z",
  },
  {
    user_id: "550e8400-e29b-41d4-a716-446655440005",
    full_name: "Phạm Thị Dung",
    email: "pham.thi.dung@email.com",
    role_id: 2,
    created_at: "2024-02-05T09:45:00Z",
  },
];

// Mock Roles data
export const mockRoles = [
  {
    role_id: 1,
    name: "admin",
    description: "Quản trị viên hệ thống",
  },
  {
    role_id: 2,
    name: "user",
    description: "Người dùng thông thường",
  },
];

// Mock Feedback Types
export const mockFeedbackTypes = [
  { type_id: 1, name: "feedback", description: "Góp ý chung" },
  { type_id: 2, name: "report", description: "Báo cáo lỗi" },
  { type_id: 3, name: "other", description: "Khác" },
];

// Mock Priorities
export const mockPriorities = [
  { priority_id: 1, name: "low", description: "Ưu tiên thấp" },
  { priority_id: 2, name: "medium", description: "Ưu tiên trung bình" },
  { priority_id: 3, name: "high", description: "Ưu tiên cao" },
];

// Mock Feedback Status
export const mockFeedbackStatus = [
  { status_id: 1, name: "pending", description: "Chờ xử lý" },
  { status_id: 2, name: "processing", description: "Đang xử lý" },
  { status_id: 3, name: "resolved", description: "Đã giải quyết" },
  { status_id: 4, name: "closed", description: "Đã đóng" },
];

// Mock Feedbacks data (50+ records for pagination testing)
export const mockFeedbacks = [
  {
    feedback_id: "fb-550e8400-e29b-41d4-a716-446655440001",
    user_id: "550e8400-e29b-41d4-a716-446655440001",
    type_id: 2,
    priority_id: 3,
    status_id: 1,
    title: "Lỗi không thể đăng nhập",
    content:
      "Tôi không thể đăng nhập vào hệ thống sau khi reset mật khẩu. Đã thử nhiều lần nhưng vẫn báo lỗi sai thông tin.",
    submitted_at: "2024-12-10T09:30:00Z",
  },
  {
    feedback_id: "fb-550e8400-e29b-41d4-a716-446655440002",
    user_id: "550e8400-e29b-41d4-a716-446655440002",
    type_id: 1,
    priority_id: 2,
    status_id: 2,
    title: "Cải thiện giao diện người dùng",
    content:
      "Giao diện hiện tại khá tốt nhưng tôi nghĩ nên thêm dark mode để dễ nhìn hơn vào ban đêm.",
    submitted_at: "2024-12-09T14:15:00Z",
  },
  {
    feedback_id: "fb-550e8400-e29b-41d4-a716-446655440003",
    user_id: "550e8400-e29b-41d4-a716-446655440004",
    type_id: 2,
    priority_id: 3,
    status_id: 3,
    title: "Lỗi hiển thị trên mobile",
    content: "Trên điện thoại, menu bị lỗi không hiển thị đầy đủ. Chỉ thấy được một phần.",
    submitted_at: "2024-12-08T16:45:00Z",
  },
  {
    feedback_id: "fb-550e8400-e29b-41d4-a716-446655440004",
    user_id: "550e8400-e29b-41d4-a716-446655440005",
    type_id: 1,
    priority_id: 1,
    status_id: 1,
    title: "Thêm tính năng xuất báo cáo",
    content: "Mong hệ thống có thể thêm tính năng xuất báo cáo PDF để tiện theo dõi.",
    submitted_at: "2024-12-07T11:20:00Z",
  },
  {
    feedback_id: "fb-550e8400-e29b-41d4-a716-446655440005",
    user_id: "550e8400-e29b-41d4-a716-446655440001",
    type_id: 3,
    priority_id: 2,
    status_id: 2,
    title: "Hỗ trợ upload file lớn hơn",
    content: "Hiện tại chỉ upload được file 5MB, mong có thể tăng lên 10MB hoặc 20MB.",
    submitted_at: "2024-12-06T13:50:00Z",
  },
  // Thêm nhiều dữ liệu hơn cho pagination testing
  {
    feedback_id: "fb-550e8400-e29b-41d4-a716-446655440006",
    user_id: "550e8400-e29b-41d4-a716-446655440002",
    type_id: 2,
    priority_id: 2,
    status_id: 4,
    title: "Lỗi tải trang chậm",
    content: "Trang web load rất chậm, đặc biệt là trang danh sách. Mong được cải thiện tốc độ.",
    submitted_at: "2024-12-05T08:30:00Z",
  },
  {
    feedback_id: "fb-550e8400-e29b-41d4-a716-446655440007",
    user_id: "550e8400-e29b-41d4-a716-446655440004",
    type_id: 1,
    priority_id: 1,
    status_id: 3,
    title: "Thêm notification cho user",
    content: "Nên có thông báo khi có phản hồi từ admin để user biết được tiến trình xử lý.",
    submitted_at: "2024-12-04T15:45:00Z",
  },
  {
    feedback_id: "fb-550e8400-e29b-41d4-a716-446655440008",
    user_id: "550e8400-e29b-41d4-a716-446655440005",
    type_id: 2,
    priority_id: 3,
    status_id: 1,
    title: "Lỗi submit form khi internet chậm",
    content: "Khi mạng chậm, form submit bị lỗi và mất hết dữ liệu đã nhập. Rất bất tiện.",
    submitted_at: "2024-12-03T10:15:00Z",
  },
  {
    feedback_id: "fb-550e8400-e29b-41d4-a716-446655440009",
    user_id: "550e8400-e29b-41d4-a716-446655440001",
    type_id: 1,
    priority_id: 2,
    status_id: 2,
    title: "Lỗi submit form khi internet chậm",
    content: "Khi mạng chậm, form submit bị lỗi và mất hết dữ liệu đã nhập. Rất bất tiện.",
    submitted_at: "2024-12-03T10:15:00Z",
  },
  {
    feedback_id: "fb-550e8400-e29b-41d4-a716-446655440010",
    user_id: "550e8400-e29b-41d4-a716-446655440002",
    type_id: 2,
    priority_id: 3,
    status_id: 1,
    title: "Lỗi submit form khi internet chậm",
    content: "Khi mạng chậm, form submit bị lỗi và mất hết dữ liệu đã nhập. Rất bất tiện.",
    submitted_at: "2024-12-03T10:15:00Z",
  },
  {
    feedback_id: "fb-550e8400-e29b-41d4-a716-446655440011",
    user_id: "550e8400-e29b-41d4-a716-446655440004",
    type_id: 1,
    priority_id: 2,
    status_id: 2,
    title: "Lỗi submit form khi internet chậm",
    content: "Khi mạng chậm, form submit bị lỗi và mất hết dữ liệu đã nhập. Rất bất tiện.",
    submitted_at: "2024-12-03T10:15:00Z",
  },
];

export const mockComments = [
  {
    id: "comment-1",
    content: "Cảm ơn bạn đã gửi phản hồi. Chúng tôi đang xem xét vấn đề này.",
    created_at: "2024-12-11T10:30:00Z",
    user: {
      full_name: "Admin User",
      role: "admin",
    },
  },
  {
    id: "comment-2",
    content: "Tôi vẫn gặp vấn đề này. Mong được hỗ trợ sớm.",
    created_at: "2024-12-12T08:45:00Z",
    user: {
      full_name: "Nguyễn Văn An",
      role: "user",
    },
  },
];

// Helper functions để join data
export const getFeedbackWithDetails = (feedbackId) => {
  const feedback = mockFeedbacks.find((f) => f.feedback_id === feedbackId);
  if (!feedback) return null;

  const user = mockUsers.find((u) => u.user_id === feedback.user_id);
  const type = mockFeedbackTypes.find((t) => t.type_id === feedback.type_id);
  const priority = mockPriorities.find((p) => p.priority_id === feedback.priority_id);
  const status = mockFeedbackStatus.find((s) => s.status_id === feedback.status_id);

  return {
    ...feedback,
    user: user || null,
    type: type || null,
    priority: priority || null,
    status: status || null,
  };
};

export const getAllFeedbacksWithDetails = () => {
  return mockFeedbacks.map((feedback) => getFeedbackWithDetails(feedback.feedback_id));
};

// Filter và search functions
export const filterFeedbacks = (feedbacks, filters) => {
  let filtered = [...feedbacks];

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (feedback) =>
        feedback.title.toLowerCase().includes(searchLower) ||
        feedback.content.toLowerCase().includes(searchLower) ||
        feedback.user?.full_name.toLowerCase().includes(searchLower) ||
        feedback.user?.email.toLowerCase().includes(searchLower),
    );
  }

  if (filters.type && filters.type !== "all") {
    filtered = filtered.filter((feedback) => feedback.type?.name === filters.type);
  }

  if (filters.priority && filters.priority !== "all") {
    filtered = filtered.filter((feedback) => feedback.priority?.name === filters.priority);
  }

  if (filters.status && filters.status !== "all") {
    filtered = filtered.filter((feedback) => feedback.status?.name === filters.status);
  }

  return filtered;
};

// Sort functions
export const sortFeedbacks = (feedbacks, sortBy) => {
  const sorted = [...feedbacks];

  switch (sortBy) {
    case "submitted_at_desc":
      return sorted.sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at));
    case "submitted_at_asc":
      return sorted.sort((a, b) => new Date(a.submitted_at) - new Date(b.submitted_at));
    case "priority_desc":
      return sorted.sort((a, b) => (b.priority?.priority_id || 0) - (a.priority?.priority_id || 0));
    case "priority_asc":
      return sorted.sort((a, b) => (a.priority?.priority_id || 0) - (b.priority?.priority_id || 0));
    default:
      return sorted;
  }
};

// Pagination helper
export const paginateFeedbacks = (feedbacks, page, itemsPerPage) => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return {
    data: feedbacks.slice(startIndex, endIndex),
    totalItems: feedbacks.length,
    totalPages: Math.ceil(feedbacks.length / itemsPerPage),
    currentPage: page,
    hasNextPage: endIndex < feedbacks.length,
    hasPrevPage: page > 1,
  };
};

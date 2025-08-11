// Dashboard Mock Data - Dữ liệu đa dạng và thực tế cho dashboard
// Dữ liệu này được tối ưu cho dashboard analytics và charts với xu hướng tự nhiên

// Mock Roles (theo DB schema)
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

// Mock Users (mở rộng cho dashboard)
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
  {
    user_id: "550e8400-e29b-41d4-a716-446655440006",
    full_name: "Hoàng Minh Tuấn",
    email: "hoang.minh.tuan@email.com",
    role_id: 2,
    created_at: "2024-03-10T16:20:00Z",
  },
  {
    user_id: "550e8400-e29b-41d4-a716-446655440007",
    full_name: "Vũ Thị Lan",
    email: "vu.thi.lan@email.com",
    role_id: 2,
    created_at: "2024-03-15T11:30:00Z",
  },
];

// Mock Feedback Types (theo DB schema)
export const mockFeedbackTypes = [
  { type_id: 1, name: "Bug", description: "Báo cáo lỗi hệ thống" },
  { type_id: 2, name: "Feature Request", description: "Yêu cầu tính năng mới" },
  { type_id: 3, name: "UI", description: "Góp ý về giao diện người dùng" },
  { type_id: 4, name: "Other", description: "Phản hồi khác" },
];

// Mock Priorities (theo DB schema với level)
export const mockPriorities = [
  { priority_id: 1, name: "Low", level: 1 },
  { priority_id: 2, name: "Medium", level: 2 },
  { priority_id: 3, name: "High", level: 3 },
  { priority_id: 4, name: "Urgent", level: 4 },
];

// Mock Feedback Status (theo DB schema)
export const mockFeedbackStatus = [
  { status_id: 1, name: "New", description: "Phản hồi mới" },
  { status_id: 2, name: "In Progress", description: "Đang xử lý" },
  { status_id: 3, name: "Resolved", description: "Đã giải quyết" },
  { status_id: 4, name: "Closed", description: "Đã đóng" },
];

// Mock Feedbacks - Dữ liệu đa dạng và thực tế (150+ records với xu hướng tự nhiên)
export const mockFeedbacks = [
  // ===== THÁNG 12/2024 - Cao điểm cuối năm (22 feedbacks) =====
  {
    feedback_id: "fb-001",
    user_id: "550e8400-e29b-41d4-a716-446655440001",
    type_id: 1, // Bug
    priority_id: 4, // Urgent
    status_id: 1, // New
    title: "Lỗi không thể đăng nhập sau khi reset password",
    content: "Sau khi reset mật khẩu, hệ thống không cho phép đăng nhập với mật khẩu mới.",
    submitted_at: "2024-12-15T09:30:00Z",
  },
  {
    feedback_id: "fb-002",
    user_id: "550e8400-e29b-41d4-a716-446655440002",
    type_id: 2, // Feature Request
    priority_id: 2, // Medium
    status_id: 2, // In Progress
    title: "Thêm tính năng dark mode",
    content: "Mong muốn có chế độ tối để sử dụng vào ban đêm dễ dàng hơn.",
    submitted_at: "2024-12-14T14:15:00Z",
  },
  {
    feedback_id: "fb-003",
    user_id: "550e8400-e29b-41d4-a716-446655440003",
    type_id: 3, // UI
    priority_id: 3, // High
    status_id: 3, // Resolved
    title: "Giao diện mobile không responsive",
    content: "Trên điện thoại, menu và form không hiển thị đúng tỷ lệ.",
    submitted_at: "2024-12-13T16:45:00Z",
  },
  {
    feedback_id: "fb-004",
    user_id: "550e8400-e29b-41d4-a716-446655440004",
    type_id: 1, // Bug
    priority_id: 3, // High
    status_id: 1, // New
    title: "Lỗi upload file lớn hơn 5MB",
    content: "Không thể upload file có kích thước lớn hơn 5MB, hệ thống báo lỗi.",
    submitted_at: "2024-12-12T13:50:00Z",
  },
  {
    feedback_id: "fb-005",
    user_id: "550e8400-e29b-41d4-a716-446655440005",
    type_id: 2, // Feature Request
    priority_id: 2, // Medium
    status_id: 2, // In Progress
    title: "Thêm tính năng export Excel",
    content: "Cần xuất dữ liệu ra file Excel để báo cáo.",
    submitted_at: "2024-12-11T10:20:00Z",
  },
  {
    feedback_id: "fb-006",
    user_id: "550e8400-e29b-41d4-a716-446655440006",
    type_id: 1, // Bug
    priority_id: 4, // Urgent
    status_id: 2, // In Progress
    title: "Hệ thống crash khi có nhiều user đồng thời",
    content: "Server bị quá tải khi có hơn 100 user truy cập cùng lúc.",
    submitted_at: "2024-12-10T08:15:00Z",
  },
  {
    feedback_id: "fb-007",
    user_id: "550e8400-e29b-41d4-a716-446655440007",
    type_id: 3, // UI
    priority_id: 1, // Low
    status_id: 4, // Closed
    title: "Cải thiện màu sắc theme",
    content: "Màu sắc hiện tại hơi nhạt, cần tươi sáng hơn.",
    submitted_at: "2024-12-09T15:30:00Z",
  },
  {
    feedback_id: "fb-008",
    user_id: "550e8400-e29b-41d4-a716-446655440001",
    type_id: 4, // Other
    priority_id: 2, // Medium
    status_id: 3, // Resolved
    title: "Đề xuất thêm FAQ section",
    content: "Nên có phần FAQ để người dùng tự tìm hiểu.",
    submitted_at: "2024-12-08T11:45:00Z",
  },
  {
    feedback_id: "fb-009",
    user_id: "550e8400-e29b-41d4-a716-446655440002",
    type_id: 1, // Bug
    priority_id: 3, // High
    status_id: 1, // New
    title: "Lỗi validation email không chính xác",
    content: "Form validation báo lỗi sai khi nhập email hợp lệ.",
    submitted_at: "2024-12-07T14:20:00Z",
  },
  {
    feedback_id: "fb-010",
    user_id: "550e8400-e29b-41d4-a716-446655440003",
    type_id: 2, // Feature Request
    priority_id: 1, // Low
    status_id: 1, // New
    title: "Thêm tính năng bookmark",
    content: "Cho phép người dùng bookmark các mục quan trọng.",
    submitted_at: "2024-12-06T09:10:00Z",
  },
  {
    feedback_id: "fb-011",
    user_id: "550e8400-e29b-41d4-a716-446655440004",
    type_id: 3, // UI
    priority_id: 2, // Medium
    status_id: 2, // In Progress
    title: "Cải thiện layout dashboard",
    content: "Dashboard hiện tại hơi rối, cần sắp xếp lại.",
    submitted_at: "2024-12-05T16:55:00Z",
  },
  {
    feedback_id: "fb-012",
    user_id: "550e8400-e29b-41d4-a716-446655440005",
    type_id: 1, // Bug
    priority_id: 2, // Medium
    status_id: 3, // Resolved
    title: "Lỗi hiển thị chart trên Safari",
    content: "Biểu đồ không hiển thị đúng trên Safari.",
    submitted_at: "2024-12-04T12:30:00Z",
  },
  {
    feedback_id: "fb-013",
    user_id: "550e8400-e29b-41d4-a716-446655440006",
    type_id: 4, // Other
    priority_id: 3, // High
    status_id: 1, // New
    title: "Yêu cầu tăng cường bảo mật",
    content: "Cần thêm các biện pháp bảo mật như 2FA.",
    submitted_at: "2024-12-03T07:45:00Z",
  },
  {
    feedback_id: "fb-014",
    user_id: "550e8400-e29b-41d4-a716-446655440007",
    type_id: 2, // Feature Request
    priority_id: 4, // Urgent
    status_id: 2, // In Progress
    title: "Thêm notification real-time",
    content: "Cần thông báo real-time khi có phản hồi từ admin.",
    submitted_at: "2024-12-02T13:20:00Z",
  },
  {
    feedback_id: "fb-015",
    user_id: "550e8400-e29b-41d4-a716-446655440001",
    type_id: 1, // Bug
    priority_id: 1, // Low
    status_id: 4, // Closed
    title: "Lỗi encoding tiếng Việt",
    content: "Một số ký tự tiếng Việt không hiển thị đúng.",
    submitted_at: "2024-12-01T18:10:00Z",
  },
  {
    feedback_id: "fb-016",
    user_id: "550e8400-e29b-41d4-a716-446655440002",
    type_id: 3, // UI
    priority_id: 2, // Medium
    status_id: 3, // Resolved
    title: "Cải thiện font chữ",
    content: "Font chữ hiện tại hơi khó đọc trên màn hình nhỏ.",
    submitted_at: "2024-12-01T10:25:00Z",
  },
  {
    feedback_id: "fb-017",
    user_id: "550e8400-e29b-41d4-a716-446655440003",
    type_id: 2, // Feature Request
    priority_id: 3, // High
    status_id: 1, // New
    title: "Thêm tính năng multi-language",
    content: "Hỗ trợ đa ngôn ngữ cho người dùng quốc tế.",
    submitted_at: "2024-12-01T08:40:00Z",
  },
  {
    feedback_id: "fb-018",
    user_id: "550e8400-e29b-41d4-a716-446655440004",
    type_id: 4, // Other
    priority_id: 1, // Low
    status_id: 2, // In Progress
    title: "Đề xuất thêm tutorial",
    content: "Nên có hướng dẫn sử dụng cho người dùng mới.",
    submitted_at: "2024-12-01T06:15:00Z",
  },
  {
    feedback_id: "fb-019",
    user_id: "550e8400-e29b-41d4-a716-446655440005",
    type_id: 1, // Bug
    priority_id: 2, // Medium
    status_id: 1, // New
    title: "Lỗi slow query trong database",
    content: "Một số query chạy rất chậm, ảnh hưởng performance.",
    submitted_at: "2024-12-01T04:30:00Z",
  },
  {
    feedback_id: "fb-020",
    user_id: "550e8400-e29b-41d4-a716-446655440006",
    type_id: 3, // UI
    priority_id: 3, // High
    status_id: 2, // In Progress
    title: "Redesign landing page",
    content: "Landing page cần thiết kế lại cho hiện đại hơn.",
    submitted_at: "2024-12-01T02:45:00Z",
  },
  {
    feedback_id: "fb-021",
    user_id: "550e8400-e29b-41d4-a716-446655440007",
    type_id: 2, // Feature Request
    priority_id: 2, // Medium
    status_id: 3, // Resolved
    title: "Thêm tính năng auto-save",
    content: "Tự động lưu draft khi user đang nhập form.",
    submitted_at: "2024-12-01T01:20:00Z",
  },
  {
    feedback_id: "fb-022",
    user_id: "550e8400-e29b-41d4-a716-446655440001",
    type_id: 4, // Other
    priority_id: 1, // Low
    status_id: 4, // Closed
    title: "Đề xuất thêm sitemap",
    content: "Cần tạo sitemap.xml cho SEO tốt hơn.",
    submitted_at: "2024-12-01T00:10:00Z",
  },

  // ===== THÁNG 11/2024 - Tăng trưởng mạnh (18 feedbacks) =====
  {
    feedback_id: "fb-023",
    user_id: "550e8400-e29b-41d4-a716-446655440002",
    type_id: 1, // Bug
    priority_id: 4, // Urgent
    status_id: 3, // Resolved
    title: "Lỗi mất session khi chuyển trang",
    content: "Phiên đăng nhập bị mất khi chuyển giữa các trang.",
    submitted_at: "2024-11-28T15:45:00Z",
  },
  {
    feedback_id: "fb-024",
    user_id: "550e8400-e29b-41d4-a716-446655440003",
    type_id: 2, // Feature Request
    priority_id: 2, // Medium
    status_id: 2, // In Progress
    title: "Thêm tính năng tìm kiếm nâng cao",
    content: "Cần tính năng tìm kiếm với nhiều filter hơn.",
    submitted_at: "2024-11-25T11:30:00Z",
  },
  {
    feedback_id: "fb-025",
    user_id: "550e8400-e29b-41d4-a716-446655440004",
    type_id: 3, // UI
    priority_id: 1, // Low
    status_id: 4, // Closed
    title: "Cải thiện spacing giữa các elements",
    content: "Khoảng cách giữa các thành phần UI hơi chật.",
    submitted_at: "2024-11-22T09:15:00Z",
  },
  {
    feedback_id: "fb-026",
    user_id: "550e8400-e29b-41d4-a716-446655440005",
    type_id: 1, // Bug
    priority_id: 3, // High
    status_id: 1, // New
    title: "Lỗi crash khi upload nhiều file",
    content: "Hệ thống bị crash khi upload nhiều hơn 3 file cùng lúc.",
    submitted_at: "2024-11-20T14:20:00Z",
  },
  {
    feedback_id: "fb-027",
    user_id: "550e8400-e29b-41d4-a716-446655440006",
    type_id: 4, // Other
    priority_id: 2, // Medium
    status_id: 3, // Resolved
    title: "Đề xuất cải thiện performance",
    content: "Hệ thống chạy chậm vào giờ cao điểm.",
    submitted_at: "2024-11-18T16:50:00Z",
  },
  {
    feedback_id: "fb-028",
    user_id: "550e8400-e29b-41d4-a716-446655440007",
    type_id: 2, // Feature Request
    priority_id: 4, // Urgent
    status_id: 2, // In Progress
    title: "Thêm tính năng backup tự động",
    content: "Cần tính năng backup dữ liệu tự động hàng ngày.",
    submitted_at: "2024-11-15T08:30:00Z",
  },
  {
    feedback_id: "fb-029",
    user_id: "550e8400-e29b-41d4-a716-446655440001",
    type_id: 1, // Bug
    priority_id: 2, // Medium
    status_id: 4, // Closed
    title: "Lỗi memory leak trong dashboard",
    content: "Dashboard sử dụng quá nhiều RAM sau thời gian dài.",
    submitted_at: "2024-11-12T12:45:00Z",
  },
  {
    feedback_id: "fb-030",
    user_id: "550e8400-e29b-41d4-a716-446655440002",
    type_id: 3, // UI
    priority_id: 3, // High
    status_id: 1, // New
    title: "Cải thiện loading animation",
    content: "Loading spinner hiện tại không mượt mà.",
    submitted_at: "2024-11-10T10:20:00Z",
  },
  {
    feedback_id: "fb-031",
    user_id: "550e8400-e29b-41d4-a716-446655440003",
    type_id: 4, // Other
    priority_id: 1, // Low
    status_id: 2, // In Progress
    title: "Đề xuất thêm API documentation",
    content: "Cần tài liệu API chi tiết cho developers.",
    submitted_at: "2024-11-08T15:10:00Z",
  },
  {
    feedback_id: "fb-032",
    user_id: "550e8400-e29b-41d4-a716-446655440004",
    type_id: 2, // Feature Request
    priority_id: 2, // Medium
    status_id: 3, // Resolved
    title: "Thêm tính năng drag & drop",
    content: "Cho phép kéo thả file vào form upload.",
    submitted_at: "2024-11-05T13:35:00Z",
  },
  {
    feedback_id: "fb-033",
    user_id: "550e8400-e29b-41d4-a716-446655440005",
    type_id: 1, // Bug
    priority_id: 3, // High
    status_id: 1, // New
    title: "Lỗi timeout khi xử lý file lớn",
    content: "Xử lý file lớn hơn 50MB bị timeout.",
    submitted_at: "2024-11-03T11:25:00Z",
  },
  {
    feedback_id: "fb-034",
    user_id: "550e8400-e29b-41d4-a716-446655440006",
    type_id: 3, // UI
    priority_id: 1, // Low
    status_id: 4, // Closed
    title: "Cải thiện responsive design",
    content: "Một số trang chưa responsive tốt trên tablet.",
    submitted_at: "2024-11-02T09:40:00Z",
  },
  {
    feedback_id: "fb-035",
    user_id: "550e8400-e29b-41d4-a716-446655440007",
    type_id: 2, // Feature Request
    priority_id: 2, // Medium
    status_id: 2, // In Progress
    title: "Thêm tính năng chia sẻ",
    content: "Cho phép chia sẻ nội dung qua social media.",
    submitted_at: "2024-11-01T16:15:00Z",
  },
  {
    feedback_id: "fb-036",
    user_id: "550e8400-e29b-41d4-a716-446655440001",
    type_id: 4, // Other
    priority_id: 3, // High
    status_id: 1, // New
    title: "Yêu cầu training cho team",
    content: "Cần đào tạo team về cách sử dụng hệ thống mới.",
    submitted_at: "2024-11-01T07:50:00Z",
  },
  {
    feedback_id: "fb-037",
    user_id: "550e8400-e29b-41d4-a716-446655440002",
    type_id: 1, // Bug
    priority_id: 2, // Medium
    status_id: 3, // Resolved
    title: "Lỗi cache không được clear",
    content: "Cache cũ không được xóa sau khi update.",
    submitted_at: "2024-11-01T05:30:00Z",
  },
  {
    feedback_id: "fb-038",
    user_id: "550e8400-e29b-41d4-a716-446655440003",
    type_id: 3, // UI
    priority_id: 2, // Medium
    status_id: 1, // New
    title: "Cải thiện accessibility",
    content: "Cần cải thiện khả năng truy cập cho người khuyết tật.",
    submitted_at: "2024-11-01T03:15:00Z",
  },
  {
    feedback_id: "fb-039",
    user_id: "550e8400-e29b-41d4-a716-446655440004",
    type_id: 2, // Feature Request
    priority_id: 1, // Low
    status_id: 4, // Closed
    title: "Thêm tính năng theme customization",
    content: "Cho phép user tùy chỉnh theme theo sở thích.",
    submitted_at: "2024-11-01T01:45:00Z",
  },
  {
    feedback_id: "fb-040",
    user_id: "550e8400-e29b-41d4-a716-446655440005",
    type_id: 4, // Other
    priority_id: 2, // Medium
    status_id: 2, // In Progress
    title: "Đề xuất thêm monitoring system",
    content: "Cần hệ thống monitoring để theo dõi uptime và performance.",
    submitted_at: "2024-11-01T00:20:00Z",
  },

  // ===== THÁNG 10/2024 - Ổn định (15 feedbacks) =====
  {
    feedback_id: "fb-041",
    user_id: "550e8400-e29b-41d4-a716-446655440006",
    type_id: 2, // Feature Request
    priority_id: 3, // High
    status_id: 3, // Resolved
    title: "Thêm tính năng export dữ liệu",
    content: "Cần tính năng export danh sách ra file Excel/CSV.",
    submitted_at: "2024-10-28T14:45:00Z",
  },
  {
    feedback_id: "fb-042",
    user_id: "550e8400-e29b-41d4-a716-446655440007",
    type_id: 1, // Bug
    priority_id: 4, // Urgent
    status_id: 2, // In Progress
    title: "Lỗi SQL injection vulnerability",
    content: "Phát hiện lỗ hổng bảo mật trong form search.",
    submitted_at: "2024-10-25T10:20:00Z",
  },
  {
    feedback_id: "fb-043",
    user_id: "550e8400-e29b-41d4-a716-446655440001",
    type_id: 3, // UI
    priority_id: 1, // Low
    status_id: 4, // Closed
    title: "Cải thiện color scheme",
    content: "Màu sắc hiện tại không phù hợp với brand.",
    submitted_at: "2024-10-22T16:30:00Z",
  },
  {
    feedback_id: "fb-044",
    user_id: "550e8400-e29b-41d4-a716-446655440002",
    type_id: 4, // Other
    priority_id: 2, // Medium
    status_id: 1, // New
    title: "Đề xuất thêm analytics",
    content: "Cần thêm Google Analytics để theo dõi user behavior.",
    submitted_at: "2024-10-20T12:15:00Z",
  },
  {
    feedback_id: "fb-045",
    user_id: "550e8400-e29b-41d4-a716-446655440003",
    type_id: 2, // Feature Request
    priority_id: 2, // Medium
    status_id: 3, // Resolved
    title: "Thêm tính năng calendar integration",
    content: "Tích hợp với Google Calendar để đặt lịch hẹn.",
    submitted_at: "2024-10-18T08:45:00Z",
  },
  {
    feedback_id: "fb-046",
    user_id: "550e8400-e29b-41d4-a716-446655440004",
    type_id: 1, // Bug
    priority_id: 3, // High
    status_id: 1, // New
    title: "Lỗi CORS khi call API từ subdomain",
    content: "API calls từ subdomain bị block bởi CORS policy.",
    submitted_at: "2024-10-15T15:20:00Z",
  },
  {
    feedback_id: "fb-047",
    user_id: "550e8400-e29b-41d4-a716-446655440005",
    type_id: 3, // UI
    priority_id: 2, // Medium
    status_id: 2, // In Progress
    title: "Cải thiện button hover effects",
    content: "Button hover effects hiện tại hơi chậm và không mượt.",
    submitted_at: "2024-10-12T11:10:00Z",
  },
  {
    feedback_id: "fb-048",
    user_id: "550e8400-e29b-41d4-a716-446655440006",
    type_id: 4, // Other
    priority_id: 1, // Low
    status_id: 4, // Closed
    title: "Đề xuất thêm blog section",
    content: "Nên có blog để chia sẻ tin tức và updates.",
    submitted_at: "2024-10-10T13:55:00Z",
  },
  {
    feedback_id: "fb-049",
    user_id: "550e8400-e29b-41d4-a716-446655440007",
    type_id: 2, // Feature Request
    priority_id: 3, // High
    status_id: 1, // New
    title: "Thêm tính năng chat support",
    content: "Cần live chat để hỗ trợ khách hàng real-time.",
    submitted_at: "2024-10-08T09:30:00Z",
  },
  {
    feedback_id: "fb-050",
    user_id: "550e8400-e29b-41d4-a716-446655440001",
    type_id: 1, // Bug
    priority_id: 2, // Medium
    status_id: 3, // Resolved
    title: "Lỗi pagination không hoạt động",
    content: "Pagination ở trang danh sách không chuyển trang được.",
    submitted_at: "2024-10-05T14:40:00Z",
  },
  {
    feedback_id: "fb-051",
    user_id: "550e8400-e29b-41d4-a716-446655440002",
    type_id: 3, // UI
    priority_id: 1, // Low
    status_id: 2, // In Progress
    title: "Cải thiện form validation UX",
    content: "Form validation hiện tại không user-friendly.",
    submitted_at: "2024-10-03T16:25:00Z",
  },
  {
    feedback_id: "fb-052",
    user_id: "550e8400-e29b-41d4-a716-446655440003",
    type_id: 4, // Other
    priority_id: 2, // Medium
    status_id: 4, // Closed
    title: "Yêu cầu thêm terms of service",
    content: "Cần thêm điều khoản sử dụng và privacy policy.",
    submitted_at: "2024-10-01T10:15:00Z",
  },
  {
    feedback_id: "fb-053",
    user_id: "550e8400-e29b-41d4-a716-446655440004",
    type_id: 2, // Feature Request
    priority_id: 3, // High
    status_id: 1, // New
    title: "Thêm tính năng role-based permissions",
    content: "Cần hệ thống phân quyền chi tiết hơn.",
    submitted_at: "2024-10-01T08:20:00Z",
  },
  {
    feedback_id: "fb-054",
    user_id: "550e8400-e29b-41d4-a716-446655440005",
    type_id: 1, // Bug
    priority_id: 2, // Medium
    status_id: 3, // Resolved
    title: "Lỗi image upload không compress",
    content: "Ảnh upload không được compress, làm chậm trang.",
    submitted_at: "2024-10-01T06:45:00Z",
  },
  {
    feedback_id: "fb-055",
    user_id: "550e8400-e29b-41d4-a716-446655440006",
    type_id: 3, // UI
    priority_id: 1, // Low
    status_id: 4, // Closed
    title: "Cải thiện mobile navigation",
    content: "Menu mobile hơi khó sử dụng, cần redesign.",
    submitted_at: "2024-10-01T04:30:00Z",
  },

  // ===== THÁNG 9/2024 - Giảm nhẹ (12 feedbacks) =====
  {
    feedback_id: "fb-056",
    user_id: "550e8400-e29b-41d4-a716-446655440007",
    type_id: 1, // Bug
    priority_id: 4, // Urgent
    status_id: 3, // Resolved
    title: "Lỗi database connection timeout",
    content: "Database connection bị timeout trong giờ cao điểm.",
    submitted_at: "2024-09-28T11:30:00Z",
  },
  {
    feedback_id: "fb-057",
    user_id: "550e8400-e29b-41d4-a716-446655440001",
    type_id: 2, // Feature Request
    priority_id: 2, // Medium
    status_id: 2, // In Progress
    title: "Thêm tính năng email templates",
    content: "Cần templates có sẵn cho các loại email thông báo.",
    submitted_at: "2024-09-25T15:20:00Z",
  },
  {
    feedback_id: "fb-058",
    user_id: "550e8400-e29b-41d4-a716-446655440002",
    type_id: 4, // Other
    priority_id: 3, // High
    status_id: 1, // New
    title: "Đề xuất thêm CDN",
    content: "Sử dụng CDN để tăng tốc độ load static files.",
    submitted_at: "2024-09-22T09:45:00Z",
  },
  {
    feedback_id: "fb-059",
    user_id: "550e8400-e29b-41d4-a716-446655440003",
    type_id: 2, // Feature Request
    priority_id: 2, // Medium
    status_id: 3, // Resolved
    title: "Thêm tính năng bulk operations",
    content: "Cần tính năng xử lý hàng loạt cho admin.",
    submitted_at: "2024-09-18T16:35:00Z",
  },
  {
    feedback_id: "fb-060",
    user_id: "550e8400-e29b-41d4-a716-446655440004",
    type_id: 1, // Bug
    priority_id: 3, // High
    status_id: 1, // New
    title: "Lỗi XSS vulnerability trong comment",
    content: "Phát hiện lỗ hổng XSS trong phần comment.",
    submitted_at: "2024-09-15T08:20:00Z",
  },
  {
    feedback_id: "fb-061",
    user_id: "550e8400-e29b-41d4-a716-446655440005",
    type_id: 3, // UI
    priority_id: 2, // Medium
    status_id: 2, // In Progress
    title: "Cải thiện loading states",
    content: "Cần thêm skeleton loading cho better UX.",
    submitted_at: "2024-09-12T12:50:00Z",
  },
  {
    feedback_id: "fb-062",
    user_id: "550e8400-e29b-41d4-a716-446655440006",
    type_id: 4, // Other
    priority_id: 1, // Low
    status_id: 4, // Closed
    title: "Yêu cầu thêm backup strategy",
    content: "Cần chiến lược backup dữ liệu định kỳ.",
    submitted_at: "2024-09-10T14:15:00Z",
  },
  {
    feedback_id: "fb-063",
    user_id: "550e8400-e29b-41d4-a716-446655440007",
    type_id: 1, // Bug
    priority_id: 3, // High
    status_id: 3, // Resolved
    title: "Lỗi race condition trong payment",
    content: "Race condition khi xử lý payment đồng thời.",
    submitted_at: "2024-09-08T10:40:00Z",
  },
  {
    feedback_id: "fb-064",
    user_id: "550e8400-e29b-41d4-a716-446655440001",
    type_id: 2, // Feature Request
    priority_id: 2, // Medium
    status_id: 1, // New
    title: "Thêm tính năng notification preferences",
    content: "Cho phép user tùy chỉnh loại thông báo nhận được.",
    submitted_at: "2024-09-05T17:25:00Z",
  },
  {
    feedback_id: "fb-065",
    user_id: "550e8400-e29b-41d4-a716-446655440002",
    type_id: 3, // UI
    priority_id: 1, // Low
    status_id: 4, // Closed
    title: "Cải thiện error messages",
    content: "Error messages hiện tại không rõ ràng cho user.",
    submitted_at: "2024-09-03T13:10:00Z",
  },
  {
    feedback_id: "fb-066",
    user_id: "550e8400-e29b-41d4-a716-446655440003",
    type_id: 4, // Other
    priority_id: 2, // Medium
    status_id: 2, // In Progress
    title: "Đề xuất thêm help documentation",
    content: "Cần tài liệu hướng dẫn chi tiết cho user.",
    submitted_at: "2024-09-01T11:45:00Z",
  },
  {
    feedback_id: "fb-067",
    user_id: "550e8400-e29b-41d4-a716-446655440004",
    type_id: 1, // Bug
    priority_id: 2, // Medium
    status_id: 3, // Resolved
    title: "Lỗi responsive trên IE11",
    content: "Layout bị vỡ trên Internet Explorer 11.",
    submitted_at: "2024-09-01T09:20:00Z",
  },

  // ===== THÁNG 8/2024 - Thấp điểm hè (9 feedbacks) =====
  {
    feedback_id: "fb-068",
    user_id: "550e8400-e29b-41d4-a716-446655440005",
    type_id: 2, // Feature Request
    priority_id: 3, // High
    status_id: 3, // Resolved
    title: "Thêm tính năng search với filters",
    content: "Cần tính năng tìm kiếm với nhiều bộ lọc.",
    submitted_at: "2024-08-28T10:30:00Z",
  },
  {
    feedback_id: "fb-069",
    user_id: "550e8400-e29b-41d4-a716-446655440006",
    type_id: 1, // Bug
    priority_id: 4, // Urgent
    status_id: 2, // In Progress
    title: "Lỗi memory leak trong WebSocket",
    content: "WebSocket connection gây memory leak sau thời gian dài.",
    submitted_at: "2024-08-25T14:45:00Z",
  },
  {
    feedback_id: "fb-070",
    user_id: "550e8400-e29b-41d4-a716-446655440007",
    type_id: 3, // UI
    priority_id: 1, // Low
    status_id: 4, // Closed
    title: "Cải thiện landing page design",
    content: "Landing page cần thiết kế lại cho hiện đại hơn.",
    submitted_at: "2024-08-22T16:20:00Z",
  },
  {
    feedback_id: "fb-071",
    user_id: "550e8400-e29b-41d4-a716-446655440001",
    type_id: 4, // Other
    priority_id: 2, // Medium
    status_id: 1, // New
    title: "Yêu cầu thêm SSL certificate monitoring",
    content: "Cần monitor SSL certificate để tránh expire.",
    submitted_at: "2024-08-20T11:35:00Z",
  },
  {
    feedback_id: "fb-072",
    user_id: "550e8400-e29b-41d4-a716-446655440002",
    type_id: 2, // Feature Request
    priority_id: 2, // Medium
    status_id: 3, // Resolved
    title: "Thêm tính năng user authentication",
    content: "Cần hệ thống đăng nhập/đăng ký cho user.",
    submitted_at: "2024-08-18T09:10:00Z",
  },
  {
    feedback_id: "fb-073",
    user_id: "550e8400-e29b-41d4-a716-446655440003",
    type_id: 1, // Bug
    priority_id: 3, // High
    status_id: 2, // In Progress
    title: "Lỗi HTTPS certificate",
    content: "SSL certificate sắp hết hạn, cần renew.",
    submitted_at: "2024-08-15T15:50:00Z",
  },
  {
    feedback_id: "fb-074",
    user_id: "550e8400-e29b-41d4-a716-446655440004",
    type_id: 3, // UI
    priority_id: 1, // Low
    status_id: 4, // Closed
    title: "Cải thiện typography",
    content: "Font size và line height cần điều chỉnh cho dễ đọc hơn.",
    submitted_at: "2024-08-12T12:25:00Z",
  },
  {
    feedback_id: "fb-075",
    user_id: "550e8400-e29b-41d4-a716-446655440005",
    type_id: 4, // Other
    priority_id: 2, // Medium
    status_id: 1, // New
    title: "Đề xuất thêm performance monitoring",
    content: "Cần tools để monitor performance và uptime.",
    submitted_at: "2024-08-10T08:40:00Z",
  },
  {
    feedback_id: "fb-076",
    user_id: "550e8400-e29b-41d4-a716-446655440006",
    type_id: 2, // Feature Request
    priority_id: 3, // High
    status_id: 3, // Resolved
    title: "Thêm tính năng password strength meter",
    content: "Hiển thị độ mạnh của password khi user tạo tài khoản.",
    submitted_at: "2024-08-05T14:15:00Z",
  },

  // ===== THÁNG 7/2024 - Khởi đầu (7 feedbacks) =====
  {
    feedback_id: "fb-077",
    user_id: "550e8400-e29b-41d4-a716-446655440007",
    type_id: 2, // Feature Request
    priority_id: 4, // Urgent
    status_id: 3, // Resolved
    title: "Thiết lập cơ sở hạ tầng ban đầu",
    content: "Cần setup server, database và các service cơ bản.",
    submitted_at: "2024-07-28T08:00:00Z",
  },
  {
    feedback_id: "fb-078",
    user_id: "550e8400-e29b-41d4-a716-446655440001",
    type_id: 3, // UI
    priority_id: 3, // High
    status_id: 4, // Closed
    title: "Thiết kế UI/UX ban đầu",
    content: "Cần thiết kế giao diện người dùng cơ bản.",
    submitted_at: "2024-07-25T12:30:00Z",
  },
  {
    feedback_id: "fb-079",
    user_id: "550e8400-e29b-41d4-a716-446655440002",
    type_id: 4, // Other
    priority_id: 2, // Medium
    status_id: 3, // Resolved
    title: "Lập kế hoạch phát triển",
    content: "Cần roadmap chi tiết cho dự án.",
    submitted_at: "2024-07-22T14:15:00Z",
  },
  {
    feedback_id: "fb-080",
    user_id: "550e8400-e29b-41d4-a716-446655440003",
    type_id: 1, // Bug
    priority_id: 1, // Low
    status_id: 4, // Closed
    title: "Setup môi trường development",
    content: "Cần setup môi trường dev cho team.",
    submitted_at: "2024-07-20T10:45:00Z",
  },
  {
    feedback_id: "fb-081",
    user_id: "550e8400-e29b-41d4-a716-446655440004",
    type_id: 2, // Feature Request
    priority_id: 3, // High
    status_id: 3, // Resolved
    title: "Tạo database schema",
    content: "Thiết kế cấu trúc database cho hệ thống.",
    submitted_at: "2024-07-18T16:20:00Z",
  },
  {
    feedback_id: "fb-082",
    user_id: "550e8400-e29b-41d4-a716-446655440005",
    type_id: 3, // UI
    priority_id: 2, // Medium
    status_id: 4, // Closed
    title: "Tạo wireframes và mockups",
    content: "Cần wireframes chi tiết cho các trang chính.",
    submitted_at: "2024-07-15T11:30:00Z",
  },
  {
    feedback_id: "fb-083",
    user_id: "550e8400-e29b-41d4-a716-446655440006",
    type_id: 4, // Other
    priority_id: 1, // Low
    status_id: 3, // Resolved
    title: "Nghiên cứu công nghệ sử dụng",
    content: "Đánh giá và chọn tech stack phù hợp.",
    submitted_at: "2024-07-10T09:15:00Z",
  },

  // ===== THÁNG 6/2024 - Khởi đầu dự án (5 feedbacks) =====
  {
    feedback_id: "fb-084",
    user_id: "550e8400-e29b-41d4-a716-446655440007",
    type_id: 4, // Other
    priority_id: 4, // Urgent
    status_id: 3, // Resolved
    title: "Khởi tạo dự án và team",
    content: "Setup team, phân chia vai trò và trách nhiệm.",
    submitted_at: "2024-06-28T08:00:00Z",
  },
  {
    feedback_id: "fb-085",
    user_id: "550e8400-e29b-41d4-a716-446655440001",
    type_id: 2, // Feature Request
    priority_id: 3, // High
    status_id: 4, // Closed
    title: "Định nghĩa requirements",
    content: "Thu thập và phân tích yêu cầu từ stakeholders.",
    submitted_at: "2024-06-25T12:30:00Z",
  },
  {
    feedback_id: "fb-086",
    user_id: "550e8400-e29b-41d4-a716-446655440002",
    type_id: 4, // Other
    priority_id: 2, // Medium
    status_id: 3, // Resolved
    title: "Thiết lập quy trình làm việc",
    content: "Định nghĩa workflow, coding standards và review process.",
    submitted_at: "2024-06-20T14:15:00Z",
  },
  {
    feedback_id: "fb-087",
    user_id: "550e8400-e29b-41d4-a716-446655440003",
    type_id: 3, // UI
    priority_id: 2, // Medium
    status_id: 4, // Closed
    title: "Nghiên cứu UX patterns",
    content: "Tìm hiểu các UX patterns phù hợp cho feedback system.",
    submitted_at: "2024-06-18T10:45:00Z",
  },
  {
    feedback_id: "fb-088",
    user_id: "550e8400-e29b-41d4-a716-446655440004",
    type_id: 1, // Bug
    priority_id: 1, // Low
    status_id: 4, // Closed
    title: "Setup version control",
    content: "Thiết lập Git repository và branching strategy.",
    submitted_at: "2024-06-15T16:30:00Z",
  },
];

// Helper functions để join data và tính toán thống kê
export const getDashboardFeedbackWithDetails = (feedbackId) => {
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

export const getAllDashboardFeedbacksWithDetails = () => {
  return mockFeedbacks.map((feedback) => getDashboardFeedbackWithDetails(feedback.feedback_id));
};

// Dashboard Statistics Functions
export const getDashboardStats = () => {
  const feedbacks = getAllDashboardFeedbacksWithDetails();

  return {
    total: feedbacks.length,
    new: feedbacks.filter((f) => f.status?.name === "New").length,
    inProgress: feedbacks.filter((f) => f.status?.name === "In Progress").length,
    resolved: feedbacks.filter((f) => f.status?.name === "Resolved").length,
    closed: feedbacks.filter((f) => f.status?.name === "Closed").length,
    urgent: feedbacks.filter((f) => f.priority?.name === "Urgent").length,
    high: feedbacks.filter((f) => f.priority?.name === "High").length,
    medium: feedbacks.filter((f) => f.priority?.name === "Medium").length,
    low: feedbacks.filter((f) => f.priority?.name === "Low").length,
    bug: feedbacks.filter((f) => f.type?.name === "Bug").length,
    featureRequest: feedbacks.filter((f) => f.type?.name === "Feature Request").length,
    ui: feedbacks.filter((f) => f.type?.name === "UI").length,
    other: feedbacks.filter((f) => f.type?.name === "Other").length,
  };
};

// Data cho PieChart - Phân bố theo loại
export const getFeedbackTypeDistribution = () => {
  const stats = getDashboardStats();
  return [
    { id: "bug", label: "Bug", value: stats.bug },
    { id: "feature", label: "Feature Request", value: stats.featureRequest },
    { id: "ui", label: "UI/UX", value: stats.ui },
    { id: "other", label: "Khác", value: stats.other },
  ];
};

// Data cho PieChart - Phân bố theo trạng thái
export const getFeedbackStatusDistribution = () => {
  const stats = getDashboardStats();
  return [
    { id: "new", label: "Mới", value: stats.new },
    { id: "inProgress", label: "Đang xử lý", value: stats.inProgress },
    { id: "resolved", label: "Đã giải quyết", value: stats.resolved },
    { id: "closed", label: "Đã đóng", value: stats.closed },
  ];
};

// Data cho PieChart - Phân bố theo mức độ ưu tiên
export const getFeedbackPriorityDistribution = () => {
  const stats = getDashboardStats();
  return [
    { id: "urgent", label: "Khẩn cấp", value: stats.urgent },
    { id: "high", label: "Cao", value: stats.high },
    { id: "medium", label: "Trung bình", value: stats.medium },
    { id: "low", label: "Thấp", value: stats.low },
  ];
};

// Thống kê theo thời gian cho LineChart với xu hướng tự nhiên
export const getFeedbackTimelineData = (period = "month") => {
  const feedbacks = getAllDashboardFeedbacksWithDetails();
  const timelineData = {};

  feedbacks.forEach((feedback) => {
    const date = new Date(feedback.submitted_at);
    let key;

    switch (period) {
      case "week":
        // Lấy tuần trong năm
        const weekNumber = getWeekNumber(date);
        key = `Tuần ${weekNumber}/${date.getFullYear()}`;
        break;
      case "month":
        key = `${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
        break;
      case "year":
        key = date.getFullYear().toString();
        break;
      default:
        key = `${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
    }

    if (!timelineData[key]) {
      timelineData[key] = 0;
    }
    timelineData[key]++;
  });

  // Convert to array và sort theo thời gian
  return Object.entries(timelineData)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => {
      // Parse date for proper sorting
      if (period === "year") {
        return parseInt(a.name) - parseInt(b.name);
      } else if (period === "month") {
        const [monthA, yearA] = a.name.split("/");
        const [monthB, yearB] = b.name.split("/");
        const dateA = new Date(parseInt(yearA), parseInt(monthA) - 1);
        const dateB = new Date(parseInt(yearB), parseInt(monthB) - 1);
        return dateA - dateB;
      } else {
        // Week sorting
        return a.name.localeCompare(b.name);
      }
    });
};

// Helper function để tính số tuần trong năm
function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

// Recent feedbacks cho dashboard
export const getRecentFeedbacks = (limit = 5) => {
  const feedbacks = getAllDashboardFeedbacksWithDetails();
  return feedbacks
    .sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at))
    .slice(0, limit);
};

// Top users với nhiều feedback nhất
export const getTopActiveUsers = (limit = 5) => {
  const feedbacks = getAllDashboardFeedbacksWithDetails();
  const userStats = {};

  feedbacks.forEach((feedback) => {
    const userId = feedback.user_id;
    if (!userStats[userId]) {
      userStats[userId] = {
        user: feedback.user,
        count: 0,
      };
    }
    userStats[userId].count++;
  });

  return Object.values(userStats)
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
};

export default {
  mockRoles,
  mockUsers,
  mockFeedbackTypes,
  mockPriorities,
  mockFeedbackStatus,
  mockFeedbacks,
  getDashboardStats,
  getFeedbackTypeDistribution,
  getFeedbackStatusDistribution,
  getFeedbackPriorityDistribution,
  getFeedbackTimelineData,
  getRecentFeedbacks,
  getTopActiveUsers,
  getAllDashboardFeedbacksWithDetails,
};

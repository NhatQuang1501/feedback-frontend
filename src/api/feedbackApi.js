import axiosInstance from "./axiosInstance";

export const feedbackApi = {
  // Lấy danh sách feedback với filter và phân trang
  getFeedbacks: async (params) => {
    const response = await axiosInstance.get("/feedbacks/", { params });
    return response.data;
  },

  // Lấy chi tiết một feedback
  getFeedbackDetail: async (feedbackId) => {
    const response = await axiosInstance.get(`/feedbacks/${feedbackId}/`);
    return response.data;
  },

  // Tạo feedback mới
  createFeedback: async (formData) => {
    const response = await axiosInstance.post('/feedbacks/create/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Cập nhật trạng thái feedback
  updateFeedbackStatus: async (feedbackId, statusId) => {
    const response = await axiosInstance.put(
      `/feedbacks/${feedbackId}/status/`,
      {
        status_id: statusId,
      }
    );
    return response.data;
  },

  // Export feedback ra CSV
  exportFeedbacks: (filters) => axiosInstance.post("/feedbacks/export/", filters),

  // Kiểm tra trạng thái export
  checkExportStatus: (taskId) => axiosInstance.get(`/feedbacks/export/${taskId}/status/`),

  // Download CSV
  downloadCsv: (csvId) =>
    axiosInstance.get(`/feedbacks/export/download/${csvId}/`, {
      responseType: "blob",
    }),
};

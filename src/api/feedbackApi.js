import axiosInstance from "./axiosInstance";

export const feedbackApi = {
  getFeedbacks: async (params) => {
    const response = await axiosInstance.get("/feedbacks/", { params });
    return response.data;
  },

  getFeedbackDetail: async (feedbackId) => {
    const response = await axiosInstance.get(`/feedbacks/${feedbackId}/`);
    return response.data;
  },

  createFeedback: async (formData) => {
    const response = await axiosInstance.post("/feedbacks/create/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  updateFeedbackStatus: async (feedbackId, statusId) => {
    const response = await axiosInstance.put(`/feedbacks/${feedbackId}/status/`, {
      status_id: statusId,
    });
    return response.data;
  },

  exportFeedbacks: async (filters) => {
    const response = await axiosInstance.post("/feedbacks/export/", filters);
    return response.data;
  },

  checkExportStatus: async (taskId) => {
    const response = await axiosInstance.get(`/feedbacks/export/${taskId}/status/`);
    return response.data;
  },

  downloadCsv: async (csvId) => {
    const response = await axiosInstance.get(`/feedbacks/export/download/${csvId}/`, {
      responseType: "blob",
    });
    return response;
  },
};

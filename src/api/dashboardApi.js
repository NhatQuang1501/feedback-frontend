import http from "./httpClient";

export const dashboardApi = {
  getOverviewStats: () => http.get("feedbacks/dashboard/overview/"),
  getFeedbacksByMonth: (params) => http.get("feedbacks/dashboard/feedbacks-by-month/", { params }),
  getFeedbackTypes: (params) => http.get("feedbacks/dashboard/feedback-types/", { params }),
  getPriorityDistribution: (params) => http.get("feedbacks/dashboard/feedback-priority/", { params }),
  getHandlingSpeed: (params) => http.get("feedbacks/dashboard/handling-speed/", { params }),
  getRecentFeedbacks: (params) => http.get("feedbacks/", { params }),
};

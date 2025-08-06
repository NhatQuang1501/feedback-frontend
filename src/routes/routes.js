// Chưa dùng tới file này
export const ROUTES = {
  // Authentication routes
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    VERIFY_OTP: "/auth/verify-otp",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
  },

  // Public routes
  PUBLIC: {
    HOME: "/",
    NOTFOUND: "*",
    DASHBOARD: "/dashboard",
    FEEDBACK: {
      LIST: "/feedback",
      DETAIL: "/feedback/:id",
      CREATE: "/feedback/create",
      EDIT: "/feedback/:id/edit",
      DELETE: "/feedback/:id/delete",
      //   SEARCH: (query: string) => `/feedback?q=${encodeURIComponent(query)}`,
    },
  },
};

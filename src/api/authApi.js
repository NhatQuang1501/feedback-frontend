import axiosInstance from "./axiosInstance";

export const authApi = {
  register: (payload) => axiosInstance.post("/register/", payload),
  login: (payload) => axiosInstance.post("/login/", payload),
  refresh: (refresh) => axiosInstance.post("/token/refresh/", { refresh }),
  logout: (refresh) => axiosInstance.post("/logout/", { refresh }),
  me: () => axiosInstance.get("/profile/"),
  updateProfile: (payload) => axiosInstance.patch("/profile/", payload),
  sendOtp: (email) => axiosInstance.post("/send-verification-otp/", { email }),
  verifyOtp: (email, otp) => axiosInstance.post("/verify-otp/", { email, otp }),
  googleLogin: (payload) => axiosInstance.post("/login/google/", payload),
};
import http from "./axiosInstance";

export const authApi = {
  register: (payload) => http.post("/register/", payload),
  login: (payload) => http.post("/login/", payload),
  refresh: (refresh) => http.post("/token/refresh/", { refresh }),
  logout: (refresh) => http.post("/logout/", { refresh }),
  me: () => http.get("/profile/"),
  updateProfile: (payload) => http.patch("/profile/", payload),
  sendOtp: (email) => http.post("/send-verification-otp/", { email }),
  verifyOtp: (email, otp) => http.post("/verify-otp/", { email, otp }),
  googleLogin: (idToken) => http.post("/login/google/", { 
    token: idToken  
  }),
};
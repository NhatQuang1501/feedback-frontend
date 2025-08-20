import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
  withCredentials: false,
  timeout: 15000,
});

// Gắn access token (nếu có)
axiosInstance.interceptors.request.use((config) => {
  const access = localStorage.getItem("access_token");
  if (access) {
    config.headers.Authorization = `Bearer ${access}`;
  }
  return config;
});

let isRefreshing = false;
let queue = [];

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const { response, config } = error || {};
    if (response?.status !== 401 || config?._retry) return Promise.reject(error);

    if (isRefreshing) {
      return new Promise((resolve) => {
        queue.push((newAccess) => {
          config.headers.Authorization = `Bearer ${newAccess}`;
          config._retry = true;
          resolve(axiosInstance(config));
        });
      });
    }

    try {
      isRefreshing = true;
      const refresh = localStorage.getItem("refresh_token");
      if (!refresh) throw new Error("No refresh token");

      const { data } = await axiosInstance.post("/token/refresh/", { refresh });
      localStorage.setItem("access_token", data.access);

      queue.forEach((cb) => cb(data.access));
      queue = [];

      config.headers.Authorization = `Bearer ${data.access}`;
      config._retry = true;
      return axiosInstance(config);
    } catch (e) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      queue = [];
      return Promise.reject(e);
    } finally {
      isRefreshing = false;
    }
  },
);

export default axiosInstance;

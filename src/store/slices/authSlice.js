import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "@/api/authApi";

export const registerUser = createAsyncThunk("auth/register", async (form, { rejectWithValue }) => {
  try {
    const { data } = await authApi.register(form);
    // Backend gửi OTP sau đăng ký. Có thể tự động mở màn hình Verify OTP.
    return data;
  } catch (e) {
    return rejectWithValue(e?.response?.data || "Đăng ký thất bại");
  }
});

export const loginUser = createAsyncThunk("auth/login", async (form, { rejectWithValue }) => {
  try {
    const { data } = await authApi.login(form);
    if (data.access) localStorage.setItem("access_token", data.access);
    if (data.refresh) localStorage.setItem("refresh_token", data.refresh);
    return data;
  } catch (e) {
    return rejectWithValue(e?.response?.data || "Đăng nhập thất bại");
  }
});

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await authApi.googleLogin(payload);
      if (data.access) localStorage.setItem("access_token", data.access);
      if (data.refresh) localStorage.setItem("refresh_token", data.refresh);
      return data;
    } catch (e) {
      return rejectWithValue(e?.response?.data || "Google đăng nhập thất bại");
    }
  },
);

export const fetchProfile = createAsyncThunk("auth/me", async (_, { rejectWithValue }) => {
  try {
    const { data } = await authApi.me();
    return data;
  } catch (e) {
    return rejectWithValue(e?.response?.data || "Không thể lấy profile");
  }
});

export const refreshToken = createAsyncThunk("auth/refresh", async (_, { rejectWithValue }) => {
  try {
    const r = localStorage.getItem("refresh_token");
    const { data } = await authApi.refresh(r);
    localStorage.setItem("access_token", data.access);
    return data.access;
  } catch (e) {
    return rejectWithValue(e?.response?.data || "Refresh token thất bại");
  }
});

export const logoutUser = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    const r = localStorage.getItem("refresh_token");
    if (r) await authApi.logout(r);
  } catch (_) {
  } finally {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
});

export const sendOtp = createAsyncThunk("auth/sendOtp", async ({ email }, { rejectWithValue }) => {
  try {
    const { data } = await authApi.sendOtp(email);
    return data;
  } catch (e) {
    return rejectWithValue(e?.response?.data || "Gửi OTP thất bại");
  }
});

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const { data } = await authApi.verifyOtp(email, otp);
      if (data.access) localStorage.setItem("access_token", data.access);
      if (data.refresh) localStorage.setItem("refresh_token", data.refresh);
      return data;
    } catch (e) {
      return rejectWithValue(e?.response?.data || "Xác thực OTP thất bại");
    }
  },
);

const initialState = {
  user: null,
  isAuthenticated: !!localStorage.getItem("access_token"),
  isLoading: false,
  error: null,
  initialized: false,
  isAdmin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError: (s) => {
      s.error = null;
    },
    setInitialized: (s) => {
      s.initialized = true;
    },
  },
  extraReducers: (b) => {
    b.addCase(registerUser.pending, (s) => {
      s.isLoading = true;
      s.error = null;
    })
      .addCase(registerUser.fulfilled, (s) => {
        s.isLoading = false;
      })
      .addCase(registerUser.rejected, (s, a) => {
        s.isLoading = false;
        s.error = a.payload;
      })

      .addCase(loginUser.pending, (s) => {
        s.isLoading = true;
        s.error = null;
      })
      .addCase(loginUser.fulfilled, (s, a) => {
        s.isLoading = false;
        s.isAuthenticated = true;
        s.user = a.payload.user || s.user;
        s.isAdmin = !!a.payload?.user?.role && a.payload.user.role.name === "admin";
      })
      .addCase(loginUser.rejected, (s, a) => {
        s.isLoading = false;
        s.error = a.payload;
      })

      .addCase(googleLogin.pending, (s) => {
        s.isLoading = true;
        s.error = null;
      })
      .addCase(googleLogin.fulfilled, (s, a) => {
        s.isLoading = false;
        s.isAuthenticated = true;
        s.user = a.payload.user;
        s.isAdmin = a.payload.user?.role?.name === "admin";
      })
      .addCase(googleLogin.rejected, (s, a) => {
        s.isLoading = false;
        s.error = a.payload;
      })

      .addCase(fetchProfile.pending, (s) => {
        s.isLoading = true;
      })
      .addCase(fetchProfile.fulfilled, (s, a) => {
        s.isLoading = false;
        s.user = a.payload;
        s.isAdmin = a.payload?.role?.name === "admin";
        s.isAuthenticated = true;
      })
      .addCase(fetchProfile.rejected, (s, a) => {
        s.isLoading = false;
        s.error = a.payload;
      })

      .addCase(refreshToken.fulfilled, (s) => {
        s.isAuthenticated = true;
      })

      .addCase(logoutUser.fulfilled, (s) => {
        s.user = null;
        s.isAuthenticated = false;
        s.isAdmin = false;
        s.error = null;
      })

      .addCase(sendOtp.pending, (s) => {
        s.isLoading = true;
        s.error = null;
      })
      .addCase(sendOtp.fulfilled, (s) => {
        s.isLoading = false;
      })
      .addCase(sendOtp.rejected, (s, a) => {
        s.isLoading = false;
        s.error = a.payload;
      })

      .addCase(verifyOtp.pending, (s) => {
        s.isLoading = true;
        s.error = null;
      })
      .addCase(verifyOtp.fulfilled, (s, a) => {
        s.isLoading = false;
        s.isAuthenticated = true;
        s.user = a.payload.user;
        s.isAdmin = a.payload.user?.role?.name === "admin";
      })
      .addCase(verifyOtp.rejected, (s, a) => {
        s.isLoading = false;
        s.error = a.payload;
      });
  },
});

export const { clearAuthError, setInitialized } = authSlice.actions;
export default authSlice.reducer;

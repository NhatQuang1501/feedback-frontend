import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { dashboardApi } from "@/api/dashboardApi";

export const fetchOverviewStats = createAsyncThunk(
  "dashboard/fetchOverviewStats",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await dashboardApi.getOverviewStats();
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error || "Không thể tải thống kê");
    }
  },
);

export const fetchFeedbacksByMonth = createAsyncThunk(
  "dashboard/fetchFeedbacksByMonth",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await dashboardApi.getFeedbacksByMonth(params);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error || "Không thể tải xu hướng");
    }
  },
);

export const fetchFeedbackTypes = createAsyncThunk(
  "dashboard/fetchFeedbackTypes",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await dashboardApi.getFeedbackTypes(params);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error || "Không thể tải loại phản hồi");
    }
  },
);

export const fetchPriorityDistribution = createAsyncThunk(
  "dashboard/fetchPriorityDistribution",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await dashboardApi.getPriorityDistribution(params);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error || "Không thể tải phân bố ưu tiên");
    }
  },
);

export const fetchHandlingSpeed = createAsyncThunk(
  "dashboard/fetchHandlingSpeed",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await dashboardApi.getHandlingSpeed(params);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error || "Không thể tải tốc độ xử lý");
    }
  },
);

export const fetchRecentFeedbacks = createAsyncThunk(
  "dashboard/fetchRecentFeedbacks",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await dashboardApi.getRecentFeedbacks(params);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error || "Không thể tải phản hồi gần đây");
    }
  },
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    overviewStats: null,
    feedbacksByMonth: [],
    feedbackTypes: [],
    priorityDistribution: [],
    handlingSpeed: [],
    recentFeedbacks: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearDashboardError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Overview Stats
      .addCase(fetchOverviewStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOverviewStats.fulfilled, (state, action) => {
        state.loading = false;
        state.overviewStats = action.payload;
      })
      .addCase(fetchOverviewStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Feedbacks by Month
      .addCase(fetchFeedbacksByMonth.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeedbacksByMonth.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacksByMonth = action.payload;
      })
      .addCase(fetchFeedbacksByMonth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Feedback Types
      .addCase(fetchFeedbackTypes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeedbackTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbackTypes = action.payload;
      })
      .addCase(fetchFeedbackTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Priority Distribution
      .addCase(fetchPriorityDistribution.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPriorityDistribution.fulfilled, (state, action) => {
        state.loading = false;
        state.priorityDistribution = action.payload;
      })
      .addCase(fetchPriorityDistribution.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handling Speed
      .addCase(fetchHandlingSpeed.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHandlingSpeed.fulfilled, (state, action) => {
        state.loading = false;
        state.handlingSpeed = action.payload;
      })
      .addCase(fetchHandlingSpeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Recent Feedbacks
      .addCase(fetchRecentFeedbacks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecentFeedbacks.fulfilled, (state, action) => {
        state.loading = false;
        state.recentFeedbacks = action.payload;
      })
      .addCase(fetchRecentFeedbacks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDashboardError } = dashboardSlice.actions;
export default dashboardSlice.reducer;

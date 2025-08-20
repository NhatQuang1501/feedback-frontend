import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { feedbackApi } from "../../api/feedbackApi";

// Thunk action để gửi feedback
export const submitFeedback = createAsyncThunk(
  "feedback/submit",
  async (feedbackData, { rejectWithValue }) => {
    try {
      // Mock API call - giữ nguyên code cũ
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay

      // Mock response
      const response = {
        id: Date.now(),
        ...feedbackData,
        status: "submitted",
        createdAt: new Date().toISOString(),
      };

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Thunk action để lấy danh sách feedback
export const fetchFeedbacks = createAsyncThunk(
  "feedback/fetchFeedbacks",
  async (params, { rejectWithValue }) => {
    try {
      const response = await feedbackApi.getFeedbacks(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Có lỗi xảy ra khi tải danh sách phản hồi");
    }
  },
);

// Thunk action để lấy chi tiết feedback
export const fetchFeedbackDetail = createAsyncThunk(
  "feedback/fetchFeedbackDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await feedbackApi.getFeedbackDetail(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Có lỗi xảy ra khi tải chi tiết phản hồi");
    }
  },
);

// Thunk action để cập nhật trạng thái feedback
export const updateFeedbackStatus = createAsyncThunk(
  "feedback/updateStatus",
  async ({ id, statusId }, { rejectWithValue }) => {
    try {
      const response = await feedbackApi.updateFeedbackStatus(id, statusId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Có lỗi xảy ra khi cập nhật trạng thái");
    }
  },
);

// Thunk action để export feedback
export const exportFeedbacks = createAsyncThunk(
  "feedback/export",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await feedbackApi.exportFeedbacks(filters);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Có lỗi xảy ra khi xuất dữ liệu");
    }
  },
);

// Thunk action để kiểm tra trạng thái export
export const checkExportStatus = createAsyncThunk(
  "feedback/checkExport",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await feedbackApi.checkExportStatus(taskId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Có lỗi xảy ra khi kiểm tra trạng thái xuất");
    }
  },
);

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    // Danh sách feedback
    feedbacks: [],
    totalItems: 0,
    currentPage: 1,
    isLoading: false,
    error: null,

    // Chi tiết feedback
    selectedFeedback: null,
    isLoadingDetail: false,
    detailError: null,

    // Cập nhật trạng thái
    isUpdating: false,
    updateError: null,

    // Export
    exportTaskId: null,
    exportStatus: null,
    exportUrl: null,
    isExporting: false,
    exportError: null,

    // Submit feedback
    isSubmitting: false,
    submitSuccess: false,
    submitError: null,
    lastSubmittedFeedback: null,
  },
  reducers: {
    resetSubmitState: (state) => {
      state.isSubmitting = false;
      state.submitSuccess = false;
      state.submitError = null;
    },
    clearLastSubmittedFeedback: (state) => {
      state.lastSubmittedFeedback = null;
    },
    resetExportState: (state) => {
      state.exportTaskId = null;
      state.exportStatus = null;
      state.exportUrl = null;
      state.exportError = null;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch feedbacks
      .addCase(fetchFeedbacks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeedbacks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feedbacks = action.payload.data || []; // Sử dụng 'data' thay vì 'results'
        state.totalItems = action.payload.count || 0;
        state.currentPage = action.payload.current_page || 1;
        state.totalPages = action.payload.total_pages || 1;
      })
      .addCase(fetchFeedbacks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Có lỗi xảy ra khi tải danh sách phản hồi";
      })

      // Fetch feedback detail
      .addCase(fetchFeedbackDetail.pending, (state) => {
        state.isLoadingDetail = true;
        state.detailError = null;
      })
      .addCase(fetchFeedbackDetail.fulfilled, (state, action) => {
        state.isLoadingDetail = false;
        state.selectedFeedback = action.payload;
      })
      .addCase(fetchFeedbackDetail.rejected, (state, action) => {
        state.isLoadingDetail = false;
        state.detailError = action.payload || "Có lỗi xảy ra khi tải chi tiết phản hồi";
      })

      // Update feedback status
      .addCase(updateFeedbackStatus.pending, (state) => {
        state.isUpdating = true;
        state.updateError = null;
      })
      .addCase(updateFeedbackStatus.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.selectedFeedback = action.payload;

        // Cập nhật feedback trong danh sách
        const index = state.feedbacks.findIndex(
          (f) => f.feedback_id === action.payload.feedback_id,
        );
        if (index !== -1) {
          state.feedbacks[index] = action.payload;
        }
      })
      .addCase(updateFeedbackStatus.rejected, (state, action) => {
        state.isUpdating = false;
        state.updateError = action.payload || "Có lỗi xảy ra khi cập nhật trạng thái";
      })

      // Export feedbacks
      .addCase(exportFeedbacks.pending, (state) => {
        state.isExporting = true;
        state.exportError = null;
      })
      .addCase(exportFeedbacks.fulfilled, (state, action) => {
        state.isExporting = false;
        state.exportTaskId = action.payload.task_id;
        state.exportStatus = "processing";
      })
      .addCase(exportFeedbacks.rejected, (state, action) => {
        state.isExporting = false;
        state.exportError = action.payload || "Có lỗi xảy ra khi xuất dữ liệu";
      })

      // Check export status
      .addCase(checkExportStatus.pending, (state) => {
        state.isExporting = true;
      })
      .addCase(checkExportStatus.fulfilled, (state, action) => {
        state.isExporting = false;
        state.exportStatus = action.payload.status;
        if (action.payload.status === "completed") {
          state.exportUrl = action.payload.download_url;
        }
      })
      .addCase(checkExportStatus.rejected, (state, action) => {
        state.isExporting = false;
        state.exportError = action.payload || "Có lỗi xảy ra khi kiểm tra trạng thái xuất";
      })

      // Submit feedback (giữ nguyên code cũ)
      .addCase(submitFeedback.pending, (state) => {
        state.isSubmitting = true;
        state.submitSuccess = false;
        state.submitError = null;
      })
      .addCase(submitFeedback.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.submitSuccess = true;
        state.submitError = null;
        state.lastSubmittedFeedback = action.payload;
      })
      .addCase(submitFeedback.rejected, (state, action) => {
        state.isSubmitting = false;
        state.submitSuccess = false;
        state.submitError = action.payload || "Có lỗi xảy ra khi gửi phản hồi";
      });
  },
});

export const { resetSubmitState, clearLastSubmittedFeedback, resetExportState, setCurrentPage } =
  feedbackSlice.actions;
export default feedbackSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const submitFeedback = createAsyncThunk(
  "feedback/submit",
  async (feedbackData, { rejectWithValue }) => {
    try {
      // Mock API call
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

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
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
  },
  extraReducers: (builder) => {
    builder
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

export const { resetSubmitState, clearLastSubmittedFeedback } = feedbackSlice.actions;
export default feedbackSlice.reducer;

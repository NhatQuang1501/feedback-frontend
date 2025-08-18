import { configureStore } from "@reduxjs/toolkit";
import feedbackReducer from "./slices/feedbackSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    feedback: feedbackReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
      },
    }),
});

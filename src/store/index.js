import { configureStore } from "@reduxjs/toolkit";
import feedbackReducer from "./slices/feedbackSlice";

export const store = configureStore({
  reducer: {
    feedback: feedbackReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
      },
    }),
});

import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "@/store";
import App from "./App";
import GoogleAuthProvider from "./components/auth/GoogleAuthProvider";
import AuthGuard from "./components/auth/AuthGuard";
import "./index.css";
import "./styles/responsive.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <GoogleAuthProvider>
        <AuthGuard>
          <App />
        </AuthGuard>
      </GoogleAuthProvider>
    </Provider>
  </StrictMode>,
);

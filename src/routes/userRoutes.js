// Chưa dùng tới file này
import React, { lazy } from "react";
import { ROUTES } from "@/routes/routes";

// const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
// const HomePage = lazy(() => import("@/pages/home/HomePage"));
const DashboardPage = lazy(() => import("@/pages/dashboard/DashboardPage"));
const FeedbackPage = lazy(() => import("@/pages/feedback/FeedbackCreatePage"));
const NotFoundPage = lazy(() => import("@/pages/static/NotFoundPage"));

const userRoutes = [
  // {
  //     path: ROUTES.PUBLIC.HOME,
  //     element: <HomePage />,
  // },
  {
    path: ROUTES.PUBLIC.DASHBOARD,
    element: <DashboardPage />,
  },
  {
    path: ROUTES.PUBLIC.FEEDBACK.LIST,
    element: <FeedbackPage />,
  },
  {
    path: ROUTES.PUBLIC.NOTFOUND,
    element: <NotFoundPage />,
  },
];

export default userRoutes;

// export const AUTH_PATHS = [
//     ROUTES.AUTH.LOGIN,
//     ROUTES.AUTH.REGISTER,
//     ROUTES.AUTH.VERIFY_OTP,
//     ROUTES.AUTH.FORGOT_PASSWORD,
//     ROUTES.AUTH.RESET_PASSWORD,
// ]

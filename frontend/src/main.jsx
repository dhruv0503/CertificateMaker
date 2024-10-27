import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/LandingPage";
import NotFound from "./components/NotFound";
import CustomLoader from "./utils/CustomLoader";

// Lazy loading Student and Admin dashboard components
const Studentdashboard = lazy(() => import("./pages/StudentDashboard"));
const AdminDashboardPage = lazy(() => import("./pages/AdminDashboard"));

// Lazy loader for suspense fallback
const LazyLoader = (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <CustomLoader />
  </div>
);

// All Routes are here
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <Suspense fallback={LazyLoader}>
          <App />
        </Suspense>
      }
    >
      <Route index element={<Home />} />
      <Route
        path="/student"
        element={
          <Suspense fallback={LazyLoader}>
            <Studentdashboard />
          </Suspense>
        }
      />
      <Route
        path="/admin"
        element={
          <Suspense fallback={LazyLoader}>
            <AdminDashboardPage />
          </Suspense>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

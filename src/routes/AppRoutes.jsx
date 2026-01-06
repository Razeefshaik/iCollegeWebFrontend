import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Landing from "../pages/auth/Landing";

import Dashboard from "../pages/student/StudentDashboard";
import Insights from "../pages/student/Insights";
import Profile from "../pages/student/Profile";
import Complaints from "../pages/student/new_complaints";
import ComplaintsFeed from "../pages/student/ComplaintsFeed";
import Announcements from "../pages/student/Announcements";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Landing / default */}
      <Route path="/" element={<Navigate to="/welcome" replace />} />
      <Route path="/welcome" element={<Landing />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Student */}
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/insights"
        element={
          <ProtectedRoute>
            <Insights />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/new_complaints"
        element={
          <ProtectedRoute>
            <Complaints />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/complaints_feed"
        element={
          <ProtectedRoute>
            <ComplaintsFeed />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/announcements"
        element={
          <ProtectedRoute>
            <Announcements />
          </ProtectedRoute>
        }
      />

      {/* Admin */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/welcome" replace />} />
    </Routes>
  );
}

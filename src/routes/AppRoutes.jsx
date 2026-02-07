import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import AdminSignup from "../pages/auth/AdminSignup";
import VerifyOtp from "../pages/auth/VerifyOtp";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ForgotPasswordReset from "../pages/auth/ForgotPasswordReset";
import Landing from "../pages/auth/Landing";

import Dashboard from "../pages/student/StudentDashboard";
import Insights from "../pages/student/Insights";
import Profile from "../pages/student/Profile";
import Complaints from "../pages/student/new_complaints";
import ComplaintsFeed from "../pages/student/ComplaintsFeed";
import Announcements from "../pages/student/Announcements";
import OpinionPolls from "../pages/student/OpinionPolls";
import PollDetail from "../pages/student/PollDetail";
import AdminDashboard from "../pages/admin/AdminDashboard";
import NewOpinionPoll from "../pages/admin/NewOpinionPoll";
import ProtectedRoute from "./ProtectedRoute";
import AnnouncementDetail from "../pages/student/AnnouncementDetail";
import NewAnnouncement from "../pages/admin/NewAnnouncement";


export default function AppRoutes() {
  return (
    <Routes>
      {/* Landing / default */}
      <Route path="/" element={<Navigate to="/welcome" replace />} />
      <Route path="/welcome" element={<Landing />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signup/admin" element={<AdminSignup />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/forgot-password/reset" element={<ForgotPasswordReset />} />

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

      <Route
        path="/student/announcements/:id"
        element={
          <ProtectedRoute>
            <AnnouncementDetail />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/opinion-polls"
        element={
          <ProtectedRoute>
            <OpinionPolls />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/opinion-polls/:id"
        element={
          <ProtectedRoute>
            <PollDetail />
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

      <Route
        path="/admin/new-opinion-poll"
        element={
          <ProtectedRoute>
            <NewOpinionPoll />
          </ProtectedRoute>
        }
      />

      <Route 
        path="/admin/new-announcement" 
        element={
          <ProtectedRoute>
            <NewAnnouncement />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/welcome" replace />} />
    </Routes>
  );
}

import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

import Dashboard from "../pages/student/Dashboard";
import Insights from "../pages/student/Insights";
import Profile from "../pages/student/Profile";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Default entry */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Student */}
      <Route path="/student/dashboard" element={<Dashboard />} />
      <Route path="/student/insights" element={<Insights />} />
      <Route path="/student/profile" element={<Profile />} />
    </Routes>
  );
}

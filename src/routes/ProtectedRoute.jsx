import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, requiredRole }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  // Not logged in at all → send to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If a specific role is required (e.g. ADMIN), enforce it
  if (requiredRole) {
    const userRole = localStorage.getItem("userRole");

    if (userRole !== requiredRole) {
      // If user is logged in but not the right role,
      // send them to a safe dashboard based on their role (if we know it)
      if (userRole === "ADMIN") {
        return <Navigate to="/admin/dashboard" replace />;
      }
      // Default: treat as student / normal user
      return <Navigate to="/student/dashboard" replace />;
    }
  }

  return children;
}

import { useState } from "react";
import DarkModeToggle from "../../components/layout/DarkModeToggle";
import "../../styles/globals.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function ForgotPasswordReset() {
  const navigate = useNavigate();
  const location = useLocation();
  const scholarId = location.state?.scholarId || "";

  const [form, setForm] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  function handleConfirm(e) {
    e.preventDefault();
    setError("");
    if (!form.otp.trim()) {
      setError("Please enter the OTP");
      return;
    }
    if (!form.newPassword) {
      setError("Please enter a new password");
      return;
    }
    if (form.newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    // TODO: call reset-password API with scholarId, otp, newPassword when backend is ready
    navigate("/login", { replace: true });
  }

  if (!scholarId) {
    return (
      <div className="bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Invalid request. Please start from Forgot password.</p>
          <Link to="/forgot-password" className="text-primary font-semibold hover:text-primary-hover">
            Go to Forgot password
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300 font-display text-gray-800 dark:text-gray-200">
      <DarkModeToggle />

      <div className="w-full max-w-5xl flex flex-col md:flex-row bg-card-light dark:bg-card-dark rounded-3xl shadow-2xl overflow-hidden min-h-[600px]">

        {/* LEFT PANEL */}
        <div className="w-full md:w-1/2 header-gradient p-12 flex flex-col justify-center items-center text-center relative overflow-hidden">
          <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-white opacity-10 rounded-full blur-3xl" />
          <div className="absolute bottom-[-50px] left-[-50px] w-48 h-48 bg-black opacity-10 rounded-full blur-2xl" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-24 h-24 glass-circle rounded-full flex items-center justify-center mb-6 shadow-lg">
              <span className="material-icons-round text-white text-5xl">vpn_key</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">Gymkhana Connect</h1>
            <p className="text-white text-opacity-90 text-lg font-medium">Student Voice & Dashboard</p>
            <p className="text-white text-opacity-70 mt-8 max-w-sm text-sm">
              Enter the OTP sent to your email and set a new password.
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-card-light dark:bg-card-dark">
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Reset Password</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">
              Enter OTP and your new password
            </p>

            <form className="space-y-6" onSubmit={handleConfirm}>
              {error && <p className="text-sm text-red-500">{error}</p>}

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                  Enter OTP
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-icons-round text-gray-400 text-xl">pin</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={form.otp}
                    onChange={(e) => setForm({ ...form, otp: e.target.value })}
                    className="block w-full pl-10 pr-3 py-3 rounded-xl bg-input-bg-light dark:bg-input-bg-dark border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                  Enter new password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-icons-round text-gray-400 text-xl">lock_outline</span>
                  </div>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={form.newPassword}
                    onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                    className="block w-full pl-10 pr-3 py-3 rounded-xl bg-input-bg-light dark:bg-input-bg-dark border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                  Re-enter new password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-icons-round text-gray-400 text-xl">lock_reset</span>
                  </div>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    className="block w-full pl-10 pr-3 py-3 rounded-xl bg-input-bg-light dark:bg-input-bg-dark border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-primary hover:bg-primary-hover"
              >
                Confirm
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
              <Link to="/login" className="font-bold text-primary hover:text-primary-hover">
                Back to Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

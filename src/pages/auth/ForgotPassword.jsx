import { useState } from "react";
import DarkModeToggle from "../../components/layout/DarkModeToggle";
import "../../styles/globals.css";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [scholarId, setScholarId] = useState("");
  const [error, setError] = useState("");

  function handleProceed(e) {
    e.preventDefault();
    setError("");
    if (!scholarId.trim()) {
      setError("Scholar ID is required");
      return;
    }
    navigate("/forgot-password/reset", { state: { scholarId: scholarId.trim() } });
  }

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300 font-display text-gray-800 dark:text-gray-200">
      <DarkModeToggle />

      <div className="w-full max-w-5xl flex flex-col md:flex-row bg-card-light dark:bg-card-dark rounded-3xl shadow-2xl overflow-hidden min-h-[500px]">

        {/* LEFT PANEL */}
        <div className="w-full md:w-1/2 header-gradient p-12 flex flex-col justify-center items-center text-center relative overflow-hidden">
          <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-white opacity-10 rounded-full blur-3xl" />
          <div className="absolute bottom-[-50px] left-[-50px] w-48 h-48 bg-black opacity-10 rounded-full blur-2xl" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-24 h-24 glass-circle rounded-full flex items-center justify-center mb-6 shadow-lg">
              <span className="material-icons-round text-white text-5xl">lock_reset</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">Gymkhana Connect</h1>
            <p className="text-white text-opacity-90 text-lg font-medium">Student Voice & Dashboard</p>
            <p className="text-white text-opacity-70 mt-8 max-w-sm text-sm">
              Reset your password. Works for both admin and student accounts.
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-card-light dark:bg-card-dark">
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Forgot Password</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">
              Enter your Scholar ID to receive a reset OTP
            </p>

            <form className="space-y-6" onSubmit={handleProceed}>
              {error && <p className="text-sm text-red-500">{error}</p>}

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                  Scholar ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-icons-round text-gray-400 text-xl">person_outline</span>
                  </div>
                  <input
                    type="text"
                    placeholder="210001"
                    value={scholarId}
                    onChange={(e) => setScholarId(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 rounded-xl bg-input-bg-light dark:bg-input-bg-dark border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-primary hover:bg-primary-hover"
              >
                Proceed
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

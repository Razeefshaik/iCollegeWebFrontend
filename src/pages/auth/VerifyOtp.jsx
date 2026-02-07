import { useState } from "react";
import DarkModeToggle from "../../components/layout/DarkModeToggle";
import "../../styles/globals.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.redirectTo || "/student/dashboard";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [resendMessage, setResendMessage] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  function handleProceed(e) {
    e.preventDefault();
    setError("");
    if (!otp.trim()) {
      setError("Please enter the OTP");
      return;
    }
    // TODO: call verify OTP API when backend is ready; for now proceed to dashboard
    navigate(redirectTo, { replace: true });
  }

  function handleResend() {
    if (resendCooldown > 0) return;
    setResendMessage("OTP sent to your email.");
    setResendCooldown(60);
    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  return (
    <div className="bg-background-light dark:bg-background-dark h-screen overflow-hidden font-display text-gray-800 dark:text-gray-200 antialiased flex transition-colors duration-300">

      {/* LEFT PANEL */}
      <div className="hidden lg:flex w-5/12 bg-gradient-to-br from-primary via-red-500 to-orange-400 relative overflow-hidden flex-col items-center justify-center text-white p-12 text-center z-10">
        <div className="absolute -top-[10%] -left-[10%] w-64 h-64 rounded-full bg-white opacity-10 blur-2xl"></div>
        <div className="absolute bottom-[20%] -right-[5%] w-96 h-96 rounded-full bg-white opacity-10 blur-3xl"></div>
        <div className="absolute top-[40%] left-[20%] w-32 h-32 rounded-full bg-white opacity-5 blur-xl"></div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-8 shadow-lg ring-1 ring-white/30 transition-transform duration-300 hover:scale-110 hover:rotate-3">
            <span className="material-icons-round text-5xl text-white">
              campaign
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-4 tracking-tight">
            Gymkhana Connect
          </h1>

          <p className="text-xl text-red-100 font-medium opacity-90">
            Student Voice & Dashboard
          </p>

          <div className="mt-12 max-w-sm text-sm text-red-50 opacity-80 leading-relaxed">
            Verify your account with the one-time password sent to your email.
          </div>
        </div>

        <div className="absolute bottom-8 text-xs text-white/50">
          © 2024 Gymkhana Student Body
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-7/12 h-full flex flex-col bg-card-light dark:bg-card-dark relative">
        <DarkModeToggle />

        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-12 lg:p-16 flex justify-center">
          <div className="w-full max-w-md my-auto">

            <div className="lg:hidden text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white mb-3 shadow-lg">
                <span className="material-icons-round text-2xl">
                  campaign
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Gymkhana Connect
              </h2>
            </div>

            <div className="text-center lg:text-left mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Verify OTP
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Enter the one-time password sent to your email
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleProceed}>

              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  OTP
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                    <span className="material-icons-round">pin</span>
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    maxLength={6}
                    className="w-full h-14 pl-14 pr-4 rounded-xl bg-input-bg-light dark:bg-input-bg-dark border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  Didn&apos;t receive the code?
                </span>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendCooldown > 0}
                  className="text-primary font-semibold hover:text-primary-hover disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  {resendCooldown > 0 ? `Resend OTP (${resendCooldown}s)` : "Resend OTP"}
                </button>
              </div>

              {resendMessage && (
                <p className="text-sm text-green-600 dark:text-green-400">{resendMessage}</p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover transition-colors"
              >
                Proceed
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

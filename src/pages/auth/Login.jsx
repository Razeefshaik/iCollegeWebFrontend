import { useState } from "react";
import DarkModeToggle from "../../components/layout/DarkModeToggle";
import "../../styles/globals.css";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, getMe } from "../../services/api"; 

export default function Login() {
  /* ---------- STATE ---------- */
  const [form, setForm] = useState({
    scholarId: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  /* ---------- VALIDATION ---------- */
  function validate() {
    const newErrors = {};

    if (!form.scholarId.trim()) {
      newErrors.scholarId = "Scholar ID is required";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  /* ---------- SUBMIT ---------- */
  async function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    try {
      // 1️⃣ Login
      const res = await loginUser({
        scholarId: form.scholarId,
        password: form.password,
      });

      // 2️⃣ Store token
      localStorage.setItem("token", res.token);
      localStorage.setItem("isAuthenticated", "true");

      // 3️⃣ Get real user profile
      const user = await getMe();

      // 4️⃣ Redirect based on backend role
      const redirectTo =
        user.role === "ADMIN"
          ? "/admin/dashboard"
          : "/student/dashboard";

      navigate(redirectTo);

    } catch (err) {
      console.error("Login failed:", err.message);
      setErrors({ general: err.message });
    }
  }

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300">

      <DarkModeToggle />

      <div className="w-full max-w-5xl flex flex-col md:flex-row bg-card-light dark:bg-card-dark rounded-3xl shadow-2xl overflow-hidden min-h-[600px]">

        {/* LEFT PANEL */}
        <div className="w-full md:w-1/2 header-gradient p-12 flex flex-col justify-center items-center text-center relative overflow-hidden">
          <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-white opacity-10 rounded-full blur-3xl" />
          <div className="absolute bottom-[-50px] left-[-50px] w-48 h-48 bg-black opacity-10 rounded-full blur-2xl" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-24 h-24 glass-circle rounded-full flex items-center justify-center mb-6 shadow-lg">
              <span className="material-icons-round text-white text-5xl">
                campaign
              </span>
            </div>

            <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
              Gymkhana Connect
            </h1>
            <p className="text-white text-opacity-90 text-lg font-medium">
              Student Voice & Dashboard
            </p>
            <p className="text-white text-opacity-70 mt-8 max-w-sm text-sm">
              Managing Complaints, Announcements & Opinions for a better campus life.
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-card-light dark:bg-card-dark">
          <div className="w-full max-w-md mx-auto">

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">
              Please log in to access your dashboard
            </p>

            {/* FORM */}
            <form className="space-y-6" onSubmit={handleSubmit}>

              {errors.general && (
                <p className="text-sm text-red-500">{errors.general}</p>
              )}

              {/* Scholar ID */}
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                  Scholar ID
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-icons-round text-gray-400 text-xl">
                      person_outline
                    </span>
                  </div>

                  <input
                    type="text"
                    placeholder="210001"
                    value={form.scholarId}
                    onChange={(e) =>
                      setForm({ ...form, scholarId: e.target.value })
                    }
                    className={`block w-full pl-10 pr-3 py-3 rounded-xl bg-input-bg-light dark:bg-input-bg-dark border ${
                      errors.scholarId
                        ? "border-red-500"
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                  />
                </div>

                {errors.scholarId && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.scholarId}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                  Password
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-icons-round text-gray-400 text-xl">
                      lock_outline
                    </span>
                  </div>

                  <input
                    type="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    className={`block w-full pl-10 pr-3 py-3 rounded-xl bg-input-bg-light dark:bg-input-bg-dark border ${
                      errors.password
                        ? "border-red-500"
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                  />
                </div>

                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.password}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-primary hover:bg-primary-hover"
              >
                Log In
              </button>

              <div className="text-center">
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary font-medium hover:text-primary-hover"
                >
                  Forgot password?
                </Link>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Don&apos;t have an account?
                <Link
                  to="/signup"
                  className="ml-1 font-bold text-primary hover:text-primary-hover"
                >
                  Sign up
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

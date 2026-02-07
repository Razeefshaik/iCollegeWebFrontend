import { useState } from "react";
import DarkModeToggle from "../../components/layout/DarkModeToggle";
import "../../styles/globals.css";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/api";

export default function AdminSignup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    publicName: "",
    scholarId: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
    registerAsAdmin: false,
    secretPasskey: "",
  });

  const [errors, setErrors] = useState({});

  function validate() {
    const newErrors = {};

    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.publicName.trim()) newErrors.publicName = "Public name is required";
    if (!form.scholarId.trim()) newErrors.scholarId = "Scholar ID is required";

    if (!form.email.trim()) {
      newErrors.email = "College email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (form.registerAsAdmin && !form.secretPasskey.trim()) {
      newErrors.secretPasskey = "Secret passkey is required for admin registration";
    }

    if (!form.acceptedTerms) {
      newErrors.acceptedTerms = "You must accept the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    try {
      const payload = {
        name: form.fullName,
        publicName: form.publicName,
        email: form.email,
        password: form.password,
        scholarId: form.scholarId,
      };

      if (form.registerAsAdmin && form.secretPasskey.trim()) {
        payload.role = "ADMIN";
        payload.secretPasskey = form.secretPasskey;
      }

      const res = await registerUser(payload);

      localStorage.setItem("token", res.token);
      localStorage.setItem("isAuthenticated", "true");

      const redirectTo = form.registerAsAdmin ? "/admin/dashboard" : "/student/dashboard";
      navigate("/verify-otp", { state: { redirectTo } });
    } catch (err) {
      console.error("Signup failed:", err.message);
      setErrors({ general: err.message });
    }
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
            Join the platform to voice your opinions, track complaints, and stay
            updated with the latest campus announcements.
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
                Create Account
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Please fill in the details to join
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>

              {errors.general && (
                <p className="text-sm text-red-500">{errors.general}</p>
              )}

              {[
                ["Full Name", "person", "John Doe", "text", "fullName"],
                ["Public Name", "face", "Johnny", "text", "publicName"],
                ["Scholar ID", "badge", "211234", "text", "scholarId"],
                ["College Email", "alternate_email", "student@college.edu", "email", "email"],
                ["Password", "lock", "••••••••", "password", "password"],
                ["Confirm Password", "lock_reset", "••••••••", "password", "confirmPassword"],
              ].map(([label, icon, placeholder, type, key]) => (
                <div key={key}>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                    {label}
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                      <span className="material-icons-round">{icon}</span>
                    </span>

                    <input
                      type={type}
                      placeholder={placeholder}
                      value={form[key]}
                      onChange={(e) =>
                        setForm({ ...form, [key]: e.target.value })
                      }
                      className={`w-full h-14 pl-14 pr-4 rounded-xl bg-input-bg-light dark:bg-input-bg-dark border ${
                        errors[key]
                          ? "border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      }`}
                    />
                  </div>

                  {errors[key] && (
                    <p className="mt-1 text-xs text-red-500">{errors[key]}</p>
                  )}
                </div>
              ))}

              {/* Register as admin checkbox */}
              <div className="flex items-start pt-2">
                <input
                  type="checkbox"
                  id="registerAsAdmin"
                  checked={form.registerAsAdmin}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      registerAsAdmin: e.target.checked,
                      secretPasskey: e.target.checked ? form.secretPasskey : "",
                    })
                  }
                  className="w-4 h-4 mt-1 text-primary border-gray-300 rounded"
                />
                <label htmlFor="registerAsAdmin" className="ml-3 text-sm text-gray-700 dark:text-gray-300 font-medium cursor-pointer">
                  Register as admin
                </label>
              </div>

              {/* Secret passkey - shown only when admin checkbox is checked */}
              {form.registerAsAdmin && (
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                    Enter secret passkey
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                      <span className="material-icons-round">vpn_key</span>
                    </span>

                    <input
                      type="password"
                      placeholder="Enter admin passkey"
                      value={form.secretPasskey}
                      onChange={(e) =>
                        setForm({ ...form, secretPasskey: e.target.value })
                      }
                      className={`w-full h-14 pl-14 pr-4 rounded-xl bg-input-bg-light dark:bg-input-bg-dark border ${
                        errors.secretPasskey
                          ? "border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      }`}
                    />
                  </div>

                  {errors.secretPasskey && (
                    <p className="mt-1 text-xs text-red-500">{errors.secretPasskey}</p>
                  )}
                </div>
              )}

              {/* Terms */}
              <div className="flex items-start pt-2">
                <input
                  type="checkbox"
                  checked={form.acceptedTerms}
                  onChange={(e) =>
                    setForm({ ...form, acceptedTerms: e.target.checked })
                  }
                  className="w-4 h-4 mt-1 text-primary border-gray-300 rounded"
                />
                <p className="ml-3 text-sm text-gray-500 dark:text-gray-400">
                  I agree to the{" "}
                  <span className="text-primary font-medium">Terms of Service</span>{" "}
                  and{" "}
                  <span className="text-primary font-medium">Privacy Policy</span>
                </p>
              </div>

              {errors.acceptedTerms && (
                <p className="text-xs text-red-500">{errors.acceptedTerms}</p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-primary text-white font-bold"
              >
                Sign Up
              </button>

              <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary font-semibold hover:text-primary-hover"
                >
                  Log in here
                </Link>
              </p>

              <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                Student registration?{" "}
                <Link
                  to="/signup"
                  className="text-primary font-semibold hover:text-primary-hover"
                >
                  Sign up as student
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

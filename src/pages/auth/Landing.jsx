import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  function handleGetStarted() {
    navigate("/signup");
  }

  function handleLogin() {
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff5f5] via-[#fdfbff] to-[#f4f9ff] dark:from-background-dark dark:via-background-dark dark:to-background-dark font-display text-gray-900 dark:text-gray-100 flex items-center justify-center px-6">
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
        {/* Left section */}
        <div className="space-y-8">
          {/* Brand */}
          <div>
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-red-400/40">
                <span className="material-icons-round text-2xl">
                  campaign
                </span>
              </span>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400">
                Powered by Student Gymkhana Body
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
              <span className="text-gray-900 dark:text-white">
                Gymkhana
              </span>
              <span className="text-primary">Connect</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-md leading-relaxed">
              Your voice, your contributions, your campus community.
            </p>
          </div>

          {/* Dots / slider hint */}
          <div className="flex items-center gap-2">
            <span className="h-2 w-6 rounded-full bg-primary" />
            <span className="h-2 w-2 rounded-full bg-gray-300" />
            <span className="h-2 w-2 rounded-full bg-gray-200" />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <button
              onClick={handleGetStarted}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-red-600 text-white px-10 py-3 text-sm sm:text-base font-semibold shadow-[0_18px_40px_rgba(255,94,94,0.45)] transition-transform active:scale-95"
            >
              Get Started
              <span className="material-icons-round text-base">
                arrow_forward
              </span>
            </button>

            <button
              onClick={handleLogin}
              className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-800 px-10 py-3 text-sm sm:text-base font-semibold hover:bg-gray-50 active:scale-95 transition-transform"
            >
              Log In
            </button>
          </div>

          {/* Version */}
          <p className="text-xs text-gray-400 pt-4">
            Version 1.0.0
          </p>
        </div>

        {/* Right section */}
        <div className="relative hidden lg:flex items-center justify-center">
          <div className="absolute -top-10 -right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl" />

          <div className="relative w-80 h-80 rounded-full bg-white dark:bg-card-dark shadow-2xl flex items-center justify-center">
            <div className="w-40 h-40 rounded-3xl bg-primary/10 flex items-center justify-center">
              <span className="material-icons-round text-primary text-5xl">
                campaign
              </span>
            </div>

            {/* Floating icons */}
            <div className="absolute -top-2 right-10 w-14 h-14 rounded-full bg-white dark:bg-background-dark shadow-lg flex items-center justify-center">
              <span className="material-icons-round text-yellow-400">
                thumb_up
              </span>
            </div>

            <div className="absolute bottom-6 -left-2 w-14 h-14 rounded-full bg-white dark:bg-background-dark shadow-lg flex items-center justify-center">
              <span className="material-icons-round text-blue-500">
                chat
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



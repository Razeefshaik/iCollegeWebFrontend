import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  function handleGetStarted() {
    navigate("/signup");
  }

  function handleLogin() {
    navigate("/login");
  }

  function handleThemeToggle() {
    document.documentElement.classList.toggle("dark");
    localStorage.theme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
  }

  // Initialize theme
  if (typeof window !== "undefined") {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-body transition-colors duration-300 min-h-screen flex flex-col relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-blue-400/10 dark:bg-blue-900/10 rounded-full blur-[100px] pointer-events-none"></div>

      <nav className="w-full px-6 py-4 flex justify-end items-center z-10">
        <button
          onClick={handleThemeToggle}
          className="p-3 rounded-full bg-surface-light dark:bg-surface-dark shadow-soft text-text-light dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-700 transition-all focus:outline-none ring-1 ring-gray-100 dark:ring-gray-700"
          id="theme-toggle"
        >
          <span className="material-icons-round text-xl dark:hidden">
            dark_mode
          </span>
          <span className="material-icons-round text-xl hidden dark:block text-yellow-300">
            light_mode
          </span>
        </button>
      </nav>

      <main className="flex-grow flex items-center justify-center p-6 z-10">
        <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center lg:justify-end order-1 lg:order-2 mb-8 lg:mb-0 relative">
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-full shadow-glow float-animation flex items-center justify-center border border-white/50 dark:border-gray-700/50 backdrop-blur-sm z-10">
                <span className="material-icons-round text-primary text-8xl md:text-9xl transform -rotate-12">
                  campaign
                </span>
              </div>
              <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-surface-light dark:bg-surface-dark p-3 rounded-2xl shadow-lg float-delayed-1 z-20 border border-gray-100 dark:border-gray-700">
                <span className="material-icons-round text-yellow-500 text-2xl">
                  thumb_up
                </span>
              </div>
              <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 bg-surface-light dark:bg-surface-dark p-3 rounded-2xl shadow-lg float-delayed-2 z-20 border border-gray-100 dark:border-gray-700">
                <span className="material-icons-round text-blue-500 text-2xl">
                  chat
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1 space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display tracking-tight text-text-light dark:text-text-dark">
                Gymkhana<span className="text-primary">Connect</span>
              </h1>
              <p className="text-lg md:text-xl text-subtext-light dark:text-subtext-dark max-w-md mx-auto lg:mx-0 font-light leading-relaxed">
                Your voice, your contributions,
                <br className="hidden md:block" /> your campus community.
              </p>
            </div>

            <div className="flex space-x-2 py-2">
              <div className="w-8 h-1.5 bg-primary rounded-full"></div>
              <div className="w-2 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              <div className="w-2 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            </div>

            <div className="flex flex-col items-center lg:items-start space-y-1">
              <span className="text-xs font-bold tracking-widest text-subtext-light dark:text-subtext-dark uppercase">
                Powered By
              </span>
              <div className="flex items-center space-x-2 text-text-light dark:text-text-dark font-medium">
                <span className="material-icons-round text-lg">school</span>
                <span>Student Gymkhana Body</span>
              </div>
            </div>

            <div className="w-full max-w-sm space-y-4 pt-4">
              <button
                onClick={handleGetStarted}
                className="w-full py-4 px-6 bg-primary hover:bg-primary-hover text-white text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center group"
              >
                Get Started
                <span className="material-icons-round ml-2 group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
              <button
                onClick={handleLogin}
                className="w-full py-4 px-6 bg-surface-light dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-gray-800 text-text-light dark:text-text-dark text-lg font-semibold rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm hover:shadow-md active:scale-95 transition-all duration-300"
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full py-6 text-center z-10">
        <p className="text-sm text-gray-400 dark:text-gray-600">
          Version 1.0.0
        </p>
      </footer>
    </div>
  );
}

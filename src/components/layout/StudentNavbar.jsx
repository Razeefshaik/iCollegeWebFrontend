import { NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import profileImage from "../../assets/images/profile-placeholder.png";

export default function StudentNavbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  }

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-card-dark/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-red-500/30 text-white">
              <span className="material-icons-round text-2xl">
                account_balance
              </span>
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block">
              Student Dashboard
            </span>
            <span className="font-bold text-xl tracking-tight sm:hidden">
              Dashboard
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavItem to="/student/dashboard" label="Home" />
            <NavItem to="/student/insights" label="Insights" />
            <NavItem to="/student/profile" label="Profile" />
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">

            {/* Dark mode toggle */}
            <button
              onClick={() =>
                document.documentElement.classList.toggle("dark")
              }
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="material-icons-round dark:hidden">
                dark_mode
              </span>
              <span className="material-icons-round hidden dark:block">
                light_mode
              </span>
            </button>

            {/* Notifications */}
            <button className="relative p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors">
              <span className="material-icons-round">notifications</span>
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-white dark:border-card-dark"></span>
            </button>

            {/* Post Complaint */}
            <button className="hidden md:flex items-center gap-2 bg-primary hover:bg-red-600 text-white px-4 py-2 rounded-full font-medium transition-transform active:scale-95 shadow-lg shadow-red-500/20">
              <span className="material-icons-round text-sm">
                add
              </span>
              Post Complaint
            </button>

            {/* Profile Avatar + Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <div
                onClick={() => setOpen(!open)}
                className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden border-2 border-gray-100 dark:border-gray-800 cursor-pointer"
              >
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-card-dark rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}

/* ---------- Nav Item ---------- */

function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `font-medium px-3 py-2 rounded-md transition-colors ${
          isActive
            ? "text-primary"
            : "text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
        }`
      }
    >
      {label}
    </NavLink>
  );
}

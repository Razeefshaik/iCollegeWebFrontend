import { useState } from "react";
import { useNavigate } from "react-router-dom";
import profileImage from "../../assets/images/profile-placeholder.png";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("dashboard");

  function handleLogout() {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold">
            <span className="text-primary">Gym</span>
            <span className="text-gray-900 dark:text-white">khana</span>
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <NavItem
            icon="dashboard"
            label="Dashboard"
            isActive={activeNav === "dashboard"}
            onClick={() => setActiveNav("dashboard")}
          />
          <NavItem
            icon="person"
            label="Profile"
            isActive={activeNav === "profile"}
            onClick={() => setActiveNav("profile")}
          />
          <NavItem
            icon="settings"
            label="Settings"
            isActive={activeNav === "settings"}
            onClick={() => setActiveNav("settings")}
          />
          <NavItem
            icon="exit_to_app"
            label="Logout"
            isActive={false}
            onClick={handleLogout}
          />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
        {/* Red Banner Header */}
        <header className="bg-primary h-32 flex items-center justify-between px-8 relative rounded-br-3xl">
          <div>
            <p className="text-white/90 text-sm mb-1">Welcome back,</p>
            <h1 className="text-3xl font-bold text-white">Gymkhana Admin</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={() =>
                document.documentElement.classList.toggle("dark")
              }
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
            >
              <span className="material-icons-round dark:hidden text-xl">
                dark_mode
              </span>
              <span className="material-icons-round hidden dark:block text-xl">
                light_mode
              </span>
            </button>

            {/* Profile Picture */}
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-white overflow-hidden border-2 border-white">
                <img
                  src={profileImage}
                  alt="Admin"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 -mt-16 relative z-10">
            <StatCard value="12" label="Active Complaints" />
            <StatCard value="5" label="Solved Complaints" />
            <StatCard value="3" label="Rejected Complaints" />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Admin Actions */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Admin Actions
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <ActionCard
                    icon="campaign"
                    label="Post Announcement"
                    color="blue"
                    onClick={() => console.log("Post Announcement")}
                  />
                  <ActionCard
                    icon="description"
                    label="Review Complaints"
                    color="red"
                    onClick={() => console.log("Review Complaints")}
                  />
                  <ActionCard
                    icon="bar_chart"
                    label="Post Opinion Poll"
                    color="purple"
                    onClick={() => console.log("Post Opinion Poll")}
                  />
                  <ActionCard
                    icon="emoji_events"
                    label="Post Contribution"
                    color="green"
                    onClick={() => console.log("Post Contribution")}
                  />
                </div>
              </div>

              {/* Quick Access */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Quick Access
                </h2>
                <div className="space-y-3">
                  <QuickAccessItem
                    icon="event_note"
                    title="Announcements"
                    description="View normal feed"
                    color="blue"
                    onClick={() => navigate("/student/announcements")}
                  />
                  <QuickAccessItem
                    icon="chat_bubble"
                    title="Student Opinions"
                    description="Suggestions (e.g. DJ Night)"
                    color="purple"
                    onClick={() => console.log("Student Opinions")}
                  />
                  <QuickAccessItem
                    icon="handshake"
                    title="Tenure Contributions"
                    description="Gymkhana achievements"
                    color="green"
                    onClick={() => console.log("Tenure Contributions")}
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Monthly Overview */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
                    <span className="material-icons-round text-gray-600 dark:text-gray-400 text-3xl">
                      bar_chart
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Monthly Overview
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center">
                    Review detailed analytics of complaints and contributions
                    for the current month.
                  </p>
                  <button className="w-full bg-primary hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                    View Reports
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------- Sidebar Nav Item ---------- */
function NavItem({ icon, label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        isActive
          ? "bg-red-50 dark:bg-red-900/20 text-primary font-semibold"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
      }`}
    >
      <span className="material-icons-round">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

/* ---------- Statistics Card ---------- */
function StatCard({ value, label }) {
  return (
    <div className="rounded-xl p-6 shadow-lg backdrop-blur-md bg-white/90 dark:bg-white/10 border border-white/30">
      <div className="text-4xl font-bold text-white mb-2">{value}</div>
      <div className="text-white/90 text-sm font-medium">{label}</div>
    </div>
  );
}

/* ---------- Action Card ---------- */
function ActionCard({ icon, label, color, onClick }) {
  const iconBgClasses = {
    blue: "bg-blue-200 dark:bg-blue-700",
    red: "bg-red-200 dark:bg-red-700",
    purple: "bg-purple-200 dark:bg-purple-700",
    green: "bg-green-200 dark:bg-green-700",
  };

  const iconColorClasses = {
    blue: "text-blue-600 dark:text-blue-300",
    red: "text-red-600 dark:text-red-300",
    purple: "text-purple-600 dark:text-purple-300",
    green: "text-green-600 dark:text-green-300",
  };

  return (
    <button
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center border border-gray-200 dark:border-gray-700"
    >
      <div
        className={`w-16 h-16 rounded-full ${iconBgClasses[color]} flex items-center justify-center mx-auto mb-3`}
      >
        <span className={`material-icons-round text-3xl ${iconColorClasses[color]}`}>
          {icon}
        </span>
      </div>
      <p className="font-semibold text-sm text-gray-900 dark:text-white">
        {label}
      </p>
    </button>
  );
}

/* ---------- Quick Access Item ---------- */
function QuickAccessItem({ icon, title, description, color, onClick }) {
  const colorClasses = {
    blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    purple:
      "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
    green:
      "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
  };

  return (
    <button
      onClick={onClick}
      className="w-full bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 flex items-center gap-4"
    >
      <div
        className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}
      >
        <span className="material-icons-round">{icon}</span>
      </div>
      <div className="flex-1 text-left">
        <p className="font-semibold text-gray-900 dark:text-white">{title}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
      <span className="material-icons-round text-gray-400">arrow_forward</span>
    </button>
  );
}


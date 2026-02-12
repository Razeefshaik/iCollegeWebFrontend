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
    <div className="h-screen bg-gray-100 dark:bg-gray-900 flex overflow-hidden">
      {/* Left Sidebar - Fixed */}
      <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 fixed h-full z-20">
        {/* Logo */}
        <div className="p-6 flex items-center justify-center border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-primary tracking-tight">
            Gymkhana
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <NavItem
            icon="grid_view"
            label="Dashboard"
            isActive={activeNav === "dashboard"}
            onClick={() => setActiveNav("dashboard")}
          />
          <NavItem
            icon="person"
            label="Profile"
            isActive={activeNav === "profile"}
            onClick={() => {
              setActiveNav("profile");
              navigate("/admin/profile");
            }}
          />
          <NavItem
            icon="settings"
            label="Settings"
            isActive={activeNav === "settings"}
            onClick={() => setActiveNav("settings")}
          />
          <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-700">
            <NavItem
              icon="logout"
              label="Logout"
              isActive={false}
              onClick={handleLogout}
            />
          </div>
        </nav>
      </aside>

      {/* Main Content - Scrollable Right Area */}
      <main className="flex-1 lg:ml-64 relative flex flex-col">
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto">
          {/* Red Banner Header with Gradient */}
          <div className="relative bg-gradient-to-br from-red-500 to-red-600 pb-24 lg:pb-32 pt-12 px-6 lg:px-12 rounded-b-[2.5rem] shadow-lg">
            <div className="max-w-7xl mx-auto w-full flex justify-between items-start">
              <div className="text-white">
                <p className="text-red-100 text-lg font-medium mb-1">
                  Welcome back,
                </p>
                <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
                  Gymkhana Admin
                </h1>
              </div>

              <div className="flex items-center gap-4">
                {/* Dark Mode Toggle */}
                <button
                  onClick={() =>
                    document.documentElement.classList.toggle("dark")
                  }
                  className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors focus:outline-none"
                >
                  <span className="material-icons-round dark:hidden">
                    dark_mode
                  </span>
                  <span className="material-icons-round hidden dark:block">
                    light_mode
                  </span>
                </button>

                {/* Profile Picture */}
                <div className="relative group cursor-pointer">
                  <div className="h-12 w-12 rounded-full bg-orange-200 border-2 border-white/50 overflow-hidden">
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 h-3.5 w-3.5 bg-green-400 border-2 border-red-500 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Statistics Cards - Absolutely positioned at bottom of header */}
            <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 px-6 lg:px-12">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8">
                <StatCard value="12" label="Active Complaints" />
                <StatCard value="5" label="Solved Complaints" />
                <StatCard value="3" label="Rejected Complaints" />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 px-6 lg:px-12 pt-24 lg:pt-28 pb-12">
            <div className="max-w-7xl mx-auto space-y-10">

              {/* Admin Actions - Full Width */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  Admin Actions
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* UPDATED: Post Announcement Button */}
                  <ActionCard
                    icon="campaign"
                    label="Post\nAnnouncement"
                    color="blue"
                    onClick={() => navigate("/admin/new-announcement")}
                  />
                  <ActionCard
                    icon="gavel"
                    label="Review\nComplaints"
                    color="red"
                    onClick={() => console.log("Review Complaints")}
                  />
                  <ActionCard
                    icon="poll"
                    label="Post Opinion\nPoll"
                    color="purple"
                    onClick={() => navigate("/admin/new-opinion-poll")}
                  />
                  <ActionCard
                    icon="emoji_events"
                    label="Post\nContribution"
                    color="green"
                    onClick={() => console.log("Post Contribution")}
                  />
                </div>
              </section>

              {/* Quick Access and Monthly Overview - Side by Side */}
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Quick Access */}
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                    Quick Access
                  </h2>
                  <QuickAccessItem
                    icon="newspaper"
                    title="Announcements"
                    description="View normal feed"
                    color="blue"
                    onClick={() => navigate("/student/announcements")}
                  />
                  <QuickAccessItem
                    icon="forum"
                    title="Student Opinions"
                    description="Suggestions (e.g. DJ Night)"
                    color="purple"
                    onClick={() => navigate("/student/opinion-polls")}
                  />
                  <QuickAccessItem
                    icon="handshake"
                    title="Tenure Contributions"
                    description="Gymkhana achievements"
                    color="green"
                    onClick={() => console.log("Tenure Contributions")}
                  />
                </div>

                {/* Right Column - Monthly Overview */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-center items-center text-center">
                  <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                    <span className="material-icons-round text-4xl text-gray-400">
                      analytics
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                    Monthly Overview
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-xs">
                    Review detailed analytics of complaints and contributions
                    for the current month.
                  </p>
                  <button className="mt-6 px-6 py-2 bg-primary hover:bg-red-600 text-white rounded-lg font-medium transition-colors">
                    View Reports
                  </button>
                </div>
              </section>
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
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
        isActive
          ? "text-primary bg-red-50 dark:bg-red-900/20"
          : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
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
    <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 text-center text-white shadow-lg hover:transform hover:-translate-y-1 transition-transform duration-300">
      <h3 className="text-3xl lg:text-4xl font-bold mb-1">{value}</h3>
      <p className="text-red-100 font-medium">{label}</p>
    </div>
  );
}

/* ---------- Action Card ---------- */
function ActionCard({ icon, label, color, onClick }) {
  const cardBgClasses = {
    blue: "bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 border-transparent hover:border-blue-200 dark:hover:border-blue-800",
    red: "bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 border-transparent hover:border-red-200 dark:hover:border-red-800",
    purple: "bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 border-transparent hover:border-purple-200 dark:hover:border-purple-800",
    green: "bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 border-transparent hover:border-green-200 dark:hover:border-green-800",
  };

  const iconBgClasses = {
    blue: "bg-blue-200 dark:bg-blue-800 text-blue-700 dark:text-blue-200",
    red: "bg-red-200 dark:bg-red-800 text-red-700 dark:text-red-200",
    purple: "bg-purple-200 dark:bg-purple-800 text-purple-700 dark:text-purple-200",
    green: "bg-green-200 dark:bg-green-800 text-green-700 dark:text-green-200",
  };

  // Split label by newline and render each line separately
  const lines = label.split("\\n").length > 1 ? label.split("\\n") : label.split("\n");

  return (
    <button
      onClick={onClick}
      className={`${cardBgClasses[color]} p-6 rounded-3xl flex flex-col items-center justify-center gap-4 transition-all duration-300 group h-48 border`}
    >
      <div
        className={`${iconBgClasses[color]} w-14 h-14 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}
      >
        <span className="material-icons-round">{icon}</span>
      </div>
      <div className="font-semibold text-gray-700 dark:text-gray-200 text-center leading-tight">
        {lines.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
    </button>
  );
}

/* ---------- Quick Access Item ---------- */
function QuickAccessItem({ icon, title, description, color, onClick }) {
  const colorClasses = {
    blue: "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300",
    purple:
      "bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300",
    green:
      "bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-300",
  };

  return (
    <button
      onClick={onClick}
      className="w-full bg-white dark:bg-gray-800 rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100 dark:border-gray-700 group relative overflow-hidden"
    >
      {color === "green" && (
        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-green-500/10 rounded-full blur-xl pointer-events-none"></div>
      )}
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[color]} relative z-10`}
      >
        <span className="material-icons-round relative z-10">{icon}</span>
      </div>
      <div className="flex-1 relative z-10">
        <h3 className="font-bold text-gray-800 dark:text-gray-100">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
      <span className="material-icons-round text-gray-400 group-hover:text-primary transition-colors relative z-10">
        chevron_right
      </span>
    </button>
  );
}
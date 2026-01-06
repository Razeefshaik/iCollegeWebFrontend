import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import StudentNavbar from "../../components/layout/StudentNavbar";
import StudentFooter from "../../components/layout/StudentFooter";
import StudentBottomNav from "../../components/layout/StudentBottomNav";
import oneImage from "../../assets/images/one.png";
import twoImage from "../../assets/images/two.png";
import fiveImage from "../../assets/images/five.png";

export default function Announcements() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Pinned announcement
  const pinnedAnnouncement = {
    id: 1,
    category: "GENERAL",
    isImportant: true,
    timestamp: "Today • 2 hours ago",
    title: "Convocation Ceremony 2024",
    description:
      "Registration for the 2024 graduation ceremony is now open. All final year students must complete the clearance process before applying.",
    image: oneImage,
  };

  // Recent announcements
  const allAnnouncements = [
    {
      id: 2,
      category: "Sports",
      categoryColor: "orange",
      timestamp: "2h ago",
      title: "Inter-Hostel Football Tournament",
      description:
        "Registration is now open for all hostels. Sign up your team captains by this Friday at the sports complex.",
      icon: "sports_soccer",
      iconBg: "bg-green-900",
      image: twoImage,
    },
    {
      id: 3,
      category: "Hostel",
      categoryColor: "purple",
      timestamp: "Yesterday",
      title: "Mess Menu Revision",
      description:
        "Based on the recent poll, the Wednesday dinner menu has been updated to include more vegetarian options.",
      icon: "restaurant",
      iconBg: "bg-blue-100",
      image: "",
    },
    {
      id: 4,
      category: "Academic",
      categoryColor: "green",
      timestamp: "2d ago",
      title: "Library Hours Extended",
      description:
        "Due to upcoming final exams, the central library will remain open 24/7 starting next Monday.",
      icon: "menu_book",
      iconBg: "bg-green-100",
      image: "",
    },
    {
      id: 5,
      category: "Career",
      categoryColor: "dark-purple",
      timestamp: "3d ago",
      title: "Tech Talk: Future of AI",
      description:
        "Join us for a session with industry leaders discussing the impact of Generative AI on software jobs.",
      icon: "person",
      iconBg: "bg-blue-900",
      image: fiveImage,
    },
  ];

  // Filter announcements based on search query
  const filteredAnnouncements = useMemo(() => {
    if (!searchQuery.trim()) {
      return allAnnouncements;
    }

    const query = searchQuery.toLowerCase();
    return allAnnouncements.filter(
      (announcement) =>
        announcement.title.toLowerCase().includes(query) ||
        announcement.description.toLowerCase().includes(query) ||
        announcement.category.toLowerCase().includes(query) ||
        announcement.timestamp.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  function handleBack() {
    navigate("/student/dashboard");
  }

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen font-display text-gray-800 dark:text-gray-200 pb-24 md:pb-10">
      {/* TOP NAVBAR */}
      <StudentNavbar />

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary mb-4 transition-colors"
          >
            <span className="material-icons-round">arrow_back</span>
            <span className="font-medium">Back</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
                Announcements
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-base">
                Stay updated with the latest campus news.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-icons-round text-gray-400">
                  search
                </span>
              </div>
              <input
                type="text"
                placeholder="Search announcements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-card-dark text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
              />
            </div>
          </div>
        </div>

        {/* Pinned Section */}
        <div className="mb-10">
          <h2 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-4">
            PINNED
          </h2>

          <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
            {/* Background Image */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700">
              {pinnedAnnouncement.image ? (
                <img
                  src={pinnedAnnouncement.image}
                  alt={pinnedAnnouncement.title}
                  className="w-full h-full object-cover opacity-90"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700" />
              )}
            </div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />

            {/* Content */}
            <div className="relative p-8 md:p-12 min-h-[300px] md:min-h-[400px] flex flex-col justify-between">
              {/* Top Section */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded">
                    {pinnedAnnouncement.category}
                  </span>
                </div>
                {pinnedAnnouncement.isImportant && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-white/90 text-blue-600 text-xs font-semibold rounded">
                    <span className="material-icons-round text-sm">flag</span>
                    <span>Important</span>
                  </div>
                )}
              </div>

              {/* Bottom Section */}
              <div>
                <p className="text-white/90 text-sm mb-2">
                  {pinnedAnnouncement.timestamp}
                </p>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  {pinnedAnnouncement.title}
                </h3>
                <p className="text-white/90 text-base md:text-lg mb-6 max-w-2xl">
                  {pinnedAnnouncement.description}
                </p>
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900/80 hover:bg-gray-900 text-white rounded-lg font-semibold transition-colors">
                  Read Details
                  <span className="material-icons-round text-sm">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Updates Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
              RECENT UPDATES
            </h2>
            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold text-sm transition-colors">
              View All
            </button>
          </div>

          {/* Announcements Grid */}
          {filteredAnnouncements.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredAnnouncements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="bg-card-light dark:bg-card-dark rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow cursor-pointer group"
                >
                  {/* Image/Icon Section */}
                  <div className="relative h-48 overflow-hidden">
                    {announcement.image ? (
                      <img
                        src={announcement.image}
                        alt={announcement.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div
                        className={`w-full h-full ${announcement.iconBg} flex items-center justify-center`}
                      >
                        <span className="material-icons-round text-white text-6xl opacity-50">
                          {announcement.icon}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-5">
                    {/* Category and Timestamp */}
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`px-2.5 py-1 rounded text-xs font-semibold text-white ${
                          announcement.categoryColor === "orange"
                            ? "bg-orange-500"
                            : announcement.categoryColor === "purple"
                            ? "bg-purple-500"
                            : announcement.categoryColor === "green"
                            ? "bg-green-500"
                            : "bg-purple-700"
                        }`}
                      >
                        {announcement.category}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {announcement.timestamp}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {announcement.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {announcement.description}
                    </p>

                    {/* Read Details Link */}
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold text-sm flex items-center gap-1 transition-colors">
                      Read Details
                      <span className="material-icons-round text-sm">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <p>No announcements found matching your search.</p>
            </div>
          )}
        </div>
      </main>

      {/* DESKTOP FOOTER */}
      <StudentFooter />

      {/* MOBILE BOTTOM NAV */}
      <StudentBottomNav />
    </div>
  );
}

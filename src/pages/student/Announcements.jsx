import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import oneImage from "../../assets/images/one.png";
import twoImage from "../../assets/images/two.png";
import fiveImage from "../../assets/images/five.png";

export default function Announcements() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  function goToDetails(id) {
    navigate(`/student/announcements/${id}`);
  }


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
      image: twoImage,
    },
    {
      id: 3,
      category: "Hostel",
      categoryColor: "indigo",
      timestamp: "Yesterday",
      title: "Mess Menu Revision",
      description:
        "Based on the recent poll, the Wednesday dinner menu has been updated to include more vegetarian options.",
      icon: "restaurant_menu",
    },
    {
      id: 4,
      category: "Academic",
      categoryColor: "emerald",
      timestamp: "2d ago",
      title: "Library Hours Extended",
      description:
        "Due to upcoming final exams, the central library will remain open 24/7 starting next Monday.",
      icon: "menu_book",
    },
    {
      id: 5,
      category: "Career",
      categoryColor: "purple",
      timestamp: "3d ago",
      title: "Tech Talk: Future of AI",
      description:
        "Join us for a session with industry leaders discussing the impact of Generative AI on software jobs.",
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
    <main className="w-full h-screen px-4 sm:px-6 lg:px-8 py-8 flex flex-col bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-100 font-sans antialiased transition-colors duration-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-start gap-4">
          <button
            onClick={handleBack}
            className="group p-2 -ml-2 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <span className="material-icons-round text-2xl group-hover:text-gray-900 dark:group-hover:text-white">
              arrow_back
            </span>
          </button>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Announcements
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Stay updated with the latest campus news.
            </p>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-grow md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-icons-round text-gray-400">search</span>
            </div>
            <input
              type="text"
              placeholder="Search announcements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border-none rounded-xl leading-5 bg-white dark:bg-surface-dark text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm text-base"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-20 no-scrollbar">
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Pinned
            </h3>
          </div>
          <div className="relative w-full h-80 md:h-[400px] rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
            <img
              alt="Convocation Ceremony"
              src={pinnedAnnouncement.image}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"></div>
            <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-bold bg-primary text-white shadow-sm uppercase tracking-wide">
                  GENERAL
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white text-primary shadow-md">
                  <span className="material-icons-round text-sm mr-1">
                    push_pin
                  </span>
                  Important
                </span>
              </div>
              <div className="max-w-4xl">
                <div className="flex items-center text-gray-300 text-sm mb-3 font-medium">
                  <span>{pinnedAnnouncement.timestamp.split(" • ")[0]}</span>
                  <span className="mx-2">•</span>
                  <span>{pinnedAnnouncement.timestamp.split(" • ")[1]}</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 leading-tight">
                  {pinnedAnnouncement.title}
                </h2>
                <p className="text-gray-200 text-base md:text-lg line-clamp-2 md:line-clamp-none max-w-3xl mb-6">
                  {pinnedAnnouncement.description}
                </p>
                <button
                  onClick={() => goToDetails(pinnedAnnouncement.id)}
                  className="inline-flex items-center text-sm font-semibold text-white hover:text-blue-200 transition-colors bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm"
                >
                  Read Details{" "}
                  <span className="material-icons-round text-base ml-2">
                    arrow_forward
                  </span>
                </button>

              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Recent Updates
            </h3>
            <a
              href="#"
              className="text-sm font-semibold text-primary hover:text-blue-700 dark:hover:text-blue-400"
            >
              View All
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAnnouncements.map((announcement) => (
              <div
                key={announcement.id}
                className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col h-full border border-gray-100 dark:border-gray-700 group cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                        announcement.categoryColor === "orange"
                          ? "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
                          : announcement.categoryColor === "indigo"
                          ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                          : announcement.categoryColor === "emerald"
                          ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                          : "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                      }`}
                    >
                      {announcement.category}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      • {announcement.timestamp}
                    </span>
                  </div>
                </div>
                <div className="flex-1 mb-4">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors leading-snug">
                    {announcement.title}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
                    {announcement.description}
                  </p>
                </div>
                {announcement.image ? (
                  <div className="w-full h-40 rounded-xl overflow-hidden mb-4">
                    <img
                      alt={announcement.title}
                      src={announcement.image}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div
                    className={`w-full h-40 rounded-xl flex items-center justify-center mb-4 ${
                      announcement.categoryColor === "indigo"
                        ? "bg-blue-50 dark:bg-blue-900/20 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors"
                        : announcement.categoryColor === "emerald"
                        ? "bg-emerald-50 dark:bg-emerald-900/20 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/40 transition-colors"
                        : ""
                    }`}
                  >
                    <span
                      className={`material-icons-round text-5xl ${
                        announcement.categoryColor === "indigo"
                          ? "text-primary dark:text-blue-400"
                          : "text-emerald-600 dark:text-emerald-400"
                      }`}
                    >
                      {announcement.icon}
                    </span>
                  </div>
                )}
                <div className="mt-auto pt-2 border-t border-gray-100 dark:border-gray-700/50">
                  <span
                    onClick={() => goToDetails(announcement.id)}
                    className="inline-flex items-center text-sm font-semibold text-primary w-full justify-end cursor-pointer"
                  >
                    Read Details{" "}
                    <span className="material-icons-round text-base ml-1 group-hover:translate-x-1 transition-transform">
                      chevron_right
                    </span>
                  </span>

                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-auto border-t border-gray-200 dark:border-gray-700 pt-8 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2024 Campus Connect. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    clipRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

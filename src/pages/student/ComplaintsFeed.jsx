import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentNavbar from "../../components/layout/StudentNavbar";
import StudentFooter from "../../components/layout/StudentFooter";
import StudentBottomNav from "../../components/layout/StudentBottomNav";

export default function ComplaintsFeed() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("public");
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Sample complaints data
  const complaints = [
    {
      id: 1,
      author: "Anonymous",
      authorInitials: null,
      timeAgo: "2h ago",
      category: "Academics",
      categoryColor: "blue",
      title: "Library hours extension",
      description:
        "We need extended library hours during finals week to accommodate late-night study sessions. Currently closing at 10 PM is too early for most of us who study late. Many students end up studying in the common rooms which are noisy.",
      media: [{ type: "image" }],
      likes: 45,
      comments: 8,
      status: "In Progress",
      statusColor: "orange",
    },
    {
      id: 2,
      author: "Rahul G.",
      authorInitials: "RG",
      timeAgo: "5h ago",
      category: "Facilities",
      categoryColor: "green",
      title: "Cafeteria daily special pricing",
      description:
        "The new cafeteria menu is great, but the pricing for the daily special is a bit steep compared to standard meals. Can this be reviewed? We are students on a budget and a 40% hike is difficult to manage.",
      media: [{ type: "image" }, { type: "image" }],
      likes: 12,
      comments: 3,
      status: "Resolved",
      statusColor: "green",
    },
    {
      id: 3,
      author: "Ananya S.",
      authorInitials: "AS",
      timeAgo: "1d ago",
      category: "Events",
      categoryColor: "purple",
      title: "Sound system echo at Cultural Night",
      description:
        "Cultural night was amazing but the sound system needs serious work for next year. It was echoing in the back rows making it hard to hear performances. This has been an issue for the last two years.",
      media: [{ type: "video" }],
      likes: 89,
      comments: 15,
      status: "Pending",
      statusColor: "gray",
    },
  ];

  function handleBack() {
    navigate("/student/dashboard");
  }

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen font-display text-gray-800 dark:text-gray-200 pb-24 md:pb-10">
      {/* TOP NAVBAR */}
      <StudentNavbar />

      {/* MAIN CONTENT */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
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
                Student Complaints
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-base">
                Manage and track campus issues in real-time.
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
                placeholder="Search complaints..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-card-dark text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab("public")}
            className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-colors ${
              activeTab === "public"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            Public Feed
          </button>
          <button
            onClick={() => setActiveTab("my")}
            className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-colors ${
              activeTab === "my"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            My Complaints
          </button>
          <button
            onClick={() => setActiveTab("polls")}
            className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-colors ${
              activeTab === "polls"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            Polls
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {["All", "Academics", "Facilities", "Events", "Hostels"].map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat.toLowerCase())}
                className={`px-4 py-1.5 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                  activeCategory === cat.toLowerCase()
                    ? "bg-gray-900 dark:bg-gray-700 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {cat}
              </button>
            )
          )}
        </div>

        {/* Complaints List */}
        <div className="space-y-4">
          {complaints.map((complaint) => (
            <div
              key={complaint.id}
              className="bg-card-light dark:bg-card-dark rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {complaint.authorInitials ? (
                    <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                      {complaint.authorInitials}
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <span className="material-icons-round text-gray-500 dark:text-gray-400">
                        person
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {complaint.author}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {complaint.timeAgo}
                    </p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <span className="material-icons-round">more_vert</span>
                </button>
              </div>

              {/* Category Tag */}
              <div className="mb-3">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white ${
                    complaint.categoryColor === "blue"
                      ? "bg-blue-500"
                      : complaint.categoryColor === "green"
                      ? "bg-green-500"
                      : complaint.categoryColor === "purple"
                      ? "bg-purple-500"
                      : "bg-gray-500"
                  }`}
                >
                  {complaint.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {complaint.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {complaint.description}
              </p>

              {/* Media */}
              <div className="mb-4">
                {complaint.media.length === 1 ? (
                  <div className="w-full h-64 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                    {complaint.media[0].type === "video" ? (
                      <button className="w-16 h-16 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                        <span className="material-icons-round text-gray-900 dark:text-white">
                          play_arrow
                        </span>
                      </button>
                    ) : (
                      <span className="material-icons-round text-gray-400 text-4xl">
                        image
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {complaint.media.map((item, idx) => (
                      <div
                        key={idx}
                        className="h-32 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center"
                      >
                        <span className="material-icons-round text-gray-400 text-2xl">
                          image
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <span className="material-icons-round text-lg">
                      thumb_up
                    </span>
                    <span className="text-sm font-medium">
                      {complaint.likes}
                    </span>
                  </button>
                  <button className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <span className="material-icons-round text-lg">
                      comment
                    </span>
                    <span className="text-sm font-medium">
                      {complaint.comments}
                    </span>
                  </button>
                </div>

                {/* Status Badge */}
                <div
                  className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                    complaint.statusColor === "orange"
                      ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400"
                      : complaint.statusColor === "green"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400"
                  }`}
                >
                  {complaint.status === "In Progress" && (
                    <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  )}
                  {complaint.status === "Resolved" && (
                    <span className="material-icons-round text-xs">
                      check_circle
                    </span>
                  )}
                  {complaint.status === "Pending" && (
                    <span className="material-icons-round text-xs">
                      hourglass_empty
                    </span>
                  )}
                  <span>{complaint.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* DESKTOP FOOTER */}
      <StudentFooter />

      {/* MOBILE BOTTOM NAV */}
      <StudentBottomNav />
    </div>
  );
}





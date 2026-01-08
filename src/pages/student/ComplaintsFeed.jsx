import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      authorIcon: "person",
      timeAgo: "2h ago",
      category: "Academics",
      categoryColor: "blue",
      title: "Library hours extension",
      description:
        "We need extended library hours during finals week to accommodate late-night study sessions. Currently closing at 10 PM is too early for most of us who study late. Many students end up studying in the common rooms which are noisy.",
      media: [{ type: "image" }],
      likes: 45,
      comments: 8,
      isLiked: false,
      status: "In Progress",
      statusColor: "orange",
    },
    {
      id: 2,
      author: "Rahul G.",
      authorInitials: null,
      authorImage:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBY4tiBAXi-5oGaALdK7ItJYBTIpbNX-xAu3C_xcU6DUoby0dr2ghrEDTseWGp31AHBJ4P_E70eM1CN8Udz-hxqvlhFLTKR8iGLdMq6LM-8uAOo5yG7kX52iqEA9qXTt4if86xb0nptjAMgDzoah8dZJJjbRuSXVGsFM3zGolikJ-EdSBYCaOjgKk66-Ss5cEnkxlO3Jm8tcF9Sm7SvQJh_wUgk_mh9QQsvjBwkf4CT27uGVaKqA-PdNAguABRbvwQqTO3aaQ8zbEc8",
      timeAgo: "5h ago",
      category: "Facilities",
      categoryColor: "green",
      title: "Cafeteria daily special pricing",
      description:
        "The new cafeteria menu is great, but the pricing for the daily special is a bit steep compared to standard meals. Can this be reviewed? We are students on a budget and a 40% hike is difficult to manage.",
      media: [{ type: "image" }, { type: "image" }],
      likes: 12,
      comments: 3,
      isLiked: true,
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
      isLiked: false,
      status: "Pending",
      statusColor: "gray",
    },
  ];

  function handleBack() {
    navigate("/student/dashboard");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark font-sans text-text-main-light dark:text-text-main-dark transition-colors duration-200">
      <main className="flex-1 h-full overflow-y-auto scroll-smooth w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={handleBack}
                className="p-2 -ml-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-text-sub-light dark:text-text-sub-dark transition-colors"
              >
                <span className="material-icons-round text-2xl">arrow_back</span>
              </button>
              <h1 className="text-xl font-bold">Student Complaints</h1>
            </div>
            <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-text-sub-light dark:text-text-sub-dark transition-colors">
              <span className="material-icons-round text-xl">filter_list</span>
            </button>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="p-2 rounded-full hover:bg-white dark:hover:bg-card-dark text-text-sub-light dark:text-text-sub-dark transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
              >
                <span className="material-icons-round text-xl">arrow_back</span>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark">
                  Student Complaints
                </h1>
                <p className="text-text-sub-light dark:text-text-sub-dark">
                  Manage and track campus issues in real-time.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 material-icons-round text-lg">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search complaints..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-card-dark focus:ring-primary focus:border-primary text-sm w-64"
                />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-gray-200/50 dark:bg-gray-800/50 p-1.5 rounded-xl flex gap-2 mb-6 max-w-lg">
            <button
              onClick={() => setActiveTab("public")}
              className={`flex-1 py-2 px-4 rounded-lg shadow-sm text-sm text-center transition-all ${
                activeTab === "public"
                  ? "bg-white dark:bg-card-dark text-primary font-semibold"
                  : "text-text-sub-light dark:text-text-sub-dark hover:bg-white/50 dark:hover:bg-gray-700/50 font-medium"
              }`}
            >
              Public Feed
            </button>
            <button
              onClick={() => setActiveTab("my")}
              className={`flex-1 py-2 px-4 rounded-lg shadow-sm text-sm text-center transition-all ${
                activeTab === "my"
                  ? "bg-white dark:bg-card-dark text-primary font-semibold"
                  : "text-text-sub-light dark:text-text-sub-dark hover:bg-white/50 dark:hover:bg-gray-700/50 font-medium"
              }`}
            >
              My Complaints
            </button>
            <button
              onClick={() => setActiveTab("polls")}
              className={`flex-1 py-2 px-4 rounded-lg shadow-sm text-sm text-center transition-all ${
                activeTab === "polls"
                  ? "bg-white dark:bg-card-dark text-primary font-semibold"
                  : "text-text-sub-light dark:text-text-sub-dark hover:bg-white/50 dark:hover:bg-gray-700/50 font-medium"
              }`}
            >
              Polls
            </button>
          </div>

          {/* Category Filters */}
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 mb-6">
            {["All", "Academics", "Facilities", "Events", "Hostels"].map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat.toLowerCase())}
                  className={`shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === cat.toLowerCase()
                      ? "bg-background-dark dark:bg-white text-white dark:text-background-dark"
                      : "border border-gray-200 dark:border-gray-700 bg-white dark:bg-card-dark text-text-sub-light dark:text-text-sub-dark hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  {cat}
                </button>
              )
            )}
          </div>

          {/* Complaints Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
            {complaints.map((complaint) => (
              <div
                key={complaint.id}
                className="bg-card-light dark:bg-card-dark rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-4 hover:shadow-md transition-shadow"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    {complaint.authorImage ? (
                      <img
                        alt={complaint.author}
                        src={complaint.authorImage}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : complaint.authorInitials ? (
                      <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-300 font-bold text-sm">
                        {complaint.authorInitials}
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <span className="material-icons-round">
                          {complaint.authorIcon}
                        </span>
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm">
                          {complaint.author}
                        </h3>
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                        <span className="text-xs text-text-sub-light dark:text-text-sub-dark">
                          {complaint.timeAgo}
                        </span>
                      </div>
                      <span
                        className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-medium border ${
                          complaint.categoryColor === "blue"
                            ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-300 border-blue-100 dark:border-blue-800"
                            : complaint.categoryColor === "green"
                            ? "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-300 border-green-100 dark:border-green-800"
                            : "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-300 border-purple-100 dark:border-purple-800"
                        }`}
                      >
                        {complaint.category}
                      </span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <span className="material-icons-round">more_vert</span>
                  </button>
                </div>

                {/* Content */}
                <div>
                  <h2 className="font-bold text-lg mb-2">{complaint.title}</h2>
                  <p className="text-text-sub-light dark:text-text-sub-dark text-sm leading-relaxed mb-4">
                    {complaint.description}
                  </p>
                  {complaint.media.length === 1 ? (
                    complaint.media[0].type === "video" ? (
                      <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 relative overflow-hidden group cursor-pointer">
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors"></div>
                        <div className="w-12 h-12 rounded-full bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                          <span className="material-icons-round text-2xl text-gray-700 dark:text-gray-200 ml-1">
                            play_arrow
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-400">
                        <span className="material-icons-round text-4xl">
                          image
                        </span>
                      </div>
                    )
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      {complaint.media.map((item, idx) => (
                        <div
                          key={idx}
                          className="w-full h-32 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-400"
                        >
                          <span className="material-icons-round text-3xl">
                            image
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700 mt-auto">
                  <div className="flex items-center gap-4">
                    <button
                      className={`flex items-center gap-1.5 text-sm font-medium group transition-colors ${
                        complaint.isLiked
                          ? "text-primary"
                          : "text-text-sub-light dark:text-text-sub-dark hover:text-primary"
                      }`}
                    >
                      <span
                        className={`material-icons-round ${
                          complaint.isLiked ? "fill-current" : ""
                        } group-hover:fill-current`}
                      >
                        thumb_up
                      </span>
                      <span>{complaint.likes}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-text-sub-light dark:text-text-sub-dark hover:text-primary transition-colors text-sm font-medium">
                      <span className="material-icons-round">chat_bubble</span>
                      <span>{complaint.comments}</span>
                    </button>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 border ${
                      complaint.statusColor === "orange"
                        ? "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800"
                        : complaint.statusColor === "green"
                        ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600"
                    }`}
                  >
                    {complaint.status === "In Progress" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                    )}
                    {complaint.status === "Resolved" && (
                      <span className="material-icons-round text-sm">
                        check_circle
                      </span>
                    )}
                    {complaint.status === "Pending" && (
                      <span className="material-icons-round text-sm">
                        hourglass_empty
                      </span>
                    )}
                    {complaint.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-700 py-8 mt-auto bg-white dark:bg-card-dark">
          <div className="max-w-6xl mx-auto px-4 text-center text-sm text-text-sub-light dark:text-text-sub-dark">
            <p>© 2023 CampusVoice. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}

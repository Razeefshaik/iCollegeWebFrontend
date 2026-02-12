import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import oneImage from "../../assets/images/one.png";
import twoImage from "../../assets/images/two.png";
import fiveImage from "../../assets/images/five.png";
import { getAllAnnouncements } from "../../services/api";

export default function Announcements() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [apiAnnouncements, setApiAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function goToDetails(announcement) {
    const id = announcement?.id ?? announcement;
    navigate(`/student/announcements/${id}`, { state: { announcement: typeof announcement === "object" ? announcement : undefined } });
  }

  // Backend: GET /announcements/all
  useEffect(() => {
    let isMounted = true;
    async function fetchAnnouncements() {
      try {
        const data = await getAllAnnouncements();
        if (!isMounted) return;
        setApiAnnouncements(Array.isArray(data) ? data : []);
      } catch (err) {
        // Keep existing mock UI as graceful fallback
        console.error("Failed to load announcements:", err);
        if (isMounted) setError(err.message || "Failed to load announcements");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchAnnouncements();
    return () => {
      isMounted = false;
    };
  }, []);

  // --- MOCK FALLBACK DATA (used only if API fails or returns empty) ---
  const fallbackPinned = {
    id: 1,
    category: "GENERAL",
    isImportant: true,
    timestamp: "Today • 2 hours ago",
    title: "Convocation Ceremony 2024",
    description:
      "Registration for the 2024 graduation ceremony is now open. All final year students must complete the clearance process before applying.",
    image: oneImage,
  };

  const fallbackAnnouncements = [
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
      icon: "restaurant",
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

  function formatTimeAgo(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (Number.isNaN(diffInSeconds)) return "";
    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return date.toLocaleDateString();
  }

  function mapPriorityToCategory(priority) {
    switch (priority) {
      case "HIGH":
        return { category: "HIGH PRIORITY", categoryColor: "red" };
      case "LOW":
        return { category: "LOW PRIORITY", categoryColor: "emerald" };
      case "MEDIUM":
      default:
        return { category: "MEDIUM PRIORITY", categoryColor: "amber" };
    }
  }

  // Transform backend data into UI shape (backend returns content, category, isUrgent)
  const transformedFromApi = (apiAnnouncements || []).map((a) => {
    const priority = a.isUrgent ? "HIGH" : "MEDIUM";
    const { category, categoryColor } = mapPriorityToCategory(priority);
    return {
      id: a.id,
      category: a.category || category,
      categoryColor,
      timestamp: formatTimeAgo(a.createdAt),
      title: a.title,
      description: a.description || a.content || "",
      content: a.content || a.description || "",
      image: a.imageUrl || null,
      icon: "campaign",
      priority,
      adminName: a.adminName || null,
      createdAt: a.createdAt,
    };
  });

  // Use API data when loaded and non-empty; only use fallback when done loading and API returned empty
  const hasBackend = !loading && transformedFromApi.length > 0;
  const allAnnouncements = loading ? [] : (transformedFromApi.length > 0 ? transformedFromApi : fallbackAnnouncements);

  // Pinned: highest priority or fallback pinned (only when we have backend data)
  let pinnedAnnouncement = fallbackPinned;
  if (hasBackend) {
    const highPriority = transformedFromApi.find(
      (a) => a.priority === "HIGH"
    );
    pinnedAnnouncement = highPriority || transformedFromApi[0] || fallbackPinned;
  }

  const filteredAnnouncements = useMemo(() => {
    const source = allAnnouncements;
    if (!searchQuery.trim()) return source;
    const query = searchQuery.toLowerCase();
    return source.filter(
      (ann) =>
        ann.title.toLowerCase().includes(query) ||
        ann.description.toLowerCase().includes(query) ||
        (ann.category || "").toLowerCase().includes(query)
    );
  }, [searchQuery, allAnnouncements]);

  return (
    <div className="bg-[#F9F9F9] dark:bg-[#0F172A] min-h-screen flex flex-col transition-colors duration-200 font-sans">
      
      {/* --- TOP NAVBAR --- */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => {
                  const role = localStorage.getItem("userRole");
                  if (role === "ADMIN") {
                    navigate("/admin/dashboard");
                  } else {
                    navigate("/student/dashboard");
                  }
                }}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
              >
                <span className="material-icons-round">arrow_back_ios</span>
              </button>
              <h1 className="text-xl font-bold tracking-tight">Announcements</h1>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 relative">
                <span className="material-icons-round">notifications</span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-[#EF231C] rounded-full"></span>
              </button>
              <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 ml-2 overflow-hidden">
                <img alt="User" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1vdqmFnDAnr4wNwTe07kGdO6DHz9MSLU4eSDpOVWBu6TmZjOmrd_HAxYcU64UDylTlPLIZE-55pQByxWhQ9QkK96R0gGdA1X43vQm3DooQCE1ZIv5WVBB7az3ghnDUfRy-VezGOX9AqoY4T98-Ru66PnoddFXe6WJE2JqIMq_qwVbkGTousaXOPAivjMe0OxdQl43SuMexv9uUNwAZ5L_Fenhsv5xQvmLG1SQVrW4zC1TXLfXiTj_1IB-WLUGcOLZKxvSFyQy7O9b"/>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* --- SEARCH & FILTERS --- */}
        <div className="space-y-6 mb-10">
          <div className="relative max-w-2xl mx-auto lg:mx-0">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#EF231C]">
              <span className="material-icons-round text-[22px]">search</span>
            </span>
            <input 
              className="block w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm focus:ring-2 focus:ring-[#EF231C]/20 focus:border-[#EF231C] transition-all" 
              placeholder="Search announcements..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
            {["All", "Academic", "Hostel", "Events", "Placement"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSearchQuery(cat === "All" ? "" : cat)}
                className={`px-6 py-2 font-semibold rounded-full transition-colors whitespace-nowrap border ${
                  (cat === "All" && !searchQuery) || searchQuery === cat
                    ? "bg-[#EF231C] text-white border-transparent shadow-md shadow-[#EF231C]/20"
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* --- PINNED SECTION --- */}
        <section className="mb-10">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Pinned</h3>
          {loading ? (
            <div className="relative w-full h-80 md:h-[400px] rounded-2xl overflow-hidden shadow-lg bg-slate-200 dark:bg-slate-700 animate-pulse" />
          ) : (
          <div className="relative w-full h-80 md:h-[400px] rounded-2xl overflow-hidden shadow-lg group cursor-pointer" onClick={() => goToDetails(pinnedAnnouncement)}>
            <img src={pinnedAnnouncement.image} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"></div>
            <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between">
              <div className="flex justify-between">
                {pinnedAnnouncement.category && (
                  <span className="px-3 py-1 rounded-md text-xs font-bold bg-[#EF231C] text-white">
                    {pinnedAnnouncement.category}
                  </span>
                )}
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white text-[#EF231C]">
                  <span className="material-icons-round text-sm mr-1">push_pin</span> Important
                </span>
              </div>
              <div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">{pinnedAnnouncement.title}</h2>
                <p className="text-gray-200 line-clamp-2 max-w-3xl mb-6">{pinnedAnnouncement.description}</p>
                <button className="inline-flex items-center text-sm font-semibold text-white bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                  Read Details <span className="material-icons-round text-base ml-2">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
          )}
        </section>

        {/* --- GRID SECTION --- */}
        <section>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-6">Recent Updates</h3>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-5 border border-slate-100 dark:border-slate-700 h-full animate-pulse">
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-3" />
                  <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-full mb-2" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-4" />
                  <div className="h-40 bg-slate-200 dark:bg-slate-700 rounded-xl mt-auto" />
                </div>
              ))}
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAnnouncements.map((ann) => (
              <div key={ann.id} onClick={() => goToDetails(ann)} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-5 border border-slate-100 dark:border-slate-700 flex flex-col h-full group cursor-pointer hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-[#EF231C] uppercase">{ann.category}</span>
                  <span className="text-slate-400 text-xs">• {ann.timestamp}</span>
                </div>
                <h4 className="text-lg font-bold mb-2 group-hover:text-[#EF231C] transition-colors">{ann.title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-4">{ann.description}</p>
                {ann.image ? (
                  <div className="w-full h-40 rounded-xl overflow-hidden mt-auto">
                    <img src={ann.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                  </div>
                ) : (
                  <div className="w-full h-40 rounded-xl flex items-center justify-center bg-slate-50 dark:bg-slate-900/50 mt-auto">
                    <span className="material-icons-round text-5xl text-[#EF231C]">{ann.icon}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          )}
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center gap-6 mb-6">
            <a className="text-slate-400 hover:text-[#EF231C]" href="#"><span className="material-icons-round">home</span></a>
            <a className="text-[#EF231C]" href="#"><span className="material-icons-round">campaign</span></a>
            <a className="text-slate-400 hover:text-[#EF231C]" href="#"><span className="material-icons-round">feedback</span></a>
            <a className="text-slate-400 hover:text-[#EF231C]" href="#"><span className="material-icons-round">person</span></a>
          </div>
          <p className="text-slate-500 text-sm">© 2024 Gymkhana Connect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
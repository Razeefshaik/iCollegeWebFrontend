import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import StudentNavbar from "../../components/layout/StudentNavbar";
import StudentBottomNav from "../../components/layout/StudentBottomNav";
import StudentFooter from "../../components/layout/StudentFooter";
import O1Image from "../../assets/images/O1.png";
import O2Image from "../../assets/images/O2.png";
import O3Image from "../../assets/images/O3.png";

export default function OpinionPolls() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("ongoing");
  const [searchQuery, setSearchQuery] = useState("");

  function handleBack() {
    navigate("/student/dashboard");
  }

  // Active polls data
  const allActivePolls = [
    {
      id: 1,
      category: "Community",
      title: "Should the student lounge be open 24/7 during finals week?",
      image: O1Image,
      participation: "1,240 students voted",
      timeLeft: "2d left",
    },
    {
      id: 2,
      category: "Events",
      title: "Select the theme for this year's Annual Gymkhana Fest",
      image: O2Image,
      participation: "540 students voted",
      timeLeft: "5d left",
    },
    {
      id: 3,
      category: "Facilities",
      title: "New automated lending machines for the Central Library?",
      image: O3Image,
      participation: "2,105 students voted",
      timeLeft: "12h left",
    },
  ];

  // Recently closed polls
  const allClosedPolls = [
    {
      id: 1,
      category: "Facility",
      timeAgo: "Closed 2h ago",
      title: "New high-speed Wi-Fi routers in Block C?",
      result: "Approved",
      percentage: 82,
      votes: "2,102 votes",
    },
    {
      id: 2,
      category: "Academics",
      timeAgo: "Closed 1d ago",
      title: "Introduction of Python Elective in Freshman Year?",
      result: "Approved",
      percentage: 94,
      votes: "4,512 votes",
    },
  ];

  // Filter polls based on search query
  const activePolls = useMemo(() => {
    if (!searchQuery.trim()) {
      return allActivePolls;
    }
    const query = searchQuery.toLowerCase();
    return allActivePolls.filter(
      (poll) =>
        poll.title.toLowerCase().includes(query) ||
        poll.category.toLowerCase().includes(query)
    );
  }, [searchQuery, allActivePolls]);

  const closedPolls = useMemo(() => {
    if (!searchQuery.trim()) {
      return allClosedPolls;
    }
    const query = searchQuery.toLowerCase();
    return allClosedPolls.filter(
      (poll) =>
        poll.title.toLowerCase().includes(query) ||
        poll.category.toLowerCase().includes(query)
    );
  }, [searchQuery, allClosedPolls]);

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen font-display text-gray-800 dark:text-gray-200 pb-24 md:pb-10">
      {/* TOP NAVBAR */}
      <StudentNavbar />

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Header */}
        <nav className="sticky top-16 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex items-center h-16 gap-6">
            <div className="flex items-center gap-4 shrink-0">
              <button
                onClick={handleBack}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <span className="material-icons-round align-middle">
                  arrow_back_ios_new
                </span>
              </button>
              <h1 className="text-xl font-bold tracking-tight">Opinion Polls</h1>
            </div>
            <div className="flex-1 flex justify-start">
              <div className="relative w-full max-w-2xl">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <span className="material-icons-round text-lg">search</span>
                </span>
                <input
                  className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-full bg-slate-50 dark:bg-slate-800 focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Search polls..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </nav>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 bg-slate-200 dark:bg-slate-800 rounded-xl w-full max-w-sm">
            <button
              onClick={() => setActiveTab("ongoing")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "ongoing"
                  ? "bg-white dark:bg-slate-700 shadow-sm text-primary dark:text-white"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              Ongoing
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "past"
                  ? "bg-white dark:bg-slate-700 shadow-sm text-primary dark:text-white"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              Past
            </button>
          </div>
        </div>

        {/* Active Polls Section */}
        {activeTab === "ongoing" && (
          <section className="mb-16">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold">Active Polls</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 uppercase tracking-wider">
                  3 New
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activePolls.map((poll) => (
                <div
                  key={poll.id}
                  className="group bg-card-light dark:bg-card-dark rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      alt={poll.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      src={poll.image}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-md uppercase tracking-wider">
                        {poll.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5">
                        <span className="material-icons-round text-sm">schedule</span>
                        {poll.timeLeft}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold leading-tight mb-8 line-clamp-2">
                      {poll.title}
                    </h3>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                      <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">
                          Participation
                        </p>
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                          {poll.participation}
                        </p>
                      </div>
                      <button
                        onClick={() => navigate(`/student/opinion-polls/${poll.id}`)}
                        className="bg-primary hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-lg shadow-blue-600/20"
                      >
                        Vote Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Recently Closed Section */}
        {activeTab === "ongoing" && (
          <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Recently Closed</h2>
              <a
                href="#"
                className="text-primary font-bold text-sm hover:underline"
              >
                View All
              </a>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {closedPolls.map((poll) => (
                <div
                  key={poll.id}
                  className="bg-card-light dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          {poll.category}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          {poll.timeAgo}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold">{poll.title}</h4>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-xl">
                      <span className="material-icons-round text-green-600 dark:text-green-400">
                        check_circle
                      </span>
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="flex justify-between text-sm font-bold mb-2">
                      <span>{poll.result}</span>
                      <span className="text-primary">{poll.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-green-500 h-full rounded-full"
                        style={{ width: `${poll.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Final count: {poll.votes}
                    </span>
                    <a
                      href="#"
                      className="text-sm font-bold text-primary hover:underline flex items-center gap-1"
                    >
                      Detailed Analytics
                      <span className="material-icons-round text-sm">chevron_right</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Past Polls Tab Content */}
        {activeTab === "past" && (
          <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Past Polls</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {closedPolls.map((poll) => (
                <div
                  key={poll.id}
                  className="bg-card-light dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          {poll.category}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          {poll.timeAgo}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold">{poll.title}</h4>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-xl">
                      <span className="material-icons-round text-green-600 dark:text-green-400">
                        check_circle
                      </span>
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="flex justify-between text-sm font-bold mb-2">
                      <span>{poll.result}</span>
                      <span className="text-primary">{poll.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-green-500 h-full rounded-full"
                        style={{ width: `${poll.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Final count: {poll.votes}
                    </span>
                    <a
                      href="#"
                      className="text-sm font-bold text-primary hover:underline flex items-center gap-1"
                    >
                      Detailed Analytics
                      <span className="material-icons-round text-sm">chevron_right</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* DESKTOP FOOTER */}
      <StudentFooter />

      {/* MOBILE BOTTOM NAV */}
      <StudentBottomNav />
    </div>
  );
}

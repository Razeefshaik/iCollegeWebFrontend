import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllComplaints,
  getMyComplaints,
  toggleUpvote,
  CATEGORY_DISPLAY,
  getComments,
  addComment,
} from "../../services/api";

export default function ComplaintsFeed() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("public");
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [upvotingIds, setUpvotingIds] = useState(new Set());
  const [openCommentsFor, setOpenCommentsFor] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);


  // Fetch complaints based on active tab
  useEffect(() => {
    fetchComplaints();
  }, [activeTab, page]);

  async function fetchComplaints() {
  setLoading(true);
  setError("");

  try {
    let list = [];

    if (activeTab === "my") {
      const response = await getMyComplaints();
      list = response; // already an array
      setHasMore(false);
    } else {
      const response = await getAllComplaints(page, 10);

      // ✅ FIX: Spring Boot pagination
      list = response.content || [];
      setHasMore(!response.last);
    }

    const transformedComplaints = list.map((complaint) => {
      const author =
        complaint.createdBy ||
        complaint.author ||
        complaint.userName ||
        "Anonymous";

      return {
        id: complaint.complaintId,
        author,
        authorInitials:
          author !== "Anonymous"
            ? author
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
            : null,
        timeAgo: formatTimeAgo(complaint.createdAt),
        category: (CATEGORY_DISPLAY[complaint.category] || complaint.category || "").toString().toLowerCase(),
        categoryColor: getCategoryColor(complaint.category),
        title: complaint.title || "Untitled",
        description: complaint.description || "",
        imageUrl: complaint.imageUrl || null,
        likes: complaint.upvotes || 0,
        comments: 0,
        isLiked: false,
        status: complaint.status || "PENDING",
        statusColor: getStatusColor(complaint.status || "PENDING"),
      };
    });

    if (page === 0) {
      setComplaints(transformedComplaints);
    } else {
      setComplaints((prev) => [...prev, ...transformedComplaints]);
    }
  } catch (err) {
    console.error(err);
    setError(err.message || "Failed to load complaints");
  } finally {
    setLoading(false);
  }
}

async function loadComments(complaintId) {
  setCommentLoading(true);
  try {
    const data = await getComments(complaintId);
    setComments(Array.isArray(data) ? data : []);
    setOpenCommentsFor(complaintId);
  } catch (err) {
    alert(err.message || "Failed to load comments");
  } finally {
    setCommentLoading(false);
  }
}
async function handleAddComment(complaintId) {
  if (!commentText.trim()) return;

  try {
    await addComment(complaintId, commentText);
    setCommentText("");
    loadComments(complaintId); // refresh comments
  } catch (err) {
    alert(err.message || "Failed to add comment");
  }
}




  function formatTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return date.toLocaleDateString();
  }

  function getCategoryColor(category) {
    const colorMap = {
      ACADEMICS: "blue",
      HOSTEL: "purple",
      INTERNET: "indigo",
      CLEANLINESS: "green",
      INFRASTRUCTURE: "green",
      CANTEEN: "orange",
      OTHER: "purple",
    };
    return colorMap[category] || "blue";
  }

  function getStatusColor(status) {
    const colorMap = {
      PENDING: "gray",
      IN_PROGRESS: "orange",
      RESOLVED: "green",
    };
    return colorMap[status] || "gray";
  }

  async function handleUpvote(complaintId, currentLiked) {
    if (upvotingIds.has(complaintId)) return; // Prevent double-click

    setUpvotingIds((prev) => new Set(prev).add(complaintId));

    try {
      const updatedComplaint = await toggleUpvote(complaintId);

      // Update the complaint in the list
      setComplaints((prev) =>
        prev.map((c) =>
          c.id === complaintId
            ? {
                ...c,
                likes: updatedComplaint.upvotes || 0,
                isLiked: !currentLiked, // Toggle liked state
              }
            : c
        )
      );
    } catch (err) {
      console.error("Error toggling upvote:", err);
      alert("Failed to update upvote. Please try again.");
    } finally {
      setUpvotingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(complaintId);
        return newSet;
      });
    }
  }

  function handleTabChange(tab) {
    setActiveTab(tab);
    setPage(0); // Reset to first page when switching tabs
    setComplaints([]); // Clear existing complaints
  }

  function handleLoadMore() {
    if (hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  }

  // Filter complaints by category and search (works for both Public Feed and My Complaints)
  const filteredComplaints = complaints.filter((complaint) => {
    const categoryDisplay = (complaint.category || "").toString().toLowerCase();
    const activeCat = (activeCategory || "").toString().toLowerCase();
    const matchesCategory =
      activeCat === "all" || categoryDisplay === activeCat;
    const matchesSearch =
      !searchQuery.trim() ||
      (complaint.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (complaint.description || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Debug logging
  useEffect(() => {
    console.log("Total complaints:", complaints.length);
    console.log("Filtered complaints:", filteredComplaints.length);
    console.log("Active category:", activeCategory);
    console.log("Search query:", searchQuery);
  }, [complaints, filteredComplaints, activeCategory, searchQuery]);

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
              onClick={() => handleTabChange("public")}
              className={`flex-1 py-2 px-4 rounded-lg shadow-sm text-sm text-center transition-all ${
                activeTab === "public"
                  ? "bg-white dark:bg-card-dark text-primary font-semibold"
                  : "text-text-sub-light dark:text-text-sub-dark hover:bg-white/50 dark:hover:bg-gray-700/50 font-medium"
              }`}
            >
              Public Feed
            </button>
            <button
              onClick={() => handleTabChange("my")}
              className={`flex-1 py-2 px-4 rounded-lg shadow-sm text-sm text-center transition-all ${
                activeTab === "my"
                  ? "bg-white dark:bg-card-dark text-primary font-semibold"
                  : "text-text-sub-light dark:text-text-sub-dark hover:bg-white/50 dark:hover:bg-gray-700/50 font-medium"
              }`}
            >
              My Complaints
            </button>
          </div>

          {/* Category Filters (All = show all; others filter by backend category) */}
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 mb-6">
            {[
              { value: "all", label: "All" },
              { value: "academics", label: "academics" },
              { value: "hostel", label: "hostel" },
              { value: "internet", label: "internet" },
              { value: "cleanliness", label: "cleanliness" },
              { value: "infrastructure", label: "infrastructure" },
              { value: "canteen", label: "canteen" },
              { value: "other", label: "other" },
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setActiveCategory(value)}
                className={`shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  (activeCategory || "").toLowerCase() === value
                    ? "bg-background-dark dark:bg-white text-white dark:text-background-dark"
                    : "border border-gray-200 dark:border-gray-700 bg-white dark:bg-card-dark text-text-sub-light dark:text-text-sub-dark hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
              <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                {error}
              </p>
            </div>
          )}

          {/* Loading State */}
          {loading && complaints.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500 dark:text-slate-400">Loading complaints...</p>
            </div>
          )}

          {/* Complaints Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
            {filteredComplaints.length === 0 && !loading && (
              <div className="col-span-2 text-center py-12">
                <p className="text-slate-500 dark:text-slate-400">
                  No complaints found.
                </p>
              </div>
            )}
            {filteredComplaints.map((complaint) => (
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
                </div>

                {/* Content */}
                <div>
                  <h2 className="font-bold text-lg mb-2">{complaint.title}</h2>
                  <p className="text-text-sub-light dark:text-text-sub-dark text-sm leading-relaxed mb-4">
                    {complaint.description}
                  </p>
                  {complaint.imageUrl ? (
                    <div className="w-full h-48 rounded-xl overflow-hidden">
                      <img
                        src={complaint.imageUrl}
                        alt={complaint.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                      <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 hidden">
                        <span className="material-icons-round text-4xl">
                          image
                        </span>
                      </div>
                    </div>
                  ) : null}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700 mt-auto">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleUpvote(complaint.id, complaint.isLiked)}
                      disabled={upvotingIds.has(complaint.id)}
                      className={`flex items-center gap-1.5 text-sm font-medium group transition-colors ${
                        complaint.isLiked
                          ? "text-primary"
                          : "text-text-sub-light dark:text-text-sub-dark hover:text-primary"
                      } ${upvotingIds.has(complaint.id) ? "opacity-50 cursor-not-allowed" : ""}`}
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
                    <button 
                      onClick={() => loadComments(complaint.id)}
                      className="flex items-center gap-1.5 text-text-sub-light dark:text-text-sub-dark hover:text-primary transition-colors text-sm font-medium">
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
                    {complaint.status === "IN_PROGRESS" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                    )}
                    {complaint.status === "RESOLVED" && (
                      <span className="material-icons-round text-sm">
                        check_circle
                      </span>
                    )}
                    {complaint.status === "PENDING" && (
                      <span className="material-icons-round text-sm">
                        hourglass_empty
                      </span>
                    )}
                    {complaint.status === "IN_PROGRESS"
                      ? "In Progress"
                      : complaint.status === "RESOLVED"
                      ? "Resolved"
                      : complaint.status}
                  </span>
                </div>
                {openCommentsFor === complaint.id && (
  <div className="mt-4 border-t pt-4 space-y-3">
    {commentLoading ? (
      <p className="text-sm text-gray-400">Loading comments...</p>
    ) : comments.length === 0 ? (
      <p className="text-sm text-gray-400">No comments yet</p>
    ) : (
      comments.map((c) => (
        <div key={c.id} className="text-sm">
          <span className="font-semibold">{c.userName}</span>
          <p className="text-text-sub-light dark:text-text-sub-dark">
            {c.text}
          </p>
          <p className="text-xs text-gray-400">
            {new Date(c.createdAt).toLocaleString()}
          </p>
        </div>
      ))
    )}

    <div className="flex gap-2 pt-2">
      <input
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Write a comment..."
        className="flex-1 px-3 py-2 text-sm rounded-lg border dark:bg-card-dark"
      />
      <button
        onClick={() => handleAddComment(complaint.id)}
        className="px-4 py-2 bg-primary text-white rounded-lg text-sm"
      >
        Post
      </button>
    </div>
  </div>
)}

              </div>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && activeTab === "public" && !loading && (
            <div className="text-center py-6">
              <button
                onClick={handleLoadMore}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Load More
              </button>
            </div>
          )}

          {loading && complaints.length > 0 && (
            <div className="text-center py-6">
              <p className="text-slate-500 dark:text-slate-400">Loading more...</p>
            </div>
          )}
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

import { useParams, useNavigate, useLocation } from "react-router-dom";

export default function AnnouncementDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const announcement = location.state?.announcement ?? null;

  if (!announcement) {
    return (
      <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col items-center justify-center p-6">
        <p className="text-slate-500 dark:text-slate-400 text-center mb-6">
          Announcement details are not available. Please open this page from the Announcements list.
        </p>
        <button
          onClick={() => navigate("/student/announcements")}
          className="px-4 py-2 rounded-xl bg-[#EF231C] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Back to Announcements
        </button>
      </div>
    );
  }

  const title = announcement.title ?? "";
  const content = announcement.description ?? announcement.content ?? "";
  const category = announcement.category ?? "";
  const timestamp = announcement.timestamp ?? (announcement.createdAt ? formatTime(announcement.createdAt) : "");
  const adminName = announcement.adminName ?? null;
  const imageUrl = announcement.image ?? null;
  const isUrgent = announcement.priority === "HIGH" || announcement.isUrgent;

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-200 min-h-screen flex flex-col">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="w-full px-4 sm:px-8 lg:px-12">
          <div className="flex items-center gap-6 h-20">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              aria-label="Go back"
            >
              <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">
                arrow_back
              </span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#EF231C] rounded flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-sm">campaign</span>
              </div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200 tracking-tight">
                Announcement Details
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main className="flex-grow w-full">
        {/* Hero: image only if provided */}
        {imageUrl && (
          <div className="w-full h-[40vh] min-h-[280px] relative overflow-hidden">
            <img
              src={imageUrl}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        )}

        <div className="w-full px-4 sm:px-8 lg:px-16 py-8 sm:py-12">
          <article className="max-w-4xl mx-auto">
            {/* Category & urgency badges – only if we have them */}
            {(category || isUrgent) && (
              <div className="flex flex-wrap gap-3 mb-4">
                {category && (
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-600 text-white text-xs font-bold tracking-wider uppercase">
                    {category}
                  </span>
                )}
                {isUrgent && (
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-red-600 text-white text-xs font-bold tracking-wider uppercase">
                    <span className="material-symbols-outlined text-sm">emergency</span>
                    Urgent
                  </span>
                )}
              </div>
            )}

            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
              {title}
            </h2>

            {/* Published by / date – only if provided */}
            {(adminName || timestamp) && (
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                  <span className="material-symbols-outlined">account_balance</span>
                </div>
                <div>
                  {adminName && (
                    <p className="text-base font-semibold text-slate-800 dark:text-slate-200">
                      Published by {adminName}
                    </p>
                  )}
                  {timestamp && (
                    <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-0.5">
                      {timestamp}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Full body – the “whole thing” */}
            {content && (
              <div className="text-[18px] leading-[1.8] text-slate-600 dark:text-slate-300 whitespace-pre-wrap">
                {content}
              </div>
            )}
          </article>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="mt-auto py-12 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="w-full px-4 sm:px-8 lg:px-16 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#EF231C] rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined">school</span>
            </div>
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              Campus Connect
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium text-center md:text-left">
            © 2024 Campus Administration Office. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function formatTime(dateInput) {
  if (!dateInput) return "";
  const d = new Date(dateInput);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAnnouncement } from "../../services/api";

export default function NewAnnouncement() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("General");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [submitting, setSubmitting] = useState(false);

  // Match categories shown on student side
  const categories = ["General", "Academic", "Hostel", "Events", "Placement"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    try {
      setSubmitting(true);

      // Backend AnnouncementRequest: title, content, category, imageUrl, isUrgent
      const payload = {
        title: formData.title,
        content: formData.content,
        category: activeCategory,
        imageUrl: "",
        isUrgent: false,
      };

      await createAnnouncement(payload);
      navigate("/admin/dashboard");
    } catch (err) {
      // Keep it simple so we don't disturb other UI
      alert(err.message || "Failed to create announcement");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors duration-200 font-['Inter']">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 md:px-12">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button 
            type="button"
            onClick={() => navigate("/admin/dashboard")}
            className="flex items-center gap-2 text-blue-600 hover:opacity-80 transition-opacity font-medium"
          >
            <span className="material-symbols-outlined">close</span>
            <span className="hidden sm:inline">Cancel</span>
          </button>
          
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">New Announcement</h1>
          
          <button type="button" className="text-blue-600 hover:opacity-80 transition-opacity font-semibold">
            Draft
          </button>
        </div>
      </header>

      <main className="w-full">
        <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">
          <form onSubmit={handleSubmit} className="space-y-12">
            
            {/* TITLE INPUT */}
            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Announcement Title
              </label>
              <input
                type="text"
                required
                value={formData.title}
                className="w-full px-0 py-4 text-3xl md:text-4xl font-bold border-0 border-b border-slate-200 dark:border-slate-800 bg-transparent text-slate-900 dark:text-white focus:ring-0 focus:border-blue-500 transition-all placeholder:text-slate-200 dark:placeholder:text-slate-700"
                placeholder="Enter title..."
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            {/* CATEGORY CHIPS */}
            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Category
              </label>
              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-8 py-3 rounded-full text-sm font-semibold transition-all ${
                      activeCategory === cat
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* CONTENT EDITOR */}
            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Content / Body
              </label>
              <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden focus-within:border-blue-500 transition-colors">
                <div className="flex items-center gap-2 p-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
                  <button type="button" className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300">
                    <span className="material-symbols-outlined text-[22px]">format_bold</span>
                  </button>
                  <button type="button" className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300">
                    <span className="material-symbols-outlined text-[22px]">format_italic</span>
                  </button>
                  <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-1"></div>
                  <button type="button" className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300">
                    <span className="material-symbols-outlined text-[22px]">format_list_bulleted</span>
                  </button>
                  <button type="button" className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300">
                    <span className="material-symbols-outlined text-[22px]">link</span>
                  </button>
                </div>
                <textarea
                  required
                  value={formData.content}
                  className="w-full p-6 border-none focus:ring-0 bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 resize-none min-h-[350px] text-lg leading-relaxed"
                  placeholder="Write your announcement details here..."
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                ></textarea>
              </div>
            </div>

            {/* ATTACHMENTS */}
            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Attachments
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
                <label className="relative group cursor-pointer aspect-square flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-800/30 hover:border-blue-500 transition-all hover:bg-blue-50/50">
                  <input type="file" className="hidden" accept="image/*" />
                  <span className="material-symbols-outlined text-blue-600 text-3xl mb-2">add_photo_alternate</span>
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight">Add Image</span>
                </label>
                <label className="relative group cursor-pointer aspect-square flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-800/30 hover:border-blue-500 transition-all hover:bg-blue-50/50">
                  <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
                  <span className="material-symbols-outlined text-blue-600 text-3xl mb-2">upload_file</span>
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight">Add Doc</span>
                </label>
              </div>
            </div>

            {/* PUBLISH BUTTON */}
            <div className="pt-10 border-t border-slate-100 dark:border-slate-800">
              <div className="max-w-md mx-auto">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white py-5 px-8 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/40 transition-all transform active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined">send</span>
                  {submitting ? "Publishing..." : "Publish Announcement"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
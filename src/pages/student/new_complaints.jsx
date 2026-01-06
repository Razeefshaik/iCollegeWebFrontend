import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import StudentNavbar from "../../components/layout/StudentNavbar";
import StudentFooter from "../../components/layout/StudentFooter";
import StudentBottomNav from "../../components/layout/StudentBottomNav";

export default function Complaints() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    photo: null,
  });
  const [dragActive, setDragActive] = useState(false);

  function handleBack() {
    navigate("/student/dashboard");
  }

  function handleFileSelect(e) {
    const file = e.target.files?.[0];
    if (file) {
      setForm({ ...form, photo: file });
    }
  }

  function handleDrag(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setForm({ ...form, photo: file });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Complaint submitted:", form);
    // Handle submission logic here
  }

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen font-display text-gray-800 dark:text-gray-200 pb-24 md:pb-10">
      {/* TOP NAVBAR */}
      <StudentNavbar />

      {/* MAIN CONTENT */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary mb-4 transition-colors"
          >
            <span className="material-icons-round">arrow_back</span>
            <span className="font-medium">Back</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
                Complaints
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-base max-w-2xl">
                Submit a new issue regarding facilities, academics, or events.
                Please provide as much detail as possible to help us resolve it
                quickly.
              </p>
            </div>

            <div className="flex gap-3 items-center">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors text-sm whitespace-nowrap">
                New Complaint
              </button>
              <button className="px-4 py-2 bg-white dark:bg-card-dark border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm whitespace-nowrap">
                My History
              </button>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Complaint Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Complaint Title
            </label>
            <input
              type="text"
              placeholder="e.g., Broken AC in Library"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-card-dark text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <div className="relative">
              <select
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-card-dark text-gray-900 dark:text-white appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              >
                <option value="">Select a category</option>
                <option value="infrastructure">Infrastructure</option>
                <option value="academics">Academics</option>
                <option value="mess">Mess</option>
                <option value="hostel">Hostel</option>
                <option value="events">Events</option>
                <option value="other">Other</option>
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none material-icons-round">
                expand_more
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              placeholder="Describe the issue in detail..."
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              rows={6}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-card-dark text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
              required
            />
          </div>

          {/* Photo Evidence */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Photo Evidence (Optional)
            </label>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`
                w-full border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                ${
                  dragActive
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600 bg-gray-50 dark:bg-gray-900/50"
                }
              `}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleFileSelect}
                className="hidden"
              />

              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <span className="material-icons-round text-blue-600 dark:text-blue-400 text-3xl">
                    add_photo_alternate
                  </span>
                </div>

                <div>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold mb-1">
                    Click to upload
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    or drag and drop
                  </p>
                </div>

                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                  PNG, JPG UP TO 10MB
                </p>

                {form.photo && (
                  <p className="text-sm text-green-600 dark:text-green-400 mt-2 font-medium">
                    {form.photo.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-lg shadow-blue-500/20"
            >
              Submit Complaint
            </button>
          </div>
        </form>
      </main>

      {/* DESKTOP FOOTER */}
      <StudentFooter />

      {/* MOBILE BOTTOM NAV */}
      <StudentBottomNav />
    </div>
  );
}


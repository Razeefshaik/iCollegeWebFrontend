import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createComplaint, CATEGORY_MAP } from "../../services/api";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

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

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // Validate form
      if (!form.title.trim() || !form.description.trim() || !form.category) {
        setError("Please fill in all required fields");
        setIsSubmitting(false);
        return;
      }

      // Map category to backend format
      const backendCategory = CATEGORY_MAP[form.category];
      if (!backendCategory) {
        setError("Invalid category selected");
        setIsSubmitting(false);
        return;
      }

      // Prepare complaint data
      const complaintData = {
        title: form.title.trim(),
        description: form.description.trim(),
        category: backendCategory,
        imageUrl: "placeholder-image-url", // Random string for now
      };

      // Log the request for debugging
      console.log("Submitting complaint:", complaintData);
      console.log("Token exists:", !!localStorage.getItem("token"));

      const response = await createComplaint(complaintData);
      
      console.log("Complaint created successfully:", response);
      
      // Success - navigate back to complaints feed and refresh
      navigate("/student/complaints_feed", { replace: true });
      // Force a page reload to refresh the complaints list
      window.location.reload();
    } catch (err) {
      console.error("Error creating complaint:", err);
      setError(err.message || "Failed to submit complaint. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-200 transition-colors duration-200 min-h-screen flex flex-col">
      <main className="flex-grow w-full max-w-6xl mx-auto px-4 py-8 md:px-8 md:py-12 lg:px-12">
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="group inline-flex items-center text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
          >
            <div className="mr-3 flex items-center justify-center h-10 w-10 rounded-full bg-white dark:bg-slate-800 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 group-hover:ring-primary dark:group-hover:ring-primary transition-all">
              <span className="material-icons-round text-xl">arrow_back</span>
            </div>
            <span className="font-semibold text-lg">Back</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              Complaints
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl leading-relaxed">
              Submit a new issue regarding facilities, academics, or events.
              Please provide as much detail as possible to help us resolve it
              quickly.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-1.5 rounded-xl shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 flex w-full md:w-auto shrink-0">
            <button className="flex-1 md:flex-none md:w-40 bg-primary text-white shadow-md rounded-lg py-3 px-4 text-sm font-semibold transition-all">
              New Complaint
            </button>
            <button className="flex-1 md:flex-none md:w-40 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 py-3 px-4 text-sm font-medium transition-colors">
              My History
            </button>
          </div>
        </div>

        <hr className="border-slate-300 dark:border-slate-700 mb-10 opacity-60" />

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
            <p className="text-red-600 dark:text-red-400 text-sm font-medium">
              {error}
            </p>
          </div>
        )}

        <form action="#" className="space-y-8" method="POST" onSubmit={handleSubmit}>
          <div className="space-y-3">
            <label
              className="block text-base font-semibold text-slate-700 dark:text-slate-300"
              htmlFor="title"
            >
              Complaint Title
            </label>
            <input
              className="block w-full rounded-xl border-0 ring-1 ring-slate-300 dark:ring-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary py-4 px-5 shadow-sm transition-shadow"
              id="title"
              name="title"
              placeholder="e.g., Broken AC in Library"
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-3">
            <label
              className="block text-base font-semibold text-slate-700 dark:text-slate-300"
              htmlFor="category"
            >
              Category
            </label>
            <div className="relative">
              <select
                className="block w-full appearance-none rounded-xl border-0 ring-1 ring-slate-300 dark:ring-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary py-4 px-5 shadow-sm pr-10 cursor-pointer transition-shadow"
                id="category"
                name="category"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
                required
              >
                <option disabled value="">
                  Select a category
                </option>
                <option value="facilities">Facilities</option>
                <option value="academics">Academics</option>
                <option value="events">Events</option>
                <option value="other">Other</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                <span className="material-icons-round text-xl">arrow_drop_down</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label
              className="block text-base font-semibold text-slate-700 dark:text-slate-300"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="block w-full rounded-xl border-0 ring-1 ring-slate-300 dark:ring-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary py-4 px-5 shadow-sm resize-none transition-shadow min-h-[160px]"
              id="description"
              name="description"
              placeholder="Describe the issue in detail..."
              rows="6"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
            ></textarea>
          </div>

          <div className="space-y-3">
            <label className="block text-base font-semibold text-slate-700 dark:text-slate-300">
              Photo Evidence{" "}
              <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`flex-grow flex flex-col justify-center rounded-xl border-2 border-dashed ${
                dragActive
                  ? "border-primary bg-blue-50 dark:bg-slate-800"
                  : "border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-slate-800 hover:border-primary"
              } px-6 py-10 transition-all cursor-pointer group`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
                name="file-upload"
              />
              <div className="space-y-4 text-center">
                <div className="mx-auto h-16 w-16 text-slate-400 dark:text-slate-500 group-hover:text-primary transition-colors flex items-center justify-center rounded-full bg-slate-50 dark:bg-slate-700 shadow-sm">
                  <span className="material-icons-round text-4xl">camera_alt</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-center text-base text-slate-600 dark:text-slate-400">
                    <label
                      className="relative cursor-pointer rounded-md font-bold text-primary hover:text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary flex items-center gap-2"
                      htmlFor="file-upload"
                    >
                      <span className="material-icons-round text-2xl">camera_alt</span>
                      <span>Click to upload</span>
                    </label>
                  </div>
                  <p className="text-base text-slate-500">or drag and drop</p>
                </div>
                <p className="text-xs uppercase font-medium text-slate-400 dark:text-slate-500 tracking-wide">
                  PNG, JPG up to 10MB
                </p>
                {form.photo && (
                  <p className="text-sm text-primary font-medium">
                    {form.photo.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col md:flex-row md:justify-end">
              <button
                className="w-full md:w-auto md:min-w-[240px] flex justify-center items-center py-4 px-8 border border-transparent rounded-xl shadow-lg shadow-blue-500/20 text-lg font-bold text-white bg-primary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Complaint"}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

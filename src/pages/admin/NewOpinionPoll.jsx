import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPoll } from "../../services/api";

export default function NewOpinionPoll() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    question: "",
    choices: ["Yes, definitely", "No, not at all"],
    duration: "24h",
    customDuration: "",
    anonymousResults: true,
    publicRealTimeCounts: false,
  });
  const [submitting, setSubmitting] = useState(false);

  function handleClose() {
    navigate("/admin/dashboard");
  }

  function handleChoiceChange(index, value) {
    const newChoices = [...formData.choices];
    newChoices[index] = value;
    setFormData({ ...formData, choices: newChoices });
  }

  function handleRemoveChoice(index) {
    if (formData.choices.length > 2) {
      const newChoices = formData.choices.filter((_, i) => i !== index);
      setFormData({ ...formData, choices: newChoices });
    }
  }

  function handleAddChoice() {
    setFormData({
      ...formData,
      choices: [...formData.choices, ""],
    });
  }

  function handleDurationChange(duration) {
    setFormData({ ...formData, duration });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return;

    // Validation
    if (!formData.question.trim()) {
      alert("Please enter a poll question");
      return;
    }

    if (formData.choices.length < 2) {
      alert("Please add at least 2 choices");
      return;
    }

    if (formData.choices.some((choice) => !choice.trim())) {
      alert("Please fill in all choices");
      return;
    }

    try {
      setSubmitting(true);

      // Backend PollRequest: question, options, durationHours (int), isAnonymous
      const durationHours =
        formData.duration === "24h"
          ? 24
          : formData.duration === "3d"
          ? 72
          : formData.duration === "1w"
          ? 168
          : 24;

      const payload = {
        question: formData.question.trim(),
        options: formData.choices.map((c) => c.trim()),
        durationHours,
        isAnonymous: formData.anonymousResults,
      };

      await createPoll(payload);
      alert("Poll launched successfully!");
      navigate("/admin/dashboard");
    } catch (err) {
      alert(err.message || "Failed to launch poll");
    } finally {
      setSubmitting(false);
    }
  }

  function handleLaunch() {
    handleSubmit({ preventDefault: () => {} });
  }

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-primary h-16 flex items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <button
            onClick={handleClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <span className="material-icons-outlined text-white">close</span>
          </button>
          <h1 className="text-xl font-bold text-white">New Opinion Poll</h1>
          <button
            onClick={handleLaunch}
            disabled={submitting}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Launching..." : "Launch"}
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 pb-32">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* POLL QUESTION */}
          <section>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
              Poll Question
            </label>
            <textarea
              value={formData.question}
              onChange={(e) =>
                setFormData({ ...formData, question: e.target.value })
              }
              placeholder="What would you like to ask the Gymkhana community?"
              className="w-full min-h-[160px] p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl resize-none text-lg placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-0 focus:border-primary focus:shadow-lg transition-all"
              required
            />
          </section>

          {/* CHOICES */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Choices
              </label>
              <span className="text-xs text-slate-400 dark:text-slate-500">
                MINIMUM 2
              </span>
            </div>
            <div className="space-y-3">
              {formData.choices.map((choice, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={choice}
                    onChange={(e) => handleChoiceChange(index, e.target.value)}
                    className="flex-1 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-base placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-0 focus:border-primary focus:shadow-lg transition-all"
                    placeholder={`Choice ${index + 1}`}
                    required
                  />
                  {formData.choices.length > 2 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveChoice(index)}
                      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
                    >
                      <span className="material-icons-outlined text-slate-500 dark:text-slate-400">
                        close
                      </span>
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddChoice}
              className="mt-4 text-primary font-semibold text-sm flex items-center gap-2 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
            >
              <span className="material-icons-outlined text-lg">add</span>
              Add another option
            </button>
          </section>

          {/* POLL SETTINGS */}
          <section className="space-y-8">
            <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Poll Settings
            </h2>

            {/* Voting Duration */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                Voting Duration
              </label>
              <div className="flex gap-2 mb-2">
                {["24h", "3d", "1w", "Custom"].map((duration) => (
                  <button
                    key={duration}
                    type="button"
                    onClick={() => handleDurationChange(duration)}
                    className={`px-4 py-2.5 rounded-lg font-medium transition-colors ${
                      formData.duration === duration
                        ? "bg-primary text-white"
                        : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-primary"
                    }`}
                  >
                    {duration}
                  </button>
                ))}
              </div>
              {formData.duration === "Custom" ? (
                <input
                  type="text"
                  value={formData.customDuration}
                  onChange={(e) =>
                    setFormData({ ...formData, customDuration: e.target.value })
                  }
                  placeholder="Enter custom duration"
                  className="mt-2 p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg w-full focus:ring-0 focus:border-primary focus:shadow-lg transition-all"
                />
              ) : (
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                  {formData.duration === "24h"
                    ? "24 Hours"
                    : formData.duration === "3d"
                    ? "3 Days"
                    : "1 Week"}
                </p>
              )}
            </div>

            {/* Anonymous Results */}
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Anonymous Results
                </label>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Voter identities will stay private
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.anonymousResults}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      anonymousResults: e.target.checked,
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
              </label>
            </div>

            {/* Public Real-time Counts */}
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Public Real-time Counts
                </label>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Allow users to see counts before voting
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.publicRealTimeCounts}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      publicRealTimeCounts: e.target.checked,
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </section>

          {/* INFO MESSAGE */}
          <div className="p-4 rounded-xl bg-[#FEF2F2] dark:bg-red-950/20 border border-[#FEE2E2] dark:border-red-900/30 flex items-start gap-3">
            <span className="material-icons-outlined text-primary text-xl flex-shrink-0">
              info
            </span>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Polls help the Gymkhana Council make data-driven decisions based on
              student feedback. Ensure your question is clear and neutral.
            </p>
          </div>
        </form>
      </main>

      {/* BOTTOM ACTION BAR */}
      <footer className="fixed bottom-0 left-0 right-0 bg-primary h-16 flex items-center justify-center z-40">
        <button
          onClick={handleLaunch}
          disabled={submitting}
          className="flex items-center gap-2 px-8 py-3 bg-white text-primary font-bold rounded-xl hover:bg-white/90 active:scale-[0.98] transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Launching..." : "Launch Poll"}
          <span className="material-icons-outlined">send</span>
        </button>
      </footer>
    </div>
  );
}

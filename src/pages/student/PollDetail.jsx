import { useState, useMemo } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import StudentNavbar from "../../components/layout/StudentNavbar";
import StudentBottomNav from "../../components/layout/StudentBottomNav";
import StudentFooter from "../../components/layout/StudentFooter";
import { voteOnPoll } from "../../services/api";

export default function PollDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [submitting, setSubmitting] = useState(false);
  const [poll, setPoll] = useState(location.state?.poll ?? null);

  const initialPoll = poll;

  // Basic guard: if user hits this route directly without state, send back
  if (!initialPoll) {
    return (
      <div className="bg-background-light dark:bg-background-dark min-h-screen font-display text-gray-800 dark:text-gray-200 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Poll details are not available. Please open this page from the Opinion Polls list.
          </p>
          <button
            onClick={() => navigate("/student/opinion-polls")}
            className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold"
          >
            Back to Polls
          </button>
        </div>
      </div>
    );
  }

  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);

  // Map backend poll into view model (backend has voteCounts map, not votes array)
  const pollData = useMemo(() => {
    const options = Array.isArray(initialPoll.options) ? initialPoll.options : [];
    const vc = initialPoll.voteCounts;
    const votes = Array.isArray(initialPoll.votes)
      ? initialPoll.votes
      : options.map((_, i) => {
          if (vc && typeof vc === "object") {
            const n = vc[i] ?? vc[String(i)];
            return Number(n ?? 0);
          }
          return 0;
        });
    const totalVotes =
      typeof initialPoll.totalVotes === "number"
        ? initialPoll.totalVotes
        : votes.reduce((sum, v) => sum + v, 0);

    const mappedOptions = options.map((label, index) => {
      const voteCount = votes[index] ?? 0;
      const percentage =
        totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;
      return {
        id: `opt${index}`,
        label: typeof label === "string" ? label : String(label),
        votes: voteCount,
        percentage,
      };
    });

    const expires = initialPoll.expiresAt ? new Date(initialPoll.expiresAt) : null;
    const activeUntil = expires && !Number.isNaN(expires.getTime())
      ? expires.toLocaleString()
      : "N/A";

    return {
      id: initialPoll.id,
      question: initialPoll.question,
      activeUntil,
      options: mappedOptions,
      totalVotes,
    };
  }, [initialPoll]);

  function handleBack() {
    navigate("/student/opinion-polls");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return;

    try {
      setSubmitting(true);
      const updated = await voteOnPoll(pollData.id, selectedOptionIndex);
      if (updated && typeof updated === "object") {
        setPoll(updated);
      }
      alert("Your vote has been recorded.");
    } catch (err) {
      alert(err.message || "Failed to submit vote");
    } finally {
      setSubmitting(false);
    }
  }

  // Sort options by votes (descending) for display
  const sortedOptions = [...pollData.options].sort((a, b) => b.votes - a.votes);

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen font-display text-gray-800 dark:text-gray-200 pb-24 md:pb-10">
      {/* TOP NAVBAR */}
      <StudentNavbar />

      {/* HEADER */}
      <header className="sticky top-16 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
              <span className="material-icons-round block">chevron_left</span>
            </button>
            <h1 className="text-lg font-semibold">Opinion Polls</h1>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT SECTION - POLL OPTIONS */}
          <section className="lg:col-span-7">
            <div className="mb-8">
              <h2 className="serif-heading text-3xl md:text-4xl lg:text-5xl leading-tight mb-4 font-bold">
                {pollData.question}
              </h2>
              <p className="text-rose-500 dark:text-rose-400 font-medium text-sm flex items-center gap-1">
                <span className="material-icons-round text-sm">schedule</span>
                Active until {pollData.activeUntil}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {pollData.options.map((option, index) => (
                <div key={option.id} className="relative">
                  <input
                    type="radio"
                    id={option.id}
                    name="poll-option"
                    value={index}
                    checked={selectedOptionIndex === index}
                    onChange={() => setSelectedOptionIndex(index)}
                    className="hidden custom-radio"
                  />
                  <label
                    htmlFor={option.id}
                    className={`flex items-center p-5 bg-white dark:bg-slate-800 border-2 rounded-xl cursor-pointer hover:border-primary/50 transition-all duration-200 shadow-sm ${
                      selectedOptionIndex === index
                        ? "border-primary bg-primary/5 dark:bg-primary/10"
                        : "border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full border-2 mr-4 flex-shrink-0 transition-all ${
                        selectedOptionIndex === index
                          ? "border-primary border-[5px]"
                          : "border-slate-300 dark:border-slate-600"
                      }`}
                    ></span>
                    <span className="text-lg font-medium">{option.label}</span>
                  </label>
                </div>
              ))}

              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-8 py-4 bg-primary text-white font-bold text-lg rounded-xl shadow-lg shadow-primary/30 hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Submitting..." : "Cast Vote"}
              </button>
            </form>
          </section>

          {/* RIGHT SECTION - LIVE RESULTS */}
          <section className="lg:col-span-5 bg-white dark:bg-slate-800/50 p-6 md:p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="serif-heading text-2xl mb-1 font-bold">Live Results</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  Updated just now • {pollData.totalVotes} total votes
                </p>
              </div>
              <span className="material-icons-round text-primary">analytics</span>
            </div>

            <div className="space-y-8">
              {sortedOptions.map((option, index) => {
                const selectedOption = pollData.options[selectedOptionIndex];
                const isSelected = selectedOption && option.id === selectedOption.id;
                const isLeading = index === 0;
                const opacityClass = isLeading
                  ? "bg-primary"
                  : option.percentage >= 30
                  ? "bg-primary/60 dark:bg-primary/40"
                  : option.percentage >= 15
                  ? "bg-primary/40 dark:bg-primary/20"
                  : "bg-primary/20 dark:bg-primary/10";

                return (
                  <div key={option.id}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold serif-heading text-lg">
                          {option.label}
                        </span>
                        {isSelected && (
                          <span className="material-icons-round text-primary text-base">
                            check_circle
                          </span>
                        )}
                      </div>
                      <span
                        className={`font-bold ${
                          isLeading
                            ? "text-primary"
                            : "text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        {option.percentage}%
                      </span>
                    </div>
                    <div className="h-3 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${opacityClass} rounded-full transition-all duration-1000`}
                        style={{ width: `${option.percentage}%` }}
                      ></div>
                    </div>
                    <p className="mt-1.5 text-xs text-rose-500 dark:text-rose-400 font-medium">
                      {option.votes} votes
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Results are updated in real-time as users cast their votes. This poll is only
                open to registered campus members.
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* DESKTOP FOOTER */}
      <StudentFooter />

      {/* MOBILE BOTTOM NAV */}
      <StudentBottomNav />
    </div>
  );
}

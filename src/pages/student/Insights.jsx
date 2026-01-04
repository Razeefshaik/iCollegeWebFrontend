import StudentNavbar from "../../components/layout/StudentNavbar";
import StudentFooter from "../../components/layout/StudentFooter";
import StudentBottomNav from "../../components/layout/StudentBottomNav";

import InsightCard from "../../components/insights/InsightCard";
import ProgressRow from "../../components/insights/ProgressRow";

export default function Insights() {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen font-display text-gray-800 dark:text-gray-200 pb-24 md:pb-10">

      {/* NAVBAR */}
      <StudentNavbar />

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
            Insights
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl">
            A quick look at your activity.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <InsightCard
            icon="warning"
            title="Complaints Raised"
            value="12"
            color="red"
          />

          <InsightCard
            icon="how_to_vote"
            title="Polls Participated"
            value="8"
            color="green"
          />

          <InsightCard
            icon="visibility"
            title="Contributions Viewed"
            value="45"
            color="purple"
          />

        </div>

        {/* Complaint Status */}
        <div className="bg-card-light dark:bg-card-dark rounded-3xl p-8 shadow-soft border border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
            Complaint Status
          </h2>

          <div className="space-y-6">
            <ProgressRow label="Pending" color="yellow" value={20} />
            <ProgressRow label="In Progress" color="blue" value={45} />
            <ProgressRow label="Resolved" color="green" value={35} />
          </div>
        </div>

      </main>

      {/* DESKTOP FOOTER */}
      <StudentFooter />

      {/* MOBILE BOTTOM NAV */}
      <StudentBottomNav />
    </div>
  );
}

import StudentNavbar from "../../components/layout/StudentNavbar";
import StudentFooter from "../../components/layout/StudentFooter";
import StudentBottomNav from "../../components/layout/StudentBottomNav";
import { useNavigate } from "react-router-dom";

import DashboardCard from "../../components/dashboard/DashboardCard";
import TagButton from "../../components/dashboard/TagButton";
import ActionLink from "../../components/dashboard/ActionLink";

export default function StudentDashboard() {
  const navigate = useNavigate();

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen font-display text-gray-800 dark:text-gray-200 pb-24 md:pb-10">

      {/* TOP NAVBAR */}
      <StudentNavbar />

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Greeting */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
            Hello, Alex <span className="animate-bounce">👋</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl">
            Welcome to your student dashboard. What would you like to do today?
          </p>
        </div>

        {/* Cards Grid*/}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">

          {/* Complaints */}
          <DashboardCard
            variant="red"
            icon="warning"
            title="Complaints"
            description="Report issues regarding infrastructure, mess, or academics. Track status & upvote."
          >
            <div className="flex flex-wrap gap-2">
              <TagButton
                text="New"
                onClick={() => navigate("/student/new_complaints")}
              />
              <TagButton
                text="Track"
                onClick={() => navigate("/student/complaints_feed")}
              />
            </div>
          </DashboardCard>

          {/* Announcements */}
          <DashboardCard
            variant="blue"
            icon="campaign"
            title="Announcements"
            description="Latest news from the student council, administration, and clubs."
          >
            <ActionLink
              text="View Feed"
              onClick={() => navigate("/student/announcements")}
            />
          </DashboardCard>

          {/* Opinions */}
          <DashboardCard
            variant="green"
            icon="poll"
            title="Opinions"
            description="Vote on upcoming events like DJ Night, Cafeteria Menu, and more."
          >
            <ActionLink
              text="View Polls"
              onClick={() => navigate("/student/opinion-polls")}
              className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
            />
          </DashboardCard>

          {/* Contributions */}
          <DashboardCard
            variant="purple"
            icon="volunteer_activism"
            title="Contributions"
            description="See what the Gymkhana and student bodies have achieved this semester."
          >
            <ActionLink
              text="View Report"
              className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
            />
          </DashboardCard>

        </div>
      </main>

      {/* DESKTOP FOOTER */}
      <StudentFooter />

      {/* MOBILE BOTTOM NAV */}
      <StudentBottomNav />
    </div>
  );
}

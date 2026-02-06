import { NavLink } from "react-router-dom";

export default function StudentBottomNav() {
  return (
    <div className="md:hidden fixed bottom-0 w-full bg-white dark:bg-card-dark border-t border-gray-200 dark:border-gray-800 pb-safe pt-2 px-2 z-40">
      <div className="flex justify-around items-end pb-2">

        <MobileItem to="/student/dashboard" icon="dashboard" label="Home" />
        <MobileItem to="/student/insights" icon="history" label="Insights" />


        <MobileItem to="/student/insights" icon="campaign" label="Updates" />
        <MobileItem to="/student/profile" icon="person" label="Profile" />

      </div>
    </div>
  );
}

function MobileItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center gap-1 p-2 w-16 transition-colors ${
          isActive
            ? "text-primary"
            : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        }`
      }
    >
      <span className="material-icons-round text-2xl">{icon}</span>
      <span className="text-[10px] font-medium">{label}</span>
    </NavLink>
  );
}

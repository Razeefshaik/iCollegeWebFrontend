export default function InfoCard({ icon, label, value, color }) {
  const colorMap = {
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    purple:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    green: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    orange:
      "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800/40 p-5 rounded-2xl border border-gray-100 dark:border-gray-800/60 flex items-center gap-4 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800/60">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center ${colorMap[color]}`}
      >
        <span className="material-icons-round">{icon}</span>
      </div>
      <div>
        <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide">
          {label}
        </p>
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  );
}

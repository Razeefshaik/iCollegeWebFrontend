export default function InsightCard({ icon, title, value, color }) {
  const colorMap = {
    red: {
      bg: "bg-red-100 dark:bg-red-900/30",
      text: "text-red-500 dark:text-red-400",
      blob: "bg-red-50 dark:bg-red-900/10",
    },
    green: {
      bg: "bg-green-100 dark:bg-green-900/30",
      text: "text-green-600 dark:text-green-400",
      blob: "bg-green-50 dark:bg-green-900/10",
    },
    purple: {
      bg: "bg-purple-100 dark:bg-purple-900/30",
      text: "text-purple-500 dark:text-purple-400",
      blob: "bg-purple-50 dark:bg-purple-900/10",
    },
  };

  return (
    <div className="group relative bg-card-light dark:bg-card-dark rounded-3xl p-6 shadow-soft border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div
        className={`absolute -top-12 -right-12 w-32 h-32 ${colorMap[color].blob} rounded-full group-hover:scale-110 transition-transform`}
      />
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${colorMap[color].bg} ${colorMap[color].text}`}
        >
          <span className="material-icons-round text-xl">
            {icon}
          </span>
        </div>
        <div>
          <span className="block text-4xl font-bold text-gray-900 dark:text-white mb-1">
            {value}
          </span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </span>
        </div>
      </div>
    </div>
  );
}

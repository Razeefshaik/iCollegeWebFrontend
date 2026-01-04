export default function ProgressRow({ label, color, value }) {
  const barColors = {
    yellow: "bg-yellow-400",
    blue: "bg-blue-500",
    green: "bg-green-500",
  };

  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      
      {/* Label */}
      <div className="flex items-center gap-3 md:w-1/4">
        <span className={`w-2 h-2 rounded-full ${barColors[color]}`} />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full md:w-3/4 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`h-full ${barColors[color]} rounded-full`}
          style={{ width: `${value}%` }}
        />
      </div>

    </div>
  );
}

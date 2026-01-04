export default function DashboardCard({
  icon,
  title,
  description,
  variant = "red",
  children,
}) {
  const styles = {
    red: {
      blob: "bg-red-50 dark:bg-red-900/10",
      iconBg: "bg-red-100 dark:bg-red-900/30",
      iconText: "text-red-500 dark:text-red-400",
    },
    blue: {
      blob: "bg-blue-50 dark:bg-blue-900/10",
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconText: "text-blue-500 dark:text-blue-400",
    },
    green: {
      blob: "bg-green-50 dark:bg-green-900/10",
      iconBg: "bg-green-100 dark:bg-green-900/30",
      iconText: "text-green-600 dark:text-green-400",
    },
    purple: {
      blob: "bg-purple-50 dark:bg-purple-900/10",
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
      iconText: "text-purple-500 dark:text-purple-400",
    },
  };

  const current = styles[variant];

  return (
    <div className="group relative bg-card-light dark:bg-card-dark rounded-3xl p-6 shadow-soft border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-all duration-300">

      {/* Background blob */}
      <div
        className={`absolute -top-12 -right-12 w-40 h-40 ${current.blob} rounded-full transition-transform group-hover:scale-110`}
      />

      <div className="relative z-10">

        {/* Icon */}
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${current.iconBg} ${current.iconText}`}
        >
          <span className="material-icons-round text-2xl">
            {icon}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {title}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 line-clamp-2">
          {description}
        </p>

        {/* Slot */}
        {children}
      </div>
    </div>
  );
}

export default function TagButton({ text, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        bg-gray-100 dark:bg-gray-800
        hover:bg-gray-200 dark:hover:bg-gray-700
        text-gray-700 dark:text-gray-300
        px-4 py-1.5
        rounded-lg
        text-sm font-medium
        transition-colors
      "
    >
      {text}
    </button>
  );
}

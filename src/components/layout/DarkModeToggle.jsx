export default function DarkModeToggle() {
  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button
      onClick={toggleDark}
      className="fixed top-6 right-6 z-50 p-2 rounded-full bg-white dark:bg-card-dark shadow-lg text-gray-600 dark:text-gray-300 hover:scale-110 transition-transform"
    >
      <span className="material-icons-round text-2xl">dark_mode</span>
    </button>
  );
}

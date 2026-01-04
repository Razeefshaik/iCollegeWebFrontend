export default function StudentFooter() {
  return (
    <footer className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mt-8 border-t border-gray-200 dark:border-gray-800">
      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <p>© 2023 Campus Community Platform. All rights reserved.</p>
        <div className="flex space-x-4">
          <a className="hover:text-primary transition-colors cursor-pointer">
            Privacy
          </a>
          <a className="hover:text-primary transition-colors cursor-pointer">
            Terms
          </a>
          <a className="hover:text-primary transition-colors cursor-pointer">
            Help
          </a>
        </div>
      </div>
    </footer>
  );
}

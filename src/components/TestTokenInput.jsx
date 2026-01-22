import { useState } from "react";

/**
 * Temporary component for testing without login
 * Remove this once authentication is implemented
 */
export default function TestTokenInput() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [showInput, setShowInput] = useState(false);

  function handleSaveToken() {
    if (token.trim()) {
      localStorage.setItem("token", token.trim());
      alert("Token saved! You can now test the complaint features.");
      setShowInput(false);
    } else {
      alert("Please enter a valid token");
    }
  }

  function handleClearToken() {
    localStorage.removeItem("token");
    setToken("");
    alert("Token cleared");
  }

  // Only show in development
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 shadow-lg max-w-sm">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-sm font-bold text-yellow-800 dark:text-yellow-200">
            🧪 Test Mode
          </h3>
          <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
            Add a test token to use API features
          </p>
        </div>
        <button
          onClick={() => setShowInput(!showInput)}
          className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-200"
        >
          <span className="material-icons-round text-lg">
            {showInput ? "expand_less" : "expand_more"}
          </span>
        </button>
      </div>

      {showInput && (
        <div className="space-y-2 mt-3">
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Paste your test JWT token here"
            className="w-full px-3 py-2 text-xs border border-yellow-300 dark:border-yellow-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSaveToken}
              className="flex-1 px-3 py-1.5 bg-yellow-600 hover:bg-yellow-700 text-white text-xs font-medium rounded transition-colors"
            >
              Save Token
            </button>
            <button
              onClick={handleClearToken}
              className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-medium rounded transition-colors"
            >
              Clear
            </button>
          </div>
          <p className="text-xs text-yellow-600 dark:text-yellow-400">
            Current: {localStorage.getItem("token") ? "✅ Token set" : "❌ No token"}
          </p>
        </div>
      )}
    </div>
  );
}

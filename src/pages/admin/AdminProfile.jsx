import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import profileImage from "../../assets/images/profile-placeholder.png";
import { getMe } from "../../services/api";

export default function AdminProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getMe();
        setProfile(data);
      } catch (err) {
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center text-gray-500 dark:text-gray-300">
        Loading profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 sm:px-10 py-4 flex items-center gap-4 shadow">
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Back to admin dashboard"
        >
          <span className="material-icons-round">arrow_back_ios_new</span>
        </button>
        <div>
          <h1 className="text-xl font-bold tracking-tight">Admin Profile</h1>
          <p className="text-sm text-red-100">
            Manage your Gymkhana admin account details
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow flex justify-center px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="w-full max-w-4xl">
          <div className="relative bg-card-light dark:bg-card-dark rounded-3xl p-8 md:p-12 shadow-soft border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col items-center gap-8">
            {/* Decorative blobs, similar to student profile */}
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-red-50 dark:bg-red-900/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl opacity-50 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center gap-8 w-full">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-red-100 dark:border-red-800 shadow-lg bg-white dark:bg-gray-900">
                <img
                  src={profileImage}
                  alt={profile?.name || "Admin"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-green-400 border-2 border-white dark:border-gray-800" />
            </div>

            {/* Basic info */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
                {profile?.name || "Gymkhana Admin"}
              </h2>
              <p className="text-sm font-medium uppercase tracking-widest text-red-500 dark:text-red-300">
                {profile?.role || "ADMIN"}
              </p>
              {profile?.scholarId && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Scholar ID: <span className="font-semibold">{profile.scholarId}</span>
                </p>
              )}
            </div>

            {/* Details grid */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <InfoField label="Email" value={profile?.email} />
              <InfoField label="Public Name" value={profile?.publicName} />
              <InfoField label="Department" value={profile?.department} />
              <InfoField label="Phone" value={profile?.phone} />
            </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function InfoField({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex flex-col bg-gray-50 dark:bg-gray-900/40 rounded-2xl px-4 py-3 border border-gray-100 dark:border-gray-700">
      <span className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
        {label}
      </span>
      <span className="mt-1 text-sm font-medium text-gray-900 dark:text-gray-100 break-words">
        {value}
      </span>
    </div>
  );
}


import { useEffect, useState } from "react";

import StudentNavbar from "../../components/layout/StudentNavbar";
import StudentFooter from "../../components/layout/StudentFooter";
import StudentBottomNav from "../../components/layout/StudentBottomNav";
import profileImage from "../../assets/images/profile-placeholder.png";

import InfoCard from "../../components/profile/InfoCard";
import { getMe } from "../../services/api";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    publicName: "",
    email: "",
    phone: "",
    dob: "",
    hostelBlock: "",
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getMe();
        setProfile(data);
        setForm({
          name: data.name || "",
          publicName: data.publicName || "",
          email: data.email || "",
          phone: "",
          dob: "",
          hostelBlock: "",
        });
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
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen font-display text-gray-800 dark:text-gray-200 pb-24 md:pb-10">

      {/* TOP NAVBAR */}
      <StudentNavbar />

      {/* MAIN */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

        <div className="relative bg-card-light dark:bg-card-dark rounded-3xl p-8 md:p-12 shadow-soft border border-gray-100 dark:border-gray-800 overflow-hidden">

          {/* Decorative blobs */}
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-red-50 dark:bg-red-900/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl opacity-50 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">

            {/* Profile Image */}
            <div className="group relative mb-6">
              <div className="w-36 h-36 md:w-44 md:h-44 rounded-full p-1.5 bg-white dark:bg-card-dark shadow-xl ring-4 ring-gray-50 dark:ring-gray-800 overflow-hidden">
                <img
                  src={profileImage}
                  alt={profile.name}
                  className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <button
                title="Change Photo"
                className="absolute bottom-2 right-2 p-2.5 bg-primary hover:bg-primary-hover text-white rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95 border-4 border-white dark:border-card-dark"
              >
                <span className="material-icons-round text-sm">
                  photo_camera
                </span>
              </button>
            </div>

            {/* Name & Meta */}
            <div className="text-center mb-8">
              {isEditing ? (
                <div className="space-y-3 w-full max-w-md">
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-card-dark text-gray-900 dark:text-white text-center font-extrabold text-2xl"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Full name"
                  />
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-card-dark text-gray-700 dark:text-gray-300 text-center"
                    value={form.publicName}
                    onChange={(e) =>
                      setForm({ ...form, publicName: e.target.value })
                    }
                    placeholder="Public name"
                  />
                </div>
              ) : (
                <>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
                    {profile.name}
                  </h1>
                  <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                    {profile.publicName}
                  </p>
                </>
              )}

              <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-400 dark:text-gray-500 font-medium mt-3">
                <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                  ID: {profile.scholarId}
                </span>
                <span className="hidden md:block w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
                <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                  Role: {profile.role}
                </span>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mb-10">
              {isEditing ? (
                <>
                  <div className="space-y-2">
                    <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide">
                      Email Address
                    </p>
                    <input
                      type="email"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-card-dark text-gray-900 dark:text-white"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="Email address"
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide">
                      Phone Number
                    </p>
                    <input
                      type="tel"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-card-dark text-gray-900 dark:text-white"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      placeholder="Phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide">
                      Date of Birth
                    </p>
                    <input
                      type="date"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-card-dark text-gray-900 dark:text-white"
                      value={form.dob}
                      onChange={(e) => setForm({ ...form, dob: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide">
                      Hostel Block
                    </p>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-card-dark text-gray-900 dark:text-white"
                      value={form.hostelBlock}
                      onChange={(e) =>
                        setForm({ ...form, hostelBlock: e.target.value })
                      }
                      placeholder="Hostel block"
                    />
                  </div>
                </>
              ) : (
                <>
                  <InfoCard
                    icon="email"
                    label="Email Address"
                    value={profile.email}
                    color="blue"
                  />
                  <InfoCard
                    icon="call"
                    label="Phone Number"
                    value={form.phone || "Not provided"}
                    color="purple"
                  />
                  <InfoCard
                    icon="cake"
                    label="Date of Birth"
                    value={form.dob || "Not provided"}
                    color="green"
                  />
                  <InfoCard
                    icon="location_on"
                    label="Hostel Block"
                    value={form.hostelBlock || "Not provided"}
                    color="orange"
                  />
                </>
              )}
            </div>

            {/* Edit / Save Buttons */}
            <div className="flex gap-3">
              <button
                className="group flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 px-6 py-2.5 rounded-full font-semibold transition-all hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-md active:scale-95"
                type="button"
                onClick={() => {
                  if (isEditing) {
                    // For now, just update the local profile view.
                    setProfile((prev) => ({
                      ...prev,
                      name: form.name,
                      publicName: form.publicName,
                      email: form.email,
                    }));
                  }
                  setIsEditing(!isEditing);
                }}
              >
                <span className="material-icons-round text-gray-400 group-hover:text-primary transition-colors">
                  {isEditing ? "check" : "edit"}
                </span>
                <span>{isEditing ? "Save" : "Edit Profile"}</span>
              </button>

              {isEditing && (
                <button
                  type="button"
                  className="px-6 py-2.5 rounded-full font-semibold border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95 transition-all"
                  onClick={() => {
                    // Reset form back to profile values and exit edit mode
                    setForm({
                      name: profile.name || "",
                      publicName: profile.publicName || "",
                      email: profile.email || "",
                      phone: form.phone,
                      dob: form.dob,
                      hostelBlock: form.hostelBlock,
                    });
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </button>
              )}
            </div>

          </div>
        </div>
      </main>

      {/* DESKTOP FOOTER */}
      <StudentFooter />

      {/* MOBILE BOTTOM NAV */}
      <StudentBottomNav />
    </div>
  );
}

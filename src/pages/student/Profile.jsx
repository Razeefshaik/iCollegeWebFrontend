import StudentNavbar from "../../components/layout/StudentNavbar";
import StudentFooter from "../../components/layout/StudentFooter";
import StudentBottomNav from "../../components/layout/StudentBottomNav";
import profileImage from "../../assets/images/profile-placeholder.png";
import InfoCard from "../../components/profile/InfoCard";

export default function Profile() {

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
                  alt="Alex Johnson"
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
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
                Alex Johnson
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                Computer Science & Engineering
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-400 dark:text-gray-500 font-medium">
                <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                  ID: CS2023045
                </span>
                <span className="hidden md:block w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
                <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                  3rd Year
                </span>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mb-10">
              <InfoCard
                icon="email"
                label="Email Address"
                value="alex.johnson@campus.edu"
                color="blue"
              />
              <InfoCard
                icon="call"
                label="Phone Number"
                value="+1 (555) 012-3456"
                color="purple"
              />
              <InfoCard
                icon="cake"
                label="Date of Birth"
                value="March 15, 2002"
                color="green"
              />
              <InfoCard
                icon="location_on"
                label="Hostel Block"
                value="Block C, Room 304"
                color="orange"
              />
            </div>

            {/* Edit Button */}
            <button className="group flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 px-6 py-2.5 rounded-full font-semibold transition-all hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-md active:scale-95">
              <span className="material-icons-round text-gray-400 group-hover:text-primary transition-colors">
                edit
              </span>
              <span>Edit Profile</span>
            </button>

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

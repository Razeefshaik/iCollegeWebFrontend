import { useParams, useNavigate } from "react-router-dom";

export default function AnnouncementDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // TEMP DATA (can be replaced with API later)
  const announcements = [
    {
      id: "1",
      title: "Annual Gymkhana Sports Meet 2024",
      category: "Sports",
      priority: "Urgent",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCVD3L7qYuj3E2Lo7RegHBNhMTq_yylR5v2wGFV4nyt_rP74ErxelcJC_7Mg2-q-2Er7vwTkxJr_7R09wOZqdDWvOVAb98ygBqVdvG3erIu2esqZeL4tqdGPNovzNcd31OCAU5-imM9UjzxYd4H2eMC-0VU0xPaDsLwN48BMFGMkFCrVJTZRAIs81rABWzh62c_qQ3GvSWeUWwEWq6Eh3-m34ZskPvTV-hZUOG3V02DINGZ5z9tCuQlQTVuMv4YKiKMMp3omjmgLI99",
      publishedBy: "Admin Office",
      publishedAt: "October 24, 2023 • 10:45 AM",
      content: [
        "We are thrilled to announce the upcoming Annual Gymkhana Sports Meet 2024. This year's event promises to be our biggest yet, featuring over 15 competitive disciplines including track and field, swimming, basketball, and table tennis.",
        "The meet is scheduled to take place from November 15th to November 20th. All undergraduate and postgraduate students are eligible to participate. The event aims to foster a spirit of healthy competition and sportsmanship among the campus community.",
        "Detailed rules and regulations for each sport have been attached below. Please ensure you review the eligibility criteria before registering through the portal. For any queries, reach out to the Sports Secretary at the Gymkhana office.",
      ],
      registrationDeadline: "Nov 5, 2024",
      openingCeremony: "Main Stadium, 9:00 AM",
      medicalForms: "Mandatory submission",
    },
  ];

  const announcement = announcements.find(
    (a) => String(a.id) === id
  );

  if (!announcement) {
    return (
      <p className="p-6 text-slate-500">
        Announcement not found
      </p>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="w-full px-4 sm:px-8 lg:px-12">
          <div className="flex items-center gap-6 h-20">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
              <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">
                arrow_back
              </span>
            </button>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-sm">
                  school
                </span>
              </div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200 tracking-tight">
                Announcement Details
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <main className="w-full">
        <div className="w-full h-[50vh] min-h-[400px] relative overflow-hidden">
          <img
            src={announcement.image}
            alt={announcement.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <div className="absolute bottom-0 left-0 w-full p-8 sm:p-12 lg:p-16">
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-600 text-white text-xs font-bold tracking-wider uppercase">
                <span className="material-symbols-outlined text-sm">
                  emoji_events
                </span>
                {announcement.category}
              </span>

              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-red-600 text-white text-xs font-bold tracking-wider uppercase">
                <span className="material-symbols-outlined text-sm">
                  emergency
                </span>
                {announcement.priority}
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight max-w-6xl">
              {announcement.title}
            </h2>
          </div>
        </div>

        {/* CONTENT */}
        <div className="w-full px-4 sm:px-8 lg:px-16 py-12">
          <article className="w-full">
            {/* META */}
            <div className="flex items-center gap-4 mb-10 pb-8 border-b border-slate-200">
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                <span className="material-symbols-outlined">
                  account_balance
                </span>
              </div>
              <div>
                <p className="text-lg font-semibold">
                  Published by {announcement.publishedBy}
                </p>
                <p className="text-sm text-slate-500 uppercase tracking-widest">
                  {announcement.publishedAt}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* LEFT CONTENT */}
              <div className="lg:col-span-2 text-[18px] leading-[1.9] text-slate-600 space-y-8">
                <p>
                  We are thrilled to announce the upcoming{" "}
                  <span className="text-blue-600 font-semibold">
                    {announcement.title}
                  </span>
                  . This year's event promises to be our biggest yet,
                  featuring over 15 competitive disciplines including track
                  and field, swimming, basketball, and table tennis.
                </p>

                <p>
                  The meet is scheduled to take place from{" "}
                  <span className="font-semibold text-slate-900">
                    November 15th to November 20th
                  </span>
                  . All undergraduate and postgraduate students are eligible
                  to participate. The event aims to foster a spirit of healthy
                  competition and sportsmanship among the campus community.
                </p>

                <p>
                  Detailed rules and regulations for each sport have been
                  attached below. Please ensure you review the eligibility
                  criteria before registering through the portal. For any
                  queries, reach out to the Sports Secretary at the Gymkhana
                  office.
                </p>
              </div>

              {/* RIGHT SIDEBAR */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 p-8 bg-blue-50 border border-blue-100 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-3 mb-8">
                    <span className="material-symbols-outlined text-blue-600 text-3xl font-light">
                      calendar_month
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900">
                      Key Information
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <Info
                      label="Registration Deadline"
                      value={announcement.registrationDeadline}
                      danger
                    />
                    <Info
                      label="Opening Ceremony"
                      value={announcement.openingCeremony}
                    />
                    <Info
                      label="Medical Forms"
                      value={announcement.medicalForms}
                    />
                  </div>

                  <button className="mt-10 w-full py-4 bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-200 transition-all">
                    <span className="material-symbols-outlined text-lg">
                      edit
                    </span>
                    Edit Details
                  </button>
                </div>
              </div>
            </div>

            {/* SEPARATION LINE */}
            <hr className="my-16 border-slate-100 dark:border-slate-800" />

            {/* ATTACHMENTS SECTION */}
            <div className="mt-8">
              <div className="flex items-center gap-3 mb-10 text-slate-900 dark:text-slate-100">
                <span className="material-symbols-outlined text-4xl -rotate-45 font-light">
                  attachment
                </span>
                <h3 className="text-4xl font-bold tracking-tight">
                  Attachments
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* PDF Card */}
                <div className="flex items-center justify-between p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm hover:bg-[#F8FAFC] hover:border-blue-200 transition-all cursor-pointer group">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-[#FFF1F1] dark:bg-red-950/30 rounded-2xl flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#F44336] text-3xl">
                        picture_as_pdf
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-xl text-slate-800 dark:text-slate-200">
                        Sports_Rulebook_2024.pdf
                      </p>
                      <p className="text-[13px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">
                        2.4 MB • PDF DOCUMENT
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-blue-500 mr-2 group-hover:scale-110 transition-transform">
                    download
                  </span>
                </div>

                {/* WORD Card */}
                <div className="flex items-center justify-between p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm hover:bg-[#F8FAFC] hover:border-blue-200 transition-all cursor-pointer group">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-[#F0F7FF] dark:bg-blue-950/30 rounded-2xl flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#2196F3] text-3xl">
                        description
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-xl text-slate-800 dark:text-slate-200">
                        Schedule_Overview.docx
                      </p>
                      <p className="text-[13px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">
                        856 KB • WORD DOCUMENT
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-blue-500 mr-2 group-hover:scale-110 transition-transform">
                    download
                  </span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}

function Info({ label, value, danger }) {
  return (
    <div className="pb-6 border-b border-blue-100 last:border-b-0">
      <span className="text-xs tracking-widest uppercase text-slate-500">
        {label}
      </span>
      <p
        className={`mt-1 text-lg font-semibold ${
          danger ? "text-red-600" : "text-slate-900"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
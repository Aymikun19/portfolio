import type { SiteContent } from "./types";

const GH = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "oreoluwa-olopade";
const repo = (name: string) => `https://github.com/${GH}/${name}`;

// Seed content. Everything here can be edited from /admin once deployed.
export const defaultContent: SiteContent = {
  profile: {
    name: "Olopade Oreoluwa Daniel",
    title: "Full-Stack Developer · Data & AI",
    tagline:
      "I build fast, data-driven web apps with Next.js and Supabase, and I'm digging deep into data science.",
    about:
      "I'm a Computer Science undergraduate who ships real products. I build client websites at Lightiverse, completed a four-month AI internship at CodeAlpha, and lead technical bootcamps as Technical Lead of the AWS Student Builder Group. I like owning a feature end to end: the interface, the database, the auth and the deploy. Lately I've been spending a lot of time on big-data tooling like Spark, and on making recommendation systems fairer.",
    location: "Nigeria",
    email: "ayomikunolopade19@gmail.com",
    github: `https://github.com/${GH}`,
    linkedin: "",
    resumeUrl: "",
    availability: "Open to internships (SIWES), contract and remote roles",
  },
  skills: [
    { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML & CSS"] },
    { group: "Backend & Data", items: ["Supabase", "PostgreSQL", "SQL", "REST APIs", "MongoDB"] },
    { group: "Data & ML", items: ["Python", "pandas", "scikit-learn", "Spark MLlib", "Streamlit"] },
    { group: "Tools", items: ["Git & GitHub", "Vercel", "Resend"] },
  ],
  experience: [
    {
      role: "Web Developer",
      org: "Lightiverse",
      period: "Present",
      points: ["Build and maintain client websites, from design brief to launch."],
    },
    {
      role: "AI Intern",
      org: "CodeAlpha (Remote)",
      period: "4 months",
      points: ["Delivered AI/ML project tasks during a four-month remote internship."],
    },
  ],
  leadership: [
    {
      role: "Technical Lead & Bootcamp Director",
      org: "AWS Student Builder Group",
      period: "Aug 2026 – Present",
      points: ["Plan and run hands-on bootcamps and builder events such as “Launchpad: Build with AWS”."],
    },
    {
      role: "Co-founder & Vice-President",
      org: "Tech Academia (NACOS RUN)",
      period: "Mar 2026",
      points: ["Co-founded a student tech club focused on practical, project-based learning."],
    },
    {
      role: "ICT Director",
      org: "NACOS RUN",
      period: "Until 2026",
      points: ["Led the association's ICT activities and digital presence."],
    },
  ],
  projects: [
    {
      id: "siwes-logbook",
      title: "SIWES Logbook",
      description:
        "A digital industrial-training logbook. Students log daily work, supervisors review and sign off each week, and the whole logbook exports to a printable PDF.",
      tech: ["Next.js", "Supabase", "Row Level Security", "Tailwind"],
      category: "fullstack",
      repo: repo("siwes-logbook"),
      live: "",
      featured: true,
    },
    {
      id: "event-checkin",
      title: "EventPass: QR Check-in",
      description:
        "Event registration that emails each attendee a QR ticket through Resend, plus a phone-friendly scanner page for door check-in and a live attendance count.",
      tech: ["Next.js", "Supabase", "Resend", "QR codes"],
      category: "fullstack",
      repo: repo("eventpass"),
      live: "",
      featured: true,
    },
    {
      id: "naira-split",
      title: "NairaSplit",
      description:
        "Split shared bills with friends in naira. Tracks who paid what and works out the fewest transfers needed to settle up.",
      tech: ["Next.js", "Supabase", "TypeScript", "Vitest"],
      category: "fullstack",
      repo: repo("naira-split"),
      live: "",
      featured: true,
    },
    {
      id: "campus-market",
      title: "CampusMart",
      description:
        "A student marketplace for buying and selling within campus, with listings, image uploads, search, filters and WhatsApp contact links.",
      tech: ["Next.js", "Supabase Storage", "Postgres full-text search"],
      category: "fullstack",
      repo: repo("campus-mart"),
      live: "",
      featured: false,
    },
    {
      id: "study-rooms",
      title: "StudyRooms",
      description:
        "Realtime study rooms with live chat, shared Pomodoro timers and presence indicators showing who is online.",
      tech: ["Next.js", "Supabase Realtime", "Presence"],
      category: "fullstack",
      repo: repo("study-rooms"),
      live: "",
      featured: false,
    },
    {
      id: "snip-links",
      title: "Snip: Link Shortener + Analytics",
      description:
        "Short links with click analytics: daily clicks, top referrers and device breakdowns, charted per link.",
      tech: ["Next.js", "Supabase", "Recharts"],
      category: "fullstack",
      repo: repo("snip-links"),
      live: "",
      featured: false,
    },
    {
      id: "job-tracker",
      title: "HuntBoard: Job Application Tracker",
      description:
        "A drag-and-drop kanban board for job applications with stages, follow-up reminders and a pipeline summary.",
      tech: ["Next.js", "Supabase", "dnd-kit"],
      category: "fullstack",
      repo: repo("huntboard"),
      live: "",
      featured: false,
    },
    {
      id: "churn-predictor",
      title: "Customer Churn Predictor",
      description:
        "An end-to-end ML project on the IBM Telco churn dataset covering exploratory analysis, a tuned scikit-learn pipeline and a Streamlit app that scores customers.",
      tech: ["Python", "pandas", "scikit-learn", "Streamlit"],
      category: "data",
      repo: repo("churn-predictor"),
      live: "",
      featured: true,
    },
    {
      id: "sales-sql-analytics",
      title: "Retail Sales SQL Analytics",
      description:
        "Business questions answered in SQL with DuckDB on a retail dataset, covering cohorts, RFM segmentation and revenue trends, with an automated report.",
      tech: ["SQL", "DuckDB", "Python", "Matplotlib"],
      category: "data",
      repo: repo("retail-sql-analytics"),
      live: "",
      featured: false,
    },
    {
      id: "movie-recs",
      title: "Movie Recommender (Collaborative Filtering)",
      description:
        "Matrix-factorisation recommender on MovieLens with offline evaluation (RMSE, precision@k) and a popularity-bias check.",
      tech: ["Python", "NumPy", "pandas", "Streamlit"],
      category: "data",
      repo: repo("movie-recommender"),
      live: "",
      featured: false,
    },
  ],
};

import type { SiteContent } from "./types";

const GH = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "Aymikun19";
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
      live: "https://siwes-logbook-taupe.vercel.app",
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
      live: "https://eventpass-beige-nine.vercel.app",
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
      live: "https://naira-split.vercel.app",
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
      live: "https://campus-mart-red.vercel.app",
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
      live: "https://study-rooms-eight.vercel.app",
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
      live: "https://snip-links-five.vercel.app",
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
      live: "https://huntboard-khaki.vercel.app",
      featured: false,
    },
    {
      id: "churn-predictor",
      title: "Customer Churn Predictor",
      description:
        "End-to-end ML on 7,043 telecom customers: EDA, three models compared with cross-validation (ROC-AUC 0.845), out-of-fold threshold tuning and a Streamlit risk scorer.",
      tech: ["Python", "pandas", "scikit-learn", "Streamlit"],
      category: "data",
      repo: repo("churn-predictor"),
      live: "https://oreoluwa-churn-predictor.streamlit.app",
      image: "/projects/shots/churn-predictor.webp",
      featured: true,
    },
    {
      id: "music-store-sql",
      title: "Music Store SQL Analytics",
      description:
        "Seven business questions answered in SQL on the Chinook store database: revenue trends, a genre Pareto analysis, RFM segmentation and cohort retention, plus an auto-generated report and reconciliation tests.",
      tech: ["SQL", "Window functions", "Python", "pandas"],
      category: "data",
      repo: repo("music-store-sql-analytics"),
      live: "https://oreoluwa-sql-analytics.streamlit.app",
      image: "/projects/shots/music-store-sql.webp",
      featured: false,
    },
    {
      id: "movie-recs",
      title: "Movie Recommender (ALS from scratch)",
      description:
        "Matrix factorisation written in NumPy and evaluated on users' future ratings. It shows that low RMSE doesn't mean good recommendations, and a trending-aware hybrid beats every baseline on recall@10.",
      tech: ["Python", "NumPy", "Recommender systems", "Streamlit"],
      category: "data",
      repo: repo("movie-recommender"),
      live: "https://oreoluwa-movie-recommender.streamlit.app",
      image: "/projects/shots/movie-recs.webp",
      featured: false,
    },
  ],
};

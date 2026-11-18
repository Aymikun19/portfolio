import type { SiteContent } from "./types";

const GH = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "Aymikun19";
const repo = (name: string) => `https://github.com/${GH}/${name}`;

// Seed content. Everything here can be edited from /admin once deployed.
export const SEED_VERSION = 5;

export const defaultContent: SiteContent = {
  seedVersion: SEED_VERSION,
  profile: {
    name: "Olopade Oreoluwa Daniel",
    alias: "Senpai",
    title: "Full-Stack Developer · Data & AI · Graphic Designer",
    tagline:
      "I build fast, data-driven web apps with Next.js and Supabase, and I'm digging deep into data science.",
    about:
      "I'm a Computer Science undergraduate at Redeemer's University who ships real products. I'm on the technical team at CGHDS, I build client websites at Lightiverse, and I built my faculty association's first-ever digital elections. I completed a four-month AI internship at CodeAlpha and lead hands-on bootcamps as Technical Lead of the AWS Student Builder Group. I like owning a feature end to end: the interface, the database, the auth and the deploy. Lately I've been going deep on big-data tooling like Spark and on making recommendation systems fairer.",
    location: "Nigeria",
    email: "ayomikunolopade19@gmail.com",
    github: `https://github.com/${GH}`,
    linkedin: "",
    resumeUrl: "",
    photo: "/me.webp",
    availability: "Open to internships (SIWES), contract and remote roles",
  },
  skills: [
    { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML & CSS"] },
    { group: "Backend & Data", items: ["Supabase", "PostgreSQL", "SQL", "REST APIs", "MongoDB"] },
    { group: "Data & ML", items: ["Python", "pandas", "scikit-learn", "Spark MLlib", "Streamlit"] },
    { group: "AI tools", items: ["Claude", "ChatGPT", "Gemini", "Nano Banana", "Claude Code", "GitHub Copilot", "Perplexity"] },
    { group: "Design", items: ["Graphic design", "Canva", "Claude Design", "Flyers & social posts", "Brand assets"] },
    { group: "Tools", items: ["Git & GitHub", "Vercel", "Resend"] },
  ],
  experience: [
    {
      role: "Technical Team Member",
      org: "CGHDS, Redeemer's University",
      period: "Jan 2026 – Present",
      points: [
        "Part of the technical team that built and maintains the centre's website (cghds-nine.vercel.app).",
      ],
    },
    {
      role: "Web Designer",
      org: "Lightiverse",
      period: "Nov 2024 – Present",
      points: ["Help design and build websites for clients, from design brief to launch."],
    },
    {
      role: "AI Intern",
      org: "CodeAlpha (Remote)",
      period: "Sep 2025 – Dec 2025",
      points: [
        "Built a multi-language translation tool in Python, migrating off a deprecated library mid-project.",
        "Built an FAQ chatbot with Python and Streamlit; both projects are published on GitHub.",
      ],
    },
  ],
  leadership: [
    {
      role: "SRC Member, Prophet Moses Hall constituency",
      org: "Students' Representative Council, Redeemer's University",
      period: "Nov 2026 – Present",
      points: ["Represent the residents of Prophet Moses Hall in the Students' Representative Council."],
    },
    {
      role: "Honourable Member",
      org: "RUNSA Legislative Council, Redeemer's University",
      period: "Present",
      points: ["Serve as a member of the students' union legislative arm."],
    },
    {
      role: "Technical Lead & Bootcamp Director",
      org: "AWS Student Builder Group",
      period: "Aug 2026 – Present",
      points: ["Plan and run hands-on bootcamps and builder events such as “Launchpad: Build with AWS”."],
    },
    {
      role: "ICT Director",
      org: "NACOS RUN",
      period: "Dec 2025 – Nov 2026",
      points: [
        "Led the association's ICT activities and digital presence.",
        "Built and ran the association's first-ever digital elections (elections.runacos.com) for the 2026/27 executive council.",
      ],
    },
    {
      role: "Co-founder & Vice-President",
      org: "Tech Academia (NACOS RUN)",
      period: "Mar 2026 – Nov 2026",
      points: ["Co-founded a student tech club focused on practical, project-based learning."],
    },
  ],
  projects: [
    {
      id: "runacos-elections",
      title: "NACOS RUN Digital Elections",
      description:
        "The first-ever digital elections for my faculty's student association (RUNACOS), used to elect the 2026/27 executive council. Fresh students sign in with their matric or JAMB number, continuing students verify with a one-time code sent to their school email, and organisers run the election from an admin console.",
      tech: ["Next.js", "Vercel"],
      category: "fullstack",
      repo: "",
      live: "https://elections.runacos.com",
      image: "/projects/shots/runacos-elections.webp",
      featured: true,
      highlights: ["Two sign-in paths: fresh students verify with their name and matric or JAMB number; continuing students get a one-time code at their school email.", "One secret ballot per verified voter.", "An organiser console to run the election.", "Used for the association's first-ever digital elections, for the 2026/27 executive council."],
    },
    {
      id: "cghds-website",
      title: "CGHDS Website",
      description:
        "The official website of the Centre for Gender, Humanitarian & Development Studies at Redeemer's University, built by the centre's four-person technical team, which I joined in January 2026. Covers programmes, events, staff, a gallery, publications and an admin portal, with light and dark themes.",
      tech: ["Next.js", "Vercel"],
      category: "fullstack",
      repo: "",
      live: "https://cghds-nine.vercel.app",
      image: "/projects/shots/cghds-website.webp",
      featured: true,
      highlights: ["Programmes, events, staff directory, gallery and publications for the Centre for Gender, Humanitarian & Development Studies.", "Admin portal so the centre's staff can update content themselves.", "Light and dark themes with a responsive, editorial design.", "Built and maintained with the centre's four-person technical team."],
    },
    {
      id: "siwes-logbook",
      title: "SIWES Logbook",
      description:
        "A digital industrial-training logbook. Students log daily work, supervisors review and sign off each week, and the whole logbook exports to a printable PDF.",
      tech: ["Next.js", "Supabase", "Row Level Security", "Tailwind"],
      category: "fullstack",
      repo: repo("siwes-logbook"),
      live: "https://siwes-logbook-taupe.vercel.app",
      image: "/projects/shots/siwes-logbook.webp",
      featured: true,
      highlights: ["Students log daily activities, hours and skills; entries group into weeks automatically.", "Supervisors approve weeks or request changes, enforced with Postgres row-level security.", "Progress dashboard: hours per week, an activity heatmap, logging streak and a skills summary.", "Edit entries, export to CSV, or print a school-ready logbook."],
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
      image: "/projects/shots/event-checkin.webp",
      featured: true,
      highlights: ["Public registration pages with capacity limits enforced in a Postgres function.", "QR tickets emailed through Resend, scanned at the door from any phone camera.", "Live dashboard with check-in rate, arrivals timeline and a searchable guest list with manual check-in.", "Share kit with a downloadable QR code, attendee CSV export and add-to-calendar files."],
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
      image: "/projects/shots/naira-split.webp",
      featured: true,
      highlights: ["Money stored in integer kobo, so splits are exact.", "Split equally, by exact amounts or by percentages, with live validation.", "Greedy settle-up algorithm that clears every debt in at most n-1 transfers, covered by unit tests.", "Balance chart, spending insights, invite links and CSV export."],
    },
    {
      id: "campus-market",
      title: "CampusMart",
      description:
        "A student marketplace with photo galleries, in-app buyer-seller chat with voice notes and photos, full-text search, and sales that the buyer confirms.",
      tech: ["Next.js", "Supabase Realtime", "Supabase Storage", "Postgres full-text search", "MediaRecorder"],
      category: "fullstack",
      repo: repo("campus-mart"),
      live: "https://campus-mart-red.vercel.app",
      image: "/projects/shots/campus-market.webp",
      featured: true,
      highlights: ["Realtime buyer-seller conversations with text, photo and voice-note messages, an inbox with unread markers and private, participant-only media storage.", "Sellers mark who bought an item and the buyer confirms receipt; a database trigger stops anyone else from confirming or changing a confirmed sale.", "Up to five photos per listing with a gallery, plus weighted Postgres full-text search, filters, sorting and pagination.", "Seller dashboard with sales stats, editing and confirmation status, and WhatsApp contact as a fallback."],
    },
    {
      id: "study-rooms",
      title: "StudyRooms",
      description:
        "Public and password-protected study rooms with live chat, voice notes, file sharing, presence and a shared Pomodoro timer whose focus and break lengths anyone in the room can adjust.",
      tech: ["Next.js", "Supabase Realtime", "Storage", "pgcrypto", "MediaRecorder"],
      category: "fullstack",
      repo: repo("study-rooms"),
      live: "https://study-rooms-eight.vercel.app",
      image: "/projects/shots/study-rooms.webp",
      featured: true,
      highlights: ["Private rooms with bcrypt-hashed passwords, rate-limited joins and membership enforced by row-level security on messages, timer updates and storage.", "Voice notes recorded in the browser and files up to 10 MB, stored in a private bucket and served through short-lived signed URLs.", "Shared Pomodoro timer derived from a server start time, with an alarm-style editor for focus and break lengths.", "Live chat, presence and typing indicators over one Supabase Realtime channel, plus sound and browser alerts when a phase ends."],
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
      image: "/projects/shots/snip-links.webp",
      featured: false,
      highlights: ["Custom or generated slugs with reserved-word protection.", "Click tracking in a security-definer Postgres function, with bot and link-preview detection.", "Per-link analytics (daily clicks, referrers, devices, countries) and an all-links overview with sparklines.", "QR codes as PNG and SVG, editable destinations and CSV export of raw clicks."],
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
      image: "/projects/shots/job-tracker.webp",
      featured: false,
      highlights: ["Drag-and-drop kanban with optimistic updates (dnd-kit).", "Follow-up reminders with done and snooze actions.", "Insights page: cumulative funnel with stage conversions, applications per week, top companies.", "Search, filters, a details drawer and CSV import and export."],
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
      highlights: ["Compared three models with stratified cross-validation; logistic regression reached a test ROC-AUC of 0.845.", "Decision threshold tuned on out-of-fold predictions, not the test set.", "Exact per-customer explanations: each feature's contribution to the log-odds, verified by a unit test.", "What-if analysis, batch CSV scoring with revenue at risk, and a model performance tab."],
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
      highlights: ["Seven business questions answered with CTEs, window functions and cohort queries.", "RFM segmentation and genre Pareto analysis, with results reconciled by tests.", "Interactive dashboard of revenue, genres, countries, segments and retention.", "A read-only SQL playground hardened with SQLite read-only mode, an authorizer and a query time limit."],
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
      highlights: ["ALS matrix factorisation written from scratch in NumPy.", "Evaluated on users' future ratings, showing that low RMSE does not mean good top-10 lists.", "Trending-aware hybrid that beats every baseline on recall@10.", "Explained recommendations, genre and year filters, similar-movie search and a taste profile."],
    },
  ],
};

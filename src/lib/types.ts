export type Profile = {
  name: string;
  title: string;
  tagline: string;
  about: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  availability: string;
  /** Profile photo: a /public path, a stored media key ("media/…"), or "" for none. */
  photo?: string;
};

export type SkillGroup = { group: string; items: string[] };

export type Experience = {
  role: string;
  org: string;
  period: string;
  points: string[];
};

export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  category: "fullstack" | "data";
  repo: string;
  live: string;
  /** Screenshot: a /public path, a stored media key ("media/…"), or "". */
  image?: string;
  featured: boolean;
  /** Bullet points for the case-study page. */
  highlights?: string[];
};

export type SiteContent = {
  /** Version of the seed content this document has been migrated to. */
  seedVersion?: number;
  /** Ids of built-in projects deleted from /admin, so migrations don't bring them back. */
  hiddenProjects?: string[];
  profile: Profile;
  skills: SkillGroup[];
  experience: Experience[];
  leadership: Experience[];
  projects: Project[];
};

export type Reply = { body: string; sentAt: string; ok: boolean; error?: string };

export type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
  replies: Reply[];
};

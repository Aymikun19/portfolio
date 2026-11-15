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
  featured: boolean;
};

export type SiteContent = {
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

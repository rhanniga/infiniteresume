interface ContactInfo {
  name: string;
  phone?: string;
  email?: string;
  github?: string;
  linkedin?: string;
  website?: string;
}

interface Summary {
  text: string;
  keywords: string[];
}

interface Bullet {
  text: string;
  keywords: string[];
}

interface Job {
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string;

  bullets: Bullet[];
}

interface Education {
  institution: string;
  location: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;

  bullets: Bullet[];
}

interface Project {
  name: string;
  link: string;
  bullets: Bullet[];
}

interface Skill {
  name: string;
  experience: "skilled" | "experienced" | "expert";
}

interface Resume {
  contactInfo: ContactInfo;

  summaries: Summary[];
  educations: Education[];
  jobs: Job[];
  projects: Project[];
  skills: Skill[];
}

// UI Types
export type SidebarSection = 'instructions' | 'contactInfo' | 'summaries' | 'jobs' | 'projects' | 'educations' | 'skills';

export interface OptimizationResult {
  score: number;
  optimizedResume: Resume;
  keywordMatches: string[];
}

export interface ScoredItem {
  item: any;
  score: number;
  keywordMatches: string[];
}

export type {
  ContactInfo,
  Summary,
  Bullet,
  Job,
  Education,
  Project,
  Skill,
  Resume
};

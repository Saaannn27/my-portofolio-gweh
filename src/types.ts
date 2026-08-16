export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  role: string;
  tech: string[];
  pillar: 'WEB DEV' | 'MOBILE' | 'DATA' | 'DESKTOP' | 'AR';
  image: string;
  imageAlt: string;
  featured?: boolean;
  gridSpan?: string;
  overview?: {
    problem: string;
    solution: string;
  };
  technicalDive?: {
    title: string;
    tag: string;
    description: string;
  }[];
  gallery?: {
    image: string;
    title: string;
    description: string;
    orientation?: 'landscape' | 'portrait';
  }[];
  metrics?: {
    label: string;
    value: string;
  }[];
  liveDemoAvailable?: boolean;
}

export interface SkillCategory {
  id: string;
  number: string;
  title: string;
  description: string;
  skills: {
    name: string;
    level: string;
    highlight?: boolean;
  }[];
}

export type ThemeMode = 'dark' | 'light';

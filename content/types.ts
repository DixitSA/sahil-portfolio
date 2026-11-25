/**
 * Content contract. Single source of truth for every surface:
 * every section of the page, the case studies, and metadata.
 * Nothing renders content that does not originate here.
 */

export type ProjectStatus = "LIVE" | "BUILD" | "ARCHIVED";

/** featured = full case study window. listed = plaintext row, no case study. */
export type ProjectTier = "featured" | "listed";

export interface CaseStudySection {
  heading: string;
  body: string[];
}

export interface CaseStudy {
  /** One paragraph. What was actually hard. */
  problem: string;
  /** The build. Ordered sections. */
  sections: CaseStudySection[];
  /** Concrete results. Numbers where they exist. */
  outcome: string[];
}

export interface Project {
  slug: string;
  name: string;
  tier: ProjectTier;
  status: ProjectStatus;
  /** One line, used in list rows and spotlight. */
  summary: string;
  tags: string[];
  /** Live product URL, if shipped. */
  href?: string;
  /** Source repository. */
  repo?: string;
  /** Screenshot under /public. Only featured projects have one. */
  preview?: string;
  /** Intrinsic pixel size of `preview`. Required to avoid layout shift. */
  previewSize?: { w: number; h: number };
  /** Present only when tier === "featured". */
  caseStudy?: CaseStudy;
}

export interface Workstream {
  /** Program name, e.g. "Customer Complaints AI Program". */
  name: string;
  /** Short discipline label, e.g. "AI model governance". */
  focus: string;
  bullets: string[];
}

export interface Role {
  id: string;
  company: string;
  title: string;
  location: string;
  period: string;
  current: boolean;
  /** Flat bullets. Empty when the role is described by workstreams instead. */
  bullets: string[];
  /** Named programs within the role, each with its own bullets. */
  workstreams?: Workstream[];
}

export interface Profile {
  name: string;
  title: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  available: boolean;
  /** Two or three sentences. Specific, no filler. */
  bio: string[];
  education: {
    school: string;
    degree: string;
    detail: string;
    graduated: string;
  };
  stats: { label: string; value: string; sub: string }[];
  /**
   * "What I'm working on" tile. Freshness is the one thing a static
   * portfolio cannot fake.
   */
  now?: { updated: string; items: string[] };
  skills: { group: string; items: string[] }[];
}


/**
 * Content contract. Single source of truth for every surface:
 * desktop icons, Finder rows, window bodies, spotlight results, and metadata.
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

export interface Role {
  id: string;
  company: string;
  title: string;
  location: string;
  period: string;
  current: boolean;
  bullets: string[];
}

export interface Profile {
  name: string;
  title: string;
  location: string;
  email: string;
  github: string;
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
  /** "Now" tile. Freshness is the one thing a static portfolio cannot fake. */
  now?: { updated: string; items: string[] };
  skills: { group: string; items: string[] }[];
}

/**
 * Virtual filesystem. Drives desktop icons and the Finder window.
 * `window` nodes open an in-OS route. `file` nodes open a real URL.
 */
export type FSNode =
  | { kind: "folder"; name: string; route: string; children: FSNode[] }
  | { kind: "window"; name: string; route: string }
  | { kind: "file"; name: string; href: string; external?: boolean };

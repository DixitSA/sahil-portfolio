/**
 * Content barrel. Every surface imports from here, never from the
 * individual modules, so the content contract has exactly one entry point.
 */

export type {
  ProjectStatus,
  ProjectTier,
  CaseStudySection,
  CaseStudy,
  Project,
  Role,
  Profile,
  FSNode,
} from "./types";

export {
  projects,
  featuredProjects,
  listedProjects,
  getProject,
} from "./projects";

export { roles, getRole } from "./experience";

export { profile, githubUrl, githubHandle } from "./profile";

export { desktop } from "./fs";

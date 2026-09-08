import type { FSNode } from "./types";
import { projects } from "./projects";
import { roles } from "./experience";

/**
 * Virtual filesystem. Desktop icons and the Finder window read from this tree,
 * so neither can drift from the project and role data.
 *
 * ~/
 *   Start Here.md  the reading path, first because a recruiter reads top down
 *   Work/          one window per project
 *   Experience/    one window per role
 *   About.md
 *   Resume.pdf     a real PDF, not a simulated one
 *   Contact.app
 */
export const desktop: FSNode[] = [
  // First icon in the column and first app in the dock. A desktop assumes a
  // visitor willing to explore; the person this site exists to convince is
  // not, so the guide has to be the thing their eye lands on first.
  { kind: "window", name: "Start Here.md", route: "/start" },
  {
    kind: "folder",
    name: "Work",
    route: "/work",
    children: projects.map((project) => ({
      kind: "window" as const,
      name: project.name,
      route: `/work/${project.slug}`,
    })),
  },
  {
    kind: "folder",
    name: "Experience",
    route: "/experience",
    children: roles.map((role) => ({
      kind: "window" as const,
      name: role.company,
      route: `/experience/${role.id}`,
    })),
  },
  { kind: "window", name: "About.md", route: "/about" },
  {
    kind: "file",
    name: "Resume.pdf",
    href: "/Sahil_Dixit_Resume.pdf",
    external: true,
  },
  // Kaal is a real application rather than portfolio content: it renders in
  // the product's own identity and computes against the production engine.
  { kind: "window", name: "Kaal.app", route: "/kaal" },
  { kind: "window", name: "Contact.app", route: "/contact" },
];

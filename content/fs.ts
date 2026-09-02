import type { FSNode } from "./types";
import { projects } from "./projects";
import { roles } from "./experience";

/**
 * Virtual filesystem. Desktop icons and the Finder window read from this tree,
 * so neither can drift from the project and role data.
 *
 * ~/
 *   Work/          one window per project
 *   Experience/    one window per role
 *   About.md
 *   Resume.pdf     a real PDF, not a simulated one
 *   Contact.app
 */
export const desktop: FSNode[] = [
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
  { kind: "window", name: "Contact.app", route: "/contact" },
];

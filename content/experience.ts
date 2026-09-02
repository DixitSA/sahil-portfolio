import type { Role } from "./types";

/** Most recent first. */
export const roles: Role[] = [
  {
    id: "bank-of-america",
    company: "Bank of America",
    title: "Strategy & Management Consultant",
    location: "Charlotte, NC",
    period: "July 2025 - Present",
    current: true,
    bullets: [
      "Prioritized growth opportunities and risks in a 3-year strategic plan for a Consumer Bank serving ~69MM clients.",
      "Shaped Investor Day messaging for Consumer & Small Business.",
      "Delivered ~8 regulatory responses and ~30 model-level submissions ~80% ahead of deadline for AI/ML complaint-handling models under active model-risk review, coordinating audit and exam evidence across three enterprise systems.",
      "Built an executive dashboard covering 3 AI complaint workstreams.",
      "Cut ad-hoc slide turnaround from hours to ~15 minutes with a governed generative-AI prompt framework in Copilot. Adopted teamwide.",
    ],
  },
  {
    id: "capital-one",
    company: "Capital One",
    title: "Business Analyst, Retail Banking",
    location: "",
    period: "June 2024 - August 2024",
    current: false,
    bullets: [
      "Diagnosed friction in external bank-account linking using complaint logs and call data across five-figure interaction volumes in SQL and Excel.",
      "Designed and evaluated A/B tests for the Retail Bank Fraud team.",
    ],
  },
  {
    id: "alliant",
    company: "Alliant Insurance Services",
    title: "Benefits Analyst, Actuarial Sciences",
    location: "",
    period: "June 2023 - December 2023",
    current: false,
    bullets: [
      "Cut client premiums by ~10% on average across 7 employer clients using Excel actuarial and pricing models.",
      "Supported annual valuations and renewal decisions.",
    ],
  },
];

export function getRole(id: string): Role | undefined {
  return roles.find((role) => role.id === id);
}

import type { Role } from "./types";

/** Most recent first. Mirrors the 2026 resume. */
export const roles: Role[] = [
  {
    id: "bank-of-america",
    company: "Bank of America",
    title: "Strategy & Management Analyst",
    location: "Charlotte, NC",
    period: "July 2025 - Present",
    current: true,
    workstreams: [
      {
        name: "Cross-Product Fraud Detection Strategy",
        focus: "Consumer fraud prevention",
        bullets: [
          "Led fraud scheme mapping for an initiative to catch fraud moving between products, interviewing experts across 9 product groups including debit, check deposits, digital wallets and login security.",
          "Developed a fraud signal inventory linking 12 shared signals and 10 fraud types to 22 detection gaps; adopted by the team to expand fraud visibility across the organization.",
          "Profiled 6 fraud schemes against 8 pre-loss behaviors and selected 2 for proof-of-concept signal testing.",
        ],
      },
      {
        name: "Customer Complaints AI Program",
        focus: "AI model governance",
        bullets: [
          "Re-engineered the accuracy calibration process for an AI call-summarization model, adding data and reconciliation controls that raised weekly session completion from 45% to nearly 100%.",
          "Delivered 30 model submissions and 8 regulatory responses in AI model risk review, 80% of them ahead of deadline.",
          "Defined business logic for a daily Tableau report used to evaluate AI model performance.",
        ],
      },
      {
        name: "Consumer Strategy & AI Enablement",
        focus: "Strategic planning",
        bullets: [
          "Prioritized growth opportunities and risks for the three-year strategic plan of a 69 million-client consumer bank, supporting Investor Day messaging.",
          "Designed a governed Copilot slide workflow that cut turnaround from hours to about 15 minutes; adopted teamwide and extended into a department prompt library.",
        ],
      },
    ],
    bullets: [],
  },
  {
    id: "capital-one",
    company: "Capital One",
    title: "Business Analyst Intern, Retail Banking",
    location: "McLean, VA",
    period: "June 2024 - August 2024",
    current: false,
    bullets: [
      "Analyzed 10,000+ complaint logs and call records in SQL and Excel to pinpoint friction in external account linking.",
      "Ran A/B tests of account-linking flows with the Retail Bank Fraud team, showing that specific linking policies had a measurable effect on customer retention.",
    ],
  },
  {
    id: "alliant",
    company: "Alliant Insurance Services",
    title: "Benefits Analyst, Actuarial Sciences",
    location: "McLean, VA",
    period: "June 2023 - December 2023",
    current: false,
    bullets: [
      "Cut premiums by about 10% on average across 7 employer clients by analyzing healthcare claims in Excel pricing models.",
      "Modeled pricing, census and vendor-disruption scenarios to support benefit plan redesign and renewal decisions.",
    ],
  },
];

export function getRole(id: string): Role | undefined {
  return roles.find((role) => role.id === id);
}

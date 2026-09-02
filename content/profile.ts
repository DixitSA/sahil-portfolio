import type { Profile } from "./types";

export const profile: Profile = {
  name: "Sahil Dixit",
  title: "Strategy & Management Consultant",
  location: "Charlotte, NC",
  email: "sahild1230@gmail.com",
  github: "https://github.com/DixitSA",
  available: true,
  bio: [
    "Strategy and management consultant at Bank of America, working on the Consumer & Small Business side. The 3-year strategic plan I help shape covers a bank serving roughly 69 million clients.",
    "Most of the work sits where AI governance meets execution: regulatory responses for AI/ML models under active model-risk review, evidence coordinated across three enterprise systems, and a Copilot prompt framework that took ad-hoc slide turnaround from hours to about 15 minutes.",
    "Outside the day job I ship. Kaal is a Vedic astrology decision app live on web and iOS at 277 commits. Axira runs 3 LLM agents through an outreach pipeline on a home server at roughly $0 of infrastructure.",
  ],
  education: {
    school: "Virginia Commonwealth University",
    degree: "B.S. Financial Technology, Minor in Statistics",
    detail: "GPA 3.7. Dean's List every semester.",
    graduated: "May 2025",
  },
  stats: [
    {
      label: "CONSUMER BANK SCALE",
      value: "~69MM",
      sub: "clients covered by the 3-year strategic plan",
    },
    {
      label: "REGULATORY DELIVERY",
      value: "~80%",
      sub: "ahead of deadline across ~30 model-level submissions",
    },
    {
      label: "SLIDE TURNAROUND",
      value: "~15 min",
      sub: "down from hours. Governed AI prompt framework, adopted teamwide",
    },
    {
      label: "PREMIUM REDUCTION",
      value: "~10%",
      sub: "average across 7 employer clients",
    },
  ],
  skills: [
    {
      group: "AI & ANALYTICS",
      items: [
        "Generative AI tools (ChatGPT, Copilot, Claude)",
        "Prompt engineering",
        "LLM-assisted workflow automation",
        "AI/ML model governance & risk",
        "Applied analytics",
      ],
    },
    {
      group: "TECHNICAL",
      items: [
        "SQL",
        "Python",
        "R",
        "SAS",
        "Tableau",
        "Power BI",
        "Advanced Excel",
      ],
    },
    {
      group: "LANGUAGES",
      items: ["Hindi", "Gujarati"],
    },
  ],
};

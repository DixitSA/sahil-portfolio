import type { Profile } from "./types";

export const profile: Profile = {
  name: "Sahil Dixit",
  title: "Strategy & Management Consultant",
  location: "Charlotte, NC",
  email: "sahild1230@gmail.com",
  github: "https://github.com/DixitSA",
  available: true,
  /**
   * A thesis, not a second copy of the resume.
   *
   * The resume already lists what was done. This says what the work is for and
   * why the combination is unusual, which is the thing a hiring manager cannot
   * get from a bullet list. Every claim still resolves to something on the
   * resume, so the two never contradict each other.
   */
  bio: [
    "Most AI programs die in the gap between what a model can do and what an institution can defend. I work in that gap.",
    "At Bank of America I sit between Consumer & Small Business strategy and AI/ML model-risk governance: helping shape a 3-year plan for a bank of roughly 69 million clients, and carrying AI complaint-handling models through active model risk review. The hard part is rarely the model. It is getting the people who own the math and the people who own the liability to describe the same system the same way, fast enough to matter.",
    "I build at night because I do not think you can govern systems you have never shipped. Kaal is a decision engine live on web and iOS that is deliberately deterministic rather than generative, because a product people return to cannot contradict itself. Axira runs three LLM agents through an outreach pipeline behind a human approval gate, on a home server costing close to nothing.",
    "I am most useful where finance, regulation, and working software all have to agree with each other.",
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

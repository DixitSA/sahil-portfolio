import type { Profile } from "./types";

export const profile: Profile = {
  name: "Sahil Dixit",
  title: "Strategy & Management Analyst",
  location: "Charlotte, NC",
  email: "sahild1230@gmail.com",
  github: "https://github.com/DixitSA",
  linkedin: "https://www.linkedin.com/in/sahildixit1230",
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
    "At Bank of America I work across three programs that all come down to trust in a system: mapping how fraud moves between products, carrying an AI call-summarization model through model risk review, and shaping the three-year strategic plan for a consumer bank of 69 million clients. The hard part is rarely the model. It is getting the people who own the math and the people who own the liability to describe the same system the same way, fast enough to matter.",
    "I build at night because I do not think you can govern systems you have never shipped. Vazaar is a research platform for underwriting software where AI drafts but a deterministic gate decides what gets published. Kaal is a decision engine live on web and iOS that is deliberately deterministic rather than generative, because a product people return to cannot contradict itself. And I build agent tooling, like a 33-tool MCP server that lets a model run multi-step work under explicit guardrails.",
    "I am most useful where finance, regulation, and working software all have to agree with each other.",
  ],
  /**
   * The "Now" block.
   *
   * Named themes first, evidence second. A recruiter scanning the page
   * is pattern-matching for a discipline, not reading prose, so each line
   * leads with the thing being practised and then earns it with something
   * specific from the resume.
   *
   * Deliberately not a second copy of `stats` or of `bio`. The numbers the
   * four stats own are left to them. One line of the site should never read
   * as a paraphrase of another.
   */
  now: {
    updated: "November 2026",
    items: [
      "Fraud detection strategy. Mapping how fraud moves between products across 9 product groups, and taking 2 schemes into proof-of-concept signal testing.",
      "AI model governance. Calibration and reconciliation controls for an AI call-summarization model in active model risk review.",
      "Agent tooling. MCP servers that let an LLM agent run multi-step work with job queuing, evaluation and automated tests.",
    ],
  },
  education: {
    school: "Virginia Commonwealth University",
    degree: "B.S. Financial Technology, Minor in Statistics",
    detail: "GPA 3.7. Dean's List every semester.",
    graduated: "May 2025",
  },
  stats: [
    {
      label: "CONSUMER BANK SCALE",
      value: "69M",
      sub: "clients in the consumer bank whose three-year strategic plan I helped prioritize",
    },
    {
      label: "AI MODEL CALIBRATION",
      value: "~100%",
      sub: "weekly session completion, up from 45%, after re-engineering an AI model's calibration process",
    },
    {
      label: "MODEL RISK DELIVERY",
      value: "80%",
      sub: "of 30 model submissions and 8 regulatory responses delivered ahead of deadline",
    },
    {
      label: "FRAUD COVERAGE",
      value: "22",
      sub: "detection gaps surfaced by linking 12 shared signals to 10 fraud types",
    },
  ],
  skills: [
    {
      group: "STRATEGY & RISK",
      items: [
        "Strategic planning",
        "Fraud analytics",
        "AI model governance",
        "A/B testing",
        "Financial modeling",
      ],
    },
    {
      group: "ANALYTICS",
      items: ["SQL", "Python", "Advanced Excel", "Tableau", "Power BI", "R", "SAS"],
    },
    {
      group: "AI & DEVELOPMENT",
      items: ["Microsoft Copilot", "Prompt engineering", "LLM workflows", "MCP", "TypeScript", "Git"],
    },
  ],

};

/**
 * The GitHub profile as a link, normalized once.
 *
 * `profile.github` already carries a protocol, but three surfaces wrapped it in
 * another `https://` of their own. The contact card and the structured data
 * both pointed at `https://https://github.com/...`, which is a dead link on the
 * one row a recruiter is most likely to click. Everything that renders the
 * profile link reads this instead.
 */
export const githubUrl: string = profile.github.startsWith("http")
  ? profile.github
  : `https://github.com/${profile.github.replace(/^@/, "")}`;

/** Same value without the scheme, for display. */
export const githubHandle: string = githubUrl.replace(/^https?:\/\//, "");

/** LinkedIn without scheme or "www.", for display. */
export const linkedinHandle: string = profile.linkedin.replace(/^https?:\/\/(www\.)?/, "");

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
    "I get real work out of AI models, and I build the controls that make that work trustworthy: calibration, evaluation, review gates and governance.",
    "At Bank of America I re-engineered the accuracy calibration for an AI call-summarization model, designed a governed Copilot workflow the whole team adopted, and work in AI model risk review. My own products follow the same rule: in Vazaar a second model judges every AI draft and a deterministic gate decides what ships; Mixxx MCP gives an LLM agent 33 narrow tools and an evaluator; Axira's three agents send nothing without a person's approval.",
    "I came to AI through analysis and experiments: A/B tests at Capital One and 10,000+ complaint logs mined in SQL. Next I want an AI strategy role at a startup, where the person who decides how to use AI also builds it.",
  ],
  now: {
    updated: "November 2026",
    items: [
      "AI model evaluation. Calibration and reconciliation controls for an AI call-summarization model, and the business logic behind its daily Tableau performance report.",
      "Agent tooling. MCP servers that let an LLM agent run multi-step work with job queuing, evaluation and automated tests.",
      "Fraud signal testing. Taking 2 of 6 profiled fraud schemes into proof-of-concept signal testing at Bank of America.",
    ],
  },
  education: {
    school: "Virginia Commonwealth University",
    degree: "B.S. Financial Technology, Minor in Statistics",
    detail: "GPA 3.7. Dean's List every semester.",
    graduated: "May 2025",
  },
  evidence: [
    {
      result: "Slide turnaround from hours to about 15 minutes",
      answer: "about 15 minutes",
      method: "Designed a governed Copilot workflow. The whole team adopted it, and it grew into a department prompt library.",
      where: "Bank of America",
      group: "ai",
    },
    {
      result: "Weekly completion from 45% to nearly 100%",
      answer: "nearly 100%",
      method: "Re-engineered the accuracy calibration process for an AI call-summarization model, adding data and reconciliation controls.",
      where: "Bank of America",
      group: "ai",
    },
    {
      result: "30 model submissions and 8 regulatory responses, 80% ahead of deadline",
      answer: "80% ahead",
      method: "AI model risk review, plus the business logic for a daily Tableau report that evaluates AI model performance.",
      where: "Bank of America",
      group: "ai",
    },
    {
      result: "A/B tests with a measurable effect on retention",
      answer: "measurable effect",
      method: "Ran the tests on account-linking flows with the Retail Bank Fraud team, comparing specific linking policies.",
      where: "Capital One, 2024",
      group: "analysis",
    },
    {
      result: "10,000+ complaint logs and call records mined in SQL",
      answer: "10,000+",
      method: "Pinpointed the friction in external account linking, working in SQL and Excel.",
      where: "Capital One, 2024",
      group: "analysis",
    },
    {
      result: "22 detection gaps found across 12 signals and 10 fraud types",
      answer: "22 detection gaps",
      method: "Built a fraud signal inventory from expert interviews across 9 product groups. The team adopted it to widen fraud visibility.",
      where: "Bank of America",
      group: "analysis",
    },
  ],
  skills: [
    { group: "Analysis", items: ["SQL", "Python", "R", "SAS", "Advanced Excel", "Tableau", "Power BI"] },
    { group: "Experiments and strategy", items: ["A/B testing", "Fraud analytics", "Financial modeling", "Strategic planning"] },
    { group: "Building", items: ["TypeScript", "Next.js", "Astro", "Supabase", "Stripe", "Capacitor", "Git", "MCP", "LLM workflows", "Microsoft Copilot"] },
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

import type { Project } from "./types";

/**
 * Two featured projects carry full case studies. The remaining three are
 * plaintext rows: no case study, no screenshot.
 */
export const projects: Project[] = [
  {
    slug: "axira",
    name: "Axira",
    tier: "featured",
    status: "LIVE",
    summary:
      "Multi-agent outreach automation. Three specialized LLM agents in one pipeline, running on ~$0 of infrastructure.",
    tags: ["Python", "LLM agent orchestration", "Self-hosted Linux"],
    // NO repo link on purpose. github.com/DixitSA/axira-lite (the URL on the
    // resume) is a different project: a Next.js/Prisma operations dashboard for
    // trade businesses, not this Python multi-agent system. Verified twice.
    // Set `repo` once the real source is pushed somewhere public.
    caseStudy: {
      problem:
        "Outreach breaks into three jobs that need different things from a model. Research rewards breadth and tolerates being wrong. Drafting rewards voice and cannot be wrong about facts. Follow-up rewards restraint. A single prompt doing all three does each one badly, and the failure is silent: the output still reads like English, so nothing alerts you that the research step hallucinated the premise the draft is built on.",
      sections: [
        {
          heading: "Three agents, not one prompt",
          body: [
            "The pipeline splits into a research agent, a drafting agent, and a follow-up agent. Each gets its own instructions, its own success criteria, and its own output shape.",
            "The cost is real. Three agents means three points of failure, three sets of prompts to maintain, and handoff contracts between stages that a single prompt would not need. The payoff is that a bad research result is visible as a bad research result, before it becomes a confident, wrong email.",
          ],
        },
        {
          heading: "The approval gate is a product decision, not a safety blanket",
          body: [
            "Nothing sends without a human approving it. That caps throughput at the rate a person can read, which is the exact thing full autonomy would have removed.",
            "It was the right trade for outreach specifically. The downside of a wrong send is not a retry, it is a burned contact and a reputation cost that does not reverse. Automation buys the drafting time, which was the expensive part. It does not buy the judgment.",
          ],
        },
        {
          heading: "A headless home server instead of a cloud bill",
          body: [
            "The orchestration runs on a headless Linux box on the home network. Marginal infrastructure cost is roughly $0, against a per-hour cloud instance that would have idled between runs.",
            "This is a batch workload with no external users and no uptime obligation, so the usual arguments for managed hosting do not apply. The tradeoff is accepted honestly: no autoscaling, no managed failover, and recovery is manual. For a pipeline that runs on a schedule and has one operator, that is affordable.",
          ],
        },
        {
          heading: "Python because the work is glue",
          body: [
            "Most of the code is not model calls. It is parsing, retry handling, state between stages, and the plumbing that lets a stage fail without taking the run with it.",
            "Python kept that layer short and kept the agent definitions readable as configuration rather than as framework ceremony.",
          ],
        },
      ],
      outcome: [
        "3 specialized LLM agents running research, drafting, and follow-up in a single pipeline.",
        "Human-in-the-loop approval gate on every outbound message. Zero unreviewed sends.",
        "~$0 marginal infrastructure cost. Self-hosted on a headless home server.",
        "Status: LIVE and in regular use.",
      ],
    },
  },
  {
    slug: "kaal",
    name: "Kaal",
    tier: "featured",
    status: "LIVE",
    summary:
      "Vedic astrology decision app shipped to production web and iOS. Deterministic chart computation, 277 commits.",
    tags: ["Next.js", "TypeScript", "Python", "Capacitor"],
    href: "https://getkaal.com",
    repo: "https://github.com/DixitSA/kaal",
    preview: "/previews/kaal-dashboard.png",
    caseStudy: {
      problem:
        "Astrology apps are the easy case for an LLM and the wrong one. Ask a model for a reading and it produces something fluent, unfalsifiable, and different every time you ask. That is fatal for a product people are supposed to return to: if today's guidance contradicts yesterday's for the same birth chart, there is no product, only a slot machine. The hard requirement was that identical inputs must always produce identical output, while the actual astronomy stayed correct across timezones and birth times.",
      sections: [
        {
          heading: "Deterministic engine, not an LLM",
          body: [
            "The core is a pure computation layer with no model in the path. An `astro` layer computes chart primitives. An `engine` layer turns those into identity, phase, daily, and decision outputs.",
            "Phrase selection runs through a hash of the input rather than a random draw, so the same chart and the same date always resolve to the same words. Scoring runs on 9 explicit signal dimensions including clarity, support, pressure, stability, and timing, each with per-category weights.",
            "The tradeoff is range. A deterministic phrase bank cannot say anything it was not written to say. In exchange every output is reproducible, testable, and defensible.",
          ],
        },
        {
          heading: "A three-tier ephemeris fallback",
          body: [
            "Accurate sidereal positions want the Swiss Ephemeris, which is a native binding that does not install cleanly everywhere. Making it a hard dependency would have made the project unbuildable on a clean checkout.",
            "The adapter resolves a provider at runtime in order: native `swisseph`, then `astronomia`, then a deterministic approximation. The seam is kept honest rather than silently active, so the current build reports which provider produced a chart instead of implying precision it does not have.",
            "The adapter is also server-only by construction. It throws if `window` is defined, which stops a bundler from ever shipping the compute path to the browser.",
          ],
        },
        {
          heading: "Timezones are the actual bug surface",
          body: [
            "Every date-sensitive path normalizes explicitly through UTC or a resolved timezone rather than trusting the host clock. Birth time is resolved to a UTC instant before any Julian day math runs.",
            "Birthplace lookup goes through a server route rather than a client call to a geocoding provider. That keeps the provider key server-side, gives one place to normalize the display name, coordinates, and timezone, and makes the whole thing switchable behind an environment flag.",
          ],
        },
        {
          heading: "Tests as the reproducibility contract",
          body: [
            "The suite covers four layers: astro computation, engine logic, API route contracts, and the deterministic utilities that everything else depends on. Validation is schema-enforced at the route boundary, so a malformed request fails at transport rather than deep in a chart calculation.",
            "This is the part that made the determinism claim real. Without fixed fixtures proving that a given chart resolves to a given output, determinism is an intention rather than a property.",
          ],
        },
        {
          heading: "One codebase, web and iOS",
          body: [
            "iOS ships through Capacitor against the same web build rather than a separate native client. One build command produces the web bundle and syncs it into the iOS project.",
            "That rules out native-only interaction patterns and platform-specific UI. For a product whose value is the computation rather than the chrome, shipping two platforms from one source was worth more than a native feel on one.",
            "Production surface beyond the engine: passwordless magic-link auth, Stripe checkout with webhook-driven entitlement, and Redis sliding-window rate limits tiered by risk at 5 per 15 minutes on auth, 20 per minute on mutations, and 30 per minute on the CPU-bound compute routes.",
          ],
        },
      ],
      outcome: [
        "Shipped to production on web and iOS from a single codebase. 277 commits.",
        "Identical inputs produce identical output. Verified by a fixture-backed suite across the astro, engine, API, and utility layers.",
        "Three-tier ephemeris fallback keeps the project buildable on a clean checkout with no native toolchain.",
        "Full commercial path live: magic-link auth, Stripe checkout and webhooks, tiered rate limiting.",
        "Went to market through a niche community rather than paid acquisition.",
      ],
    },
  },
  {
    slug: "vibequeue",
    name: "VibeQueue",
    tier: "listed",
    status: "LIVE",
    summary:
      "Bar patrons queue songs to a venue's Spotify from their own phone. No app install.",
    tags: ["Next.js", "Firebase", "Spotify API"],
    repo: "https://github.com/DixitSA/VibeQueue",
  },
  {
    slug: "manifest",
    name: "MANIFEST",
    tier: "listed",
    status: "LIVE",
    summary:
      "Fleet management with real-time vehicle tracking and driver compliance monitoring.",
    tags: ["Next.js", "Fastify", "PostgreSQL", "WebSocket"],
    repo: "https://github.com/DixitSA/MANIFEST",
  },
  {
    slug: "polymarket-copytrader",
    name: "Polymarket Copytrader",
    tier: "listed",
    status: "BUILD",
    summary:
      "Mirrors positions from top-ranked Polymarket traders into a tracked portfolio.",
    tags: ["Python", "Polymarket API"],
  },
];

export const featuredProjects: Project[] = projects.filter(
  (project) => project.tier === "featured"
);

export const listedProjects: Project[] = projects.filter(
  (project) => project.tier === "listed"
);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

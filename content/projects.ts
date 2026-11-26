import type { Project } from "./types";

/**
 * Featured projects get a large card and a case study. Listed projects are
 * rows; a listed project may still carry a case study (Axira), in which case
 * its row links to it.
 *
 * Featured set matches the 2026 resume: Vazaar and the MCP server, plus Kaal,
 * which has a live engine demo on this site.
 */
export const projects: Project[] = [
  {
    slug: "vazaar",
    name: "Vazaar",
    tier: "featured",
    status: "LIVE",
    summary:
      "Research platform for commercial P&C underwriting software: a catalog of 170+ solutions, researched with AI and checked before anything is published.",
    answer: "170+ solutions",
    aiNote:
      "Research drafting runs offline. A separate, lower-cost model reviews each draft as an independent judge, with at most two revision rounds, and a deterministic publication gate checks the recorded judgment before anything ships. The live product makes no runtime model calls.",
    tags: ["TypeScript", "Astro", "Supabase", "Stripe"],
    angle:
      "I built the whole funnel: a free searchable catalog, a $49-a-month introductory tier with email-code accounts and Stripe checkout, an enterprise request form, and its own analytics endpoint.",
    href: "https://vazaar-site.vercel.app",
    // Repository is private, so no source link is shown.
    preview: "/previews/vazaar-product.jpg",
    previewSize: { w: 1920, h: 1200 },
    caseStudy: {
      problem:
        "Insurers buying underwriting software (submission intake, triage, document extraction, decision support) face a crowded market where every vendor page says roughly the same thing. A research product only helps if a buyer can tell which claims rest on evidence and which rest on marketing. AI makes the research faster, and it also makes it easy to publish confident claims that nobody checked.",
      sections: [
        {
          heading: "Evidence and capability are scored separately",
          body: [
            "Each product carries separate capability, evidence and readiness scores, and there is deliberately no overall rating or buyer-fit ranking.",
            "Collapsing them into one number would hide the thing a buyer most needs to know: whether a strong capability score is backed by independent sources or only by the vendor's own description.",
          ],
        },
        {
          heading: "AI drafts. A deterministic gate publishes.",
          body: [
            "Research drafting is AI-assisted and runs offline. A separate, lower-cost model reviews each draft as an independent judge, with at most two revision rounds, and a deterministic publication gate checks the recorded judgment before anything ships.",
            "Agent approval is explicitly not treated as independent verification of a vendor's claims, and the shipped product makes no runtime model calls. It runs without an AI API key.",
          ],
        },
        {
          heading: "Static where possible, private where it pays",
          body: [
            "The public catalog is a static Astro site with Pagefind search, built from data in Git. Five serverless endpoints handle assessment intake, analytics, the paid tier, Stripe webhooks and launch notifications.",
            "Paid research (reports, scores, source lists) is served by an entitlement-checked API inside product pages and never shipped in static HTML or search data, so it cannot be scraped from the free site.",
          ],
        },
        {
          heading: "A three-tier business model",
          body: [
            "Free: a searchable catalog with product overviews and vendor links. Intelligence: $49 a month introductory access to reports and scores, with email-code accounts, Supabase entitlements and Stripe checkout. Enterprise: a manual assessment request.",
            "Contracts are typed with Zod, and scoring lives in a pure, deterministic rules package that can be tested in isolation.",
          ],
        },
      ],
      outcome: [
        "Free research catalog live in production.",
        "Research corpus of 174 underwriting solutions across 153 companies, each with source-linked evidence states.",
        "Paid tier built end to end: accounts, entitlements, Stripe checkout and signed webhooks. Paid checkout opens after launch checks.",
        "No runtime model dependency. The shipped product runs without an AI API key.",
      ],
    },
  },
  {
    slug: "axira",
    name: "Axira",
    tier: "listed",
    status: "LIVE",
    summary:
      "Multi-agent outreach automation: three LLM agents for research, drafting and follow-up, and nothing sends until a person approves it.",
    tags: ["Python", "LLM agent orchestration", "Self-hosted Linux"],
    // Added back at the owner's request. Flagged twice and worth repeating:
    // this URL currently resolves to a Next.js/Prisma operations dashboard for
    // trade businesses, not the Python multi-agent system described above. It
    // is also the URL printed on the resume, so the two are at least
    // consistent. Repoint both once the real source is public.
    repo: "https://github.com/DixitSA/axira-lite",
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
    answer: "277 commits",
    tags: ["Next.js", "TypeScript", "Python", "Capacitor"],
    angle:
      "It ships with magic-link sign-in and Stripe checkout, and went to market through a niche community instead of paid acquisition.",
    href: "https://getkaal.com",
    repo: "https://github.com/DixitSA/kaal",
    preview: "/previews/kaal-dashboard.png",
    previewSize: { w: 826, h: 1600 },
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
    slug: "mixxx-mcp",
    name: "Mixxx MCP",
    tier: "featured",
    status: "BUILD",
    summary:
      "An MCP server exposing 33 tools that let an LLM agent run multi-step DJ work in Mixxx: beat-timed transitions, mashup matching and set planning, with job queuing and automated tests.",
    answer: "33 tools",
    tags: ["Python", "Model Context Protocol", "MIDI", "Audio analysis"],
    angle:
      "Agent tooling with guardrails: narrow tools, a job queue that lands on the beat, and an evaluator that checks a transition before anyone trusts it.",
    // Repository is private, so no source link is shown.
    caseStudy: {
      problem:
        "Letting a language model operate a live system is easy to demo and hard to trust. In a DJ set the cost of a wrong action is immediate and audible: a deck that loads, pauses or seeks while it is playing to a room. The agent has to plan and execute multi-step work, and the system has to make the dangerous actions hard to take by accident.",
      sections: [
        {
          heading: "Many narrow tools, not one generic one",
          body: [
            "The server exposes 33 tools grouped by job: deck control, library and loading, analysis and matching, mashup and set planning, stems and lyrics, performance, audition and rating, and a single cancel.",
            "A generic 'send a MIDI message' tool would have been smaller. Narrow tools make every call inspectable and every failure legible, which is what lets a person supervise an agent in real time.",
          ],
        },
        {
          heading: "A beat-timed job queue",
          body: [
            "The agent sends commands over a virtual MIDI port to a custom Mixxx controller mapping. Mixxx runs the resulting jobs against the deck playhead, so a transition lands on the beat rather than whenever the model's response happens to arrive.",
            "The hardware controller keeps its stock mapping alongside, so the human never loses manual control.",
          ],
        },
        {
          heading: "Evaluate a plan before trusting it",
          body: [
            "A record-and-evaluate tool captures a transition and flags clipping, level jumps, silence, misaligned kicks, stacked bass, mud and harmonic smear.",
            "Operating rules sit in the tool contract: never load, pause or seek an audible deck unless asked, and audition only on request.",
          ],
        },
        {
          heading: "Tested without the real application",
          body: [
            "Scheduler and bridge tests run against a fake Mixxx engine, and the evaluator is tested on synthetic audio, so the timing logic is verified without a DJ setup attached.",
          ],
        },
      ],
      outcome: [
        "33 MCP tools covering deck control, analysis, mashup planning, stems, performance and evaluation.",
        "Beat-timed job queue that executes multi-step transitions against the live playhead.",
        "Automated recording evaluation for clipping, level jumps, kick alignment and harmonic clashes.",
        "Test suite against a fake Mixxx engine and synthetic audio.",
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
    href: "https://vibequeue-one.vercel.app",
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
    href: "https://manifest-omega-eight.vercel.app",
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

const FEATURED_ORDER = ["vazaar", "kaal", "mixxx-mcp"];

export const featuredProjects: Project[] = projects
  .filter((project) => project.tier === "featured")
  .sort((a, b) => FEATURED_ORDER.indexOf(a.slug) - FEATURED_ORDER.indexOf(b.slug));

/** Projects that have a case study page under /work/[slug]. */
export const caseStudyProjects: Project[] = projects.filter((project) => project.caseStudy);

const LISTED_ORDER = ["axira", "vibequeue", "manifest", "polymarket-copytrader"];

export const listedProjects: Project[] = projects
  .filter((project) => project.tier === "listed")
  .sort((a, b) => LISTED_ORDER.indexOf(a.slug) - LISTED_ORDER.indexOf(b.slug));

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

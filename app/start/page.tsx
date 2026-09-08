import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { featuredProjects, githubHandle, githubUrl, profile, roles } from "@/content";
import {
  Doc,
  DocHeader,
  SectionTitle,
  Group,
  Row,
  Status,
  DocLink,
  body,
  mono,
} from "@/components/os/DocChrome";

/**
 * Start Here.
 *
 * The site is a working desktop, and a desktop assumes a visitor who is
 * willing to explore. The primary audience is not: a recruiter screening
 * portfolios gives this a few seconds, and "clever, but where is the resume"
 * is the most expensive reaction it can produce.
 *
 * So this route is the README a well-organized machine ships with. It answers
 * three questions in order, because that is the order they get asked in:
 *
 *   1. what should I open, and in what order          — the reading path
 *   2. how do I drive this thing                      — the mechanics
 *   3. I have sixty seconds                           — resume, email, GitHub
 *
 * Everything in the path is derived from `content/`, so a new featured project
 * appears here without anyone remembering to add it, and nothing on this page
 * can claim something the rest of the site contradicts.
 *
 * It is a real route rather than a modal, per DESIGN.md: nothing on this site
 * traps the visitor, and a guide that cannot be linked to is a guide a
 * recruiter cannot forward to the hiring manager.
 */

export const metadata: Metadata = {
  title: "Start Here — Sahil Dixit",
  description:
    "How to read this site in five minutes: what to open, in what order, and how the desktop works.",
};

interface Step {
  time: string;
  title: string;
  href: string;
  /** Real file or off-site URL, so it opens in a new tab. */
  external?: boolean;
  detail: string;
}

const RESUME_HREF = "/Sahil_Dixit_Resume.pdf";

export default function Page() {
  const current = roles.find((role) => role.current) ?? roles[0];

  const steps: Step[] = [
    {
      time: "60 sec",
      title: "Resume.pdf",
      href: RESUME_HREF,
      external: true,
      detail: "The one-page version. Roles, dates, numbers. Opens in a new tab.",
    },
    {
      time: "2 min",
      title: "About",
      href: "/about",
      detail:
        "The part a resume cannot carry: what the work is for, and why institutional finance, AI model risk, and shipping software sit in one person on purpose.",
    },
    ...featuredProjects.map<Step>((project) => ({
      time: "3 min",
      title: `Work → ${project.name}`,
      href: `/work/${project.slug}`,
      detail: `${project.summary} The write-up covers what was hard and what it cost, not just what shipped.`,
    })),
    {
      time: "1 min",
      title: "Experience",
      href: "/experience",
      detail: `${roles.length} roles, most recent first. ${current.company} is current: ${current.title}, ${current.period.toLowerCase()}.`,
    },
    {
      time: "30 sec",
      title: "Contact",
      href: "/contact",
      detail: profile.available
        ? "Email, GitHub, resume, in one place. Currently open to work."
        : "Email, GitHub, resume, in one place.",
    },
  ];

  return (
    <Doc>
      <DocHeader
        heading="Start here"
        subtitle="This site is a working desktop rather than a scrolling page, and a home screen on a phone. Here is what to open, in what order, and how to drive it."
        meta={
          <>
            {profile.available && <Status value="AVAILABLE FOR WORK" />}
            <span style={mono}>~5 minutes end to end</span>
          </>
        }
      />

      <section className="mb-10">
        <SectionTitle>The five-minute path</SectionTitle>
        <Group>
          <ol>
            {steps.map((step, i) => (
              <li key={step.href}>
                <Row className="first:border-t-0">
                  <div className="flex items-baseline gap-3">
                    <span
                      aria-hidden="true"
                      className="w-4 shrink-0 tabular-nums"
                      style={{ ...mono, fontSize: 11, color: "var(--color-ink-faint)" }}
                    >
                      {i + 1}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <StepLink href={step.href} external={step.external}>
                          {step.title}
                        </StepLink>
                        <span style={{ ...mono, fontSize: 11 }}>{step.time}</span>
                      </div>
                      <p className="mt-1 max-w-xl" style={{ ...body, fontSize: 14 }}>
                        {step.detail}
                      </p>
                    </div>
                  </div>
                </Row>
              </li>
            ))}
          </ol>
        </Group>
      </section>

      <section className="mb-10">
        <SectionTitle>How this desktop works</SectionTitle>
        <Group>
          <HowRow what="Double-click an icon to open it">
            Icons sit along the right edge of the wallpaper. One click selects, two
            opens, the same as a Mac. Folders open into a window rather than a new
            page.
          </HowRow>
          <HowRow what="⌘K, or Ctrl+K, searches everything">
            Every section, project and action from anywhere on the site. Arrows move,
            Enter opens, Escape closes. It is the fastest route to any of them.
          </HowRow>
          <HowRow what="The dock opens each section">
            Bottom of the screen, left to right, plus the resume and GitHub after the
            divider. A green dot under an icon means that window is already open.
          </HowRow>
          <HowRow what="Windows behave like windows">
            Red closes, amber minimizes, green zooms. Drag the title bar to move a
            window, drag an edge to resize it. Several can be open at once.
          </HowRow>
          <HowRow what="Every window is a real, shareable URL">
            The address bar follows whatever is focused, so /work/kaal opens straight
            to that case study for whoever you send it to. Each one is also a plain
            server-rendered page, so it survives being read without JavaScript.
          </HowRow>
          <HowRow what="On a phone, it is a home screen">
            Below tablet width the desktop is dropped entirely. Tap an app icon; the
            control at the top left walks back up.
          </HowRow>
        </Group>
      </section>

      <section>
        <SectionTitle>If you only have sixty seconds</SectionTitle>
        <Group>
          <Row className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 first:border-t-0">
            <span style={{ ...body, fontSize: 14, color: "var(--color-ink-subtle)" }}>
              Resume
            </span>
            <DocLink href={RESUME_HREF}>Sahil_Dixit_Resume.pdf</DocLink>
          </Row>
          <Row className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <span style={{ ...body, fontSize: 14, color: "var(--color-ink-subtle)" }}>
              Email
            </span>
            <DocLink href={`mailto:${profile.email}`} external={false}>
              {profile.email}
            </DocLink>
          </Row>
          <Row className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <span style={{ ...body, fontSize: 14, color: "var(--color-ink-subtle)" }}>
              Code
            </span>
            <DocLink href={githubUrl}>{githubHandle}</DocLink>
          </Row>
        </Group>
      </section>
    </Doc>
  );
}

/* ── Pieces ───────────────────────────────────────────────────────── */

/**
 * A step's title. Internal steps navigate through the router so the window
 * layer picks them up; the resume is a real file and leaves for a new tab.
 */
function StepLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: ReactNode;
}) {
  const style = {
    fontFamily: "var(--font-body)",
    fontSize: 15,
    fontWeight: 500,
    color: "var(--link-accent)",
  } as const;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline-offset-4 hover:underline"
        style={style}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className="underline-offset-4 hover:underline" style={style}>
      {children}
    </Link>
  );
}

/** One mechanic: the gesture in ink, what it does underneath it. */
function HowRow({ what, children }: { what: string; children: ReactNode }) {
  return (
    <Row className="first:border-t-0">
      <p style={{ ...body, fontSize: 14, color: "var(--color-ink)" }}>{what}</p>
      <p className="mt-1 max-w-xl" style={{ ...body, fontSize: 14 }}>
        {children}
      </p>
    </Row>
  );
}

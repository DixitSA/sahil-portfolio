import type { Metadata } from "next";
import { profile } from "@/content";
import { Doc, DocHeader, Group, Row, DocLink, Status, body } from "@/components/os/DocChrome";

export const metadata: Metadata = {
  title: "Contact — Sahil Dixit",
  description: "Get in touch with Sahil Dixit.",
};

export default function Page() {
  const links = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}`, external: false },
    { label: "GitHub", value: profile.github, href: `https://${profile.github}`, external: true },
    {
      label: "Resume",
      value: "Sahil_Dixit_Resume.pdf",
      href: "/Sahil_Dixit_Resume.pdf",
      external: true,
    },
  ];

  return (
    <Doc>
      <DocHeader
        heading="Get in touch"
        subtitle="Open to senior IC and consulting work in fintech, strategy, and AI."
        meta={profile.available ? <Status value="AVAILABLE FOR WORK" /> : undefined}
      />

      <Group>
        {links.map((l) => (
          <Row
            key={l.label}
            className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 first:border-t-0"
          >
            <span style={{ ...body, fontSize: 14, color: "var(--color-ink-subtle)" }}>
              {l.label}
            </span>
            <DocLink href={l.href} external={l.external}>
              {l.value}
            </DocLink>
          </Row>
        ))}
      </Group>
    </Doc>
  );
}

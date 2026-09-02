import Image from "next/image";
import type { Project } from "@/content/types";
import {
  Doc,
  DocHeader,
  SectionTitle,
  Group,
  Chip,
  Status,
  DocLink,
  body,
} from "@/components/os/DocChrome";

/**
 * Server component. Renders a full project case study.
 * No client JS: this is the content a recruiter came for, so it must be
 * readable with scripting disabled and indexable by a crawler.
 */
export default function CaseStudy({ project }: { project: Project }) {
  const cs = project.caseStudy;

  return (
    <Doc>
      <article>
        <DocHeader
          heading={project.name}
          subtitle={project.summary}
          meta={
            <>
              <Status value={project.status} />
              {project.href && <DocLink href={project.href}>Live site</DocLink>}
              {project.repo && <DocLink href={project.repo}>GitHub</DocLink>}
            </>
          }
        />

        <div className="mb-8 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Chip key={tag}>{tag}</Chip>
          ))}
        </div>

        {project.preview && (
          <figure
            className="mb-10 overflow-hidden p-2"
            style={{
              background: "var(--color-group)",
              border: "1px solid var(--color-group-border)",
              borderRadius: "var(--radius-group)",
            }}
          >
            {/*
              Product screenshots are full-page portrait captures. Forcing them
              into a 16:10 crop throws away most of the interface, so the frame
              caps height and the image keeps its own proportions.
            */}
            <Image
              src={project.preview}
              alt={`${project.name} interface`}
              width={project.previewSize?.w ?? 1280}
              height={project.previewSize?.h ?? 800}
              sizes="(max-width: 768px) 100vw, 640px"
              className="mx-auto block h-auto w-auto"
              style={{ maxHeight: 520, objectFit: "contain", borderRadius: 4 }}
            />
          </figure>
        )}

        {cs ? (
          <>
            <section className="mb-10">
              <SectionTitle>The problem</SectionTitle>
              <p style={body}>{cs.problem}</p>
            </section>

            {cs.sections.map((s) => (
              <section key={s.heading} className="mb-10">
                <SectionTitle>{s.heading}</SectionTitle>
                <div className="space-y-4">
                  {s.body.map((para, i) => (
                    <p key={i} style={body}>
                      {para}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            <section>
              <SectionTitle>Outcome</SectionTitle>
              <Group>
                {cs.outcome.map((line, i) => (
                  <div
                    key={i}
                    className="px-4 py-3 first:border-t-0"
                    style={{ borderTop: "1px solid var(--color-row-divider)" }}
                  >
                    <p style={{ ...body, fontSize: 14 }}>{line}</p>
                  </div>
                ))}
              </Group>
            </section>
          </>
        ) : (
          <p style={body}>Source and details are linked above.</p>
        )}
      </article>
    </Doc>
  );
}

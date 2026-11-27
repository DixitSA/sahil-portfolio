import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { caseStudyProjects, getProject } from "@/content";
import CaseStudy from "@/components/CaseStudy";

/** Prerender every case study so each one is static HTML. Unknown slugs 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudyProjects.map((p) => ({ slug: p.slug }));
}

/** Next 16: params is a Promise. Synchronous access was removed. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || !project.caseStudy) return { title: "Not found" };

  const title = project.name;
  return {
    title,
    description: project.summary,
    openGraph: {
      title,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || !project.caseStudy) notFound();

  return <CaseStudy project={project} />;
}

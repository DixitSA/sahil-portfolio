import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, getProject } from "@/content";
import CaseStudy from "@/components/CaseStudy";

/** Prerender every project so each case study is static HTML. */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

/** Next 16: params is a Promise. Synchronous access was removed. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Not found" };

  const title = `${project.name} — Sahil Dixit`;
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
  if (!project) notFound();

  return <CaseStudy project={project} />;
}

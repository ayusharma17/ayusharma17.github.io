import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Grid from '@/components/Grid';
import InView from '@/components/InView';
import { getProjectBySlug, projects } from '@/lib/projects';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    return {
      title: 'Project not found'
    };
  }
  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `/projects/${project.slug}`
    },
    openGraph: {
      title: project.title,
      description: project.summary,
      url: `https://ayush.dev/projects/${project.slug}`,
      images: [
        {
          url: project.cover,
          width: 1200,
          height: 900,
          alt: project.title
        }
      ]
    }
  };
}

const sectionIds = {
  problem: 'problem',
  approach: (index: number) => `approach-${index}`,
  current: 'current-progress',
  outcome: 'outcome',
  behind: 'behind-the-build'
};

export default function ProjectCaseStudy({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    notFound();
  }

  const approachSections = project.caseStudy.approach ?? [];
  const toc = [
    { label: 'Problem', href: `#${sectionIds.problem}` },
    ...approachSections.map((section, index) => ({
      label: section.heading,
      href: `#${sectionIds.approach(index)}`
    }))
  ];

  if (project.caseStudy.currentProgress) {
    toc.push({ label: 'Current progress', href: `#${sectionIds.current}` });
  }

  if (project.caseStudy.outcome) {
    toc.push({ label: 'Outcome', href: `#${sectionIds.outcome}` });
  }

  if (project.caseStudy.behindTheBuild?.length) {
    toc.push({ label: 'Behind the build', href: `#${sectionIds.behind}` });
  }

  return (
    <Grid className="gap-16 pb-24 pt-20 lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="top-28 hidden lg:sticky lg:block">
        <nav aria-label="Case study sections" className="flex flex-col gap-3 text-sm text-muted">
          {toc.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-foreground">
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
      <article className="flex flex-col gap-16">
        <header className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-muted">Case Study</p>
          <h1 className="text-5xl font-display tracking-tight sm:text-6xl">{project.title}</h1>
          <p className="max-w-2xl text-lg text-muted">{project.summary}</p>
          <div className="flex flex-wrap gap-4 text-sm text-muted">
            <span className="rounded-full border border-border-subtle px-3 py-1 uppercase tracking-[0.2em]">
              {project.year}
            </span>
            {project.tools.map((tool) => (
              <span key={tool} className="rounded-full border border-border-subtle px-3 py-1 uppercase tracking-[0.2em]">
                {tool}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-muted">
            {project.links.live && (
              <Link href={project.links.live} className="underline" target="_blank" rel="noreferrer">
                Live site
              </Link>
            )}
            {project.links.repo && (
              <Link href={project.links.repo} className="underline" target="_blank" rel="noreferrer">
                View source
              </Link>
            )}
            {project.links.report && (
              <Link href={project.links.report} className="underline" target="_blank" rel="noreferrer">
                Project report
              </Link>
            )}
          </div>
        </header>

        <figure className="overflow-hidden rounded-3xl border border-border-subtle">
          <Image
            src={project.cover}
            alt={project.title}
            width={1600}
            height={900}
            className="h-auto w-full"
            priority
          />
          <figcaption className="px-6 py-4 text-sm text-muted">{project.caseStudy.heroCaption}</figcaption>
        </figure>

        <section id={sectionIds.problem} aria-labelledby="problem-heading" className="space-y-4">
          <h2 id="problem-heading" className="text-3xl font-display">
            {project.caseStudy.problem.heading}
          </h2>
          {project.caseStudy.problem.body.map((paragraph, index) => (
            <p key={index} className="text-lg text-muted">
              {paragraph}
            </p>
          ))}
        </section>

        {approachSections.length > 0 && (
          <section aria-labelledby="approach-heading" className="space-y-10">
            <h2 id="approach-heading" className="text-3xl font-display">
              Approach
            </h2>
            <div className="space-y-8">
              {approachSections.map((section, index) => (
                <div key={section.heading} id={sectionIds.approach(index)} className="space-y-4">
                  <h3 className="text-2xl font-display">{section.heading}</h3>
                  {section.body.map((paragraph, idx) => (
                    <p key={idx} className="text-lg text-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </section>
        )}

        {project.caseStudy.currentProgress && (
          <section id={sectionIds.current} aria-labelledby="current-heading" className="space-y-4">
            <h2 id="current-heading" className="text-3xl font-display">
              {project.caseStudy.currentProgress.heading}
            </h2>
            {project.caseStudy.currentProgress.body.map((paragraph, index) => (
              <p key={index} className="text-lg text-muted">
                {paragraph}
              </p>
            ))}
          </section>
        )}

        {project.caseStudy.outcome && (
          <section id={sectionIds.outcome} aria-labelledby="outcome-heading" className="space-y-4">
            <h2 id="outcome-heading" className="text-3xl font-display">
              {project.caseStudy.outcome.heading}
            </h2>
            {project.caseStudy.outcome.body.map((paragraph, index) => (
              <p key={index} className="text-lg text-muted">
                {paragraph}
              </p>
            ))}
          </section>
        )}

        <section aria-labelledby="metrics-heading" className="space-y-4">
          <h2 id="metrics-heading" className="sr-only">
            Metrics
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.caseStudy.metrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-border-subtle p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-muted">{metric.label}</p>
                <p className="mt-2 text-2xl font-display">{metric.value}</p>
              </div>
            ))}
          </div>
        </section>

        {project.caseStudy.behindTheBuild && (
          <section id={sectionIds.behind} aria-labelledby="behind-heading" className="space-y-4">
            <h2 id="behind-heading" className="text-3xl font-display">Behind the build</h2>
            <ul className="space-y-3 text-lg text-muted">
              {project.caseStudy.behindTheBuild.map((item) => (
                <li key={item} className="list-disc pl-5">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        <InView className="rounded-3xl border border-border-subtle p-8">
          <h2 className="text-2xl font-display">Ready to collaborate?</h2>
          <p className="mt-2 text-muted">
            I love partnering with teams pushing responsible ML and expressive interfaces. Let&apos;s build something new.
          </p>
          <Link href="/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
            Contact me →
          </Link>
        </InView>
      </article>
    </Grid>
  );
}

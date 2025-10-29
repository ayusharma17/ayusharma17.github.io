'use client';

import { useMemo, useState } from 'react';
import clsx from 'clsx';
import type { Project } from '@/lib/projects';
import ProjectCard from './ProjectCard';

type Props = {
  projects: Project[];
};

export default function ProjectsGallery({ projects }: Props) {
  const [filter, setFilter] = useState<string>('all');

  const tags = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((project) => project.tags.forEach((tag) => set.add(tag)));
    return ['all', ...Array.from(set)];
  }, [projects]);

  const filtered = filter === 'all' ? projects : projects.filter((project) => project.tags.includes(filter));

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap items-center gap-3">
        {tags.map((tag) => {
          const label = tag === 'all' ? 'All' : tag.replace('-', ' ');
          const active = filter === tag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => setFilter(tag)}
              className={clsx(
                'rounded-full border border-border-subtle px-4 py-2 text-xs uppercase tracking-[0.25em] transition-colors',
                active ? 'bg-foreground text-background' : 'text-muted hover:text-foreground'
              )}
              aria-pressed={active}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}

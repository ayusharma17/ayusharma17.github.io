'use client';

import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { Project } from '@/lib/projects';

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const mm = gsap.matchMedia();
    mm.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const tl = gsap.timeline({ paused: true });
        tl.to(element.querySelector('[data-card-image]'), {
          yPercent: -6,
          duration: 0.6,
          ease: 'power2.out'
        }).to(
          element.querySelector('[data-card-mask]'),
          {
            opacity: 1,
            duration: 0.4,
            ease: 'power1.out'
          },
          0
        );

        const handleEnter = () => tl.play();
        const handleLeave = () => tl.reverse();

        element.addEventListener('mouseenter', handleEnter);
        element.addEventListener('mouseleave', handleLeave);
        element.addEventListener('focus', handleEnter);
        element.addEventListener('blur', handleLeave);

        return () => {
          element.removeEventListener('mouseenter', handleEnter);
          element.removeEventListener('mouseleave', handleLeave);
          element.removeEventListener('focus', handleEnter);
          element.removeEventListener('blur', handleLeave);
          tl.kill();
        };
      },
      ref
    );

    return () => mm.kill();
  }, []);

  return (
    <Link
      ref={ref}
      href={`/projects/${project.slug}`}
      className={clsx(
        'group relative flex flex-col gap-4 rounded-3xl border border-border-subtle p-6 transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2'
      )}
    >
      <div className="relative overflow-hidden rounded-2xl bg-surface-muted">
        <div
          data-card-mask
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:bg-gradient-to-t group-hover:from-background/60 group-hover:to-transparent"
        />
        <Image
          data-card-image
          src={project.cover}
          alt={project.title}
          width={1200}
          height={900}
          className="aspect-[4/3] w-full object-cover transition-transform duration-500"
        />
      </div>
      <div className="text-sm uppercase tracking-[0.3em] text-muted">{project.year}</div>
      <div className="text-2xl font-display leading-snug">{project.title}</div>
      <p className="text-base text-muted">{project.summary}</p>
      <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-muted">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-border-subtle px-3 py-1">
            {tag.replace('-', ' ')}
          </span>
        ))}
      </div>
    </Link>
  );
}

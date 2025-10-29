'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { useRouter } from 'next/navigation';
import InView from './InView';

export default function HeroStack() {
  const router = useRouter();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-hero-line]',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.15
        }
      );
      gsap.fromTo(
        '[data-hero-cta]',
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          delay: 0.5
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleProjects = () => {
    router.push('/projects');
  };

  const handleAbout = () => {
    router.push('/about');
  };

  return (
    <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-32 pt-32 sm:px-10 lg:px-16">
      <div className="flex flex-col gap-4 text-balance text-5xl font-display tracking-tight sm:text-6xl lg:text-7xl">
        <span data-hero-line>Ayush Sharma</span>
        <span className="text-muted" data-hero-line>
          Building across AI and Hardware.
        </span>
      </div>
      <div className="max-w-xl text-lg text-muted sm:text-xl" data-hero-line>
        I am a Student at the University of Wisconsin - Madison. I am currently working as an Undergraduate Research Intern at the Data Science Institute. Last summer, I interned at Amazon as a Software Development Engineer Intern. My research and projects span Machine Learning, Computer Vision, Chip Design, and Embedded Systems.
      </div>
      <div className="flex flex-wrap items-center gap-3" data-hero-cta>
        <button
          type="button"
          onClick={handleProjects}
          className="rounded-full bg-foreground px-6 py-3 text-base font-semibold text-background transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          View Projects
        </button>
        <button
          type="button"
          onClick={handleAbout}
          className="rounded-full border border-border-subtle px-6 py-3 text-base font-semibold transition-colors hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          About Ayush
        </button>
      </div>
      <InView delay={200} className="flex flex-wrap gap-4 text-sm uppercase tracking-[0.25em] text-muted">
        <span>Machine Learning</span>
        <span>Interactive Systems</span>
        <span>Hardware Experiments</span>
        <span>Human-Centered Research</span>
      </InView>
    </div>
  );
}

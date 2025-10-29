import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Grid from '@/components/Grid';
import InView from '@/components/InView';

export const metadata: Metadata = {
  title: 'About',
  description: 'Meet Ayush Sharma, a computer science and engineering student blending ML research with tactile builds.'
};


const highlights = [
  {
    label: 'Education',
    value: ' University of Wisconsin Madison, BS in Computer Engineering, BS in Computer Science, Graduating May 2027'
  },
  {
    label: 'Location',
    value: 'Madison, Wisconsin'
  }
];

const speaking = [
  'Part of team that received SORTEE Commendation Award (2025)',
];

export default function AboutPage() {
  return (
    <Grid className="gap-16 pb-24 pt-16">
      <header className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-muted">About Ayush</p>
          <h1 className="text-5xl font-display tracking-tight sm:text-6xl">
            Engineering ideas that bridge research, hardware, and the human experience
          </h1>
          <p className="text-lg text-muted">
            I split my time between adversarial ML research, Julia-based phylogenetics, and building playful interfaces
            that explain complex systems. The throughline: curiosity paired with a responsibility to document and share
            what I learn.
          </p>
          <Link
            href="/docs/Ayush_Sharma_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground"
          >
            View résumé →
          </Link>
        </div>
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative h-72 w-72 overflow-hidden rounded-full border border-border-subtle">
            <Image src="/profile-placeholder.svg" alt="Ayush Sharma" fill className="object-cover" />
          </div>
        </div>
      </header>

      <section className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          <h2 className="text-3xl font-display">Experience:</h2>
          <p className="text-lg text-muted">
            Currently, I’m an Undergraduate Research Intern at the UW Data Science Institute, where I help build
            phylogenetic analysis tools in Julia. I worked on estimating distance between phylogenetic trees using
            based on mu-representations. I am currently working on building an algorithm to creating consensus networks.
          </p>
          <p className="text-lg text-muted">
            During Summer 2025, I interned at Amazon as a Software Development Engineer Intern, where I worked on the backend of Amazon Relay
          </p>
        </div>
        <div className="space-y-4">
          {highlights.map((highlight) => (
            <div key={highlight.label} className="rounded-2xl border border-border-subtle p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-muted">{highlight.label}</p>
              <p className="mt-2 text-sm text-foreground">{highlight.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-display">Recognition & collaborations</h2>
        <ul className="space-y-2 text-lg text-muted">
          {speaking.map((item) => (
            <li key={item} className="list-disc pl-5">
              {item}
            </li>
          ))}
        </ul>
      </section>
    </Grid>
  );
}

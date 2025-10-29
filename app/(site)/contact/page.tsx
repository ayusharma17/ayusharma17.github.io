import type { Metadata } from 'next';
import Link from 'next/link';
import Grid from '@/components/Grid';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Connect with Ayush Sharma via email, GitHub, or LinkedIn.'
};

const items = [
  {
    label: 'Email',
    href: 'mailto:sharma272@wisc.edu',
    display: 'sharma272@wisc.edu',
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current">
        <path d="M3 5h18v14H3z" strokeWidth="1.5" />
        <path d="m3 6 9 7 9-7" strokeWidth="1.5" />
      </svg>
    )
  },
  {
    label: 'GitHub',
    href: 'https://github.com/ayusharma17',
    display: 'github.com/ayusharma17',
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-current">
        <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2c-3.34.73-4.04-1.61-4.04-1.61-.55-1.36-1.34-1.73-1.34-1.73-1.09-.76.08-.75.08-.75 1.2.09 1.83 1.23 1.83 1.23 1.07 1.82 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.54-1.53.12-3.19 0 0 1.01-.32 3.3 1.23a11.4 11.4 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.89.12 3.19.77.84 1.23 1.91 1.23 3.22 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.11.81 2.24v3.32c0 .32.22.7.82.58A12 12 0 0 0 12 .5Z" />
      </svg>
    )
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ayushsharma17/',
    display: 'linkedin.com/in/ayushsharma17',
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-current">
        <path d="M4.98 3.5a2 2 0 1 1-.02 4 2 2 0 0 1 .02-4Zm.02 5.5H2v12h3V9Zm5 0H7v12h3v-6.35c0-1.87 2-2.02 2 0V21h3v-6.91c0-4.22-4.58-4.07-6-1.99V9Z" />
      </svg>
    )
  }
];

export default function ContactPage() {
  return (
    <Grid className="gap-16 pb-24 pt-16">
      <header className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-muted">Contact</p>
        <h1 className="text-5xl font-display tracking-tight sm:text-6xl">Let’s connect</h1>
        <p className="max-w-2xl text-lg text-muted">
          I’m always happy to chat about ML safety, tactile hardware, and expressive tooling. Reach out through any of
          the channels below.
        </p>
      </header>
      <section className="grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="group flex flex-col gap-4 rounded-3xl border border-border-subtle p-6 transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            target={item.href.startsWith('http') ? '_blank' : undefined}
            rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
          >
            <span className="flex items-center gap-3 text-base font-semibold text-foreground">
              <span className="rounded-full bg-surface-muted p-3 text-accent transition-colors group-hover:bg-accent/10">
                {item.icon}
              </span>
              {item.label}
            </span>
            <span className="text-sm text-muted">{item.display}</span>
          </Link>
        ))}
      </section>
    </Grid>
  );
}

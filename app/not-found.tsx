import Link from 'next/link';
import Grid from '@/components/Grid';

export default function NotFound() {
  return (
    <Grid className="items-center justify-center gap-8 pb-24 pt-24 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-muted">404</p>
      <h1 className="text-5xl font-display tracking-tight sm:text-6xl">This page drifted into the void</h1>
      <p className="text-lg text-muted">
        The link you followed may be outdated. Explore the projects or return home to keep browsing.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link className="rounded-full bg-foreground px-6 py-3 text-base font-semibold text-background" href="/">
          Back home
        </Link>
        <Link className="rounded-full border border-border-subtle px-6 py-3 text-base font-semibold" href="/projects">
          View projects
        </Link>
      </div>
    </Grid>
  );
}

"use client";

import Link from 'next/link';
import Grid from './Grid';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-subtle bg-surface-muted text-sm text-muted">
      <Grid className="gap-6 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <p className="uppercase tracking-[0.25em]">Credits</p>
            <p>
              Designed and built by Ayush Sharma. Shader, GSAP, and three.js authored from scratch.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 text-right">
            <span>© {year}</span>
          </div>
        </div>
      </Grid>
    </footer>
  );
}

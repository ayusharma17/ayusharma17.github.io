import type { Metadata } from 'next';
import Grid from '@/components/Grid';
import ProjectsGallery from '@/components/ProjectsGallery';
import { projects } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Selected projects spanning machine learning, interactive systems, and robotics.'
};

export default function ProjectsPage() {
  return (
    <Grid className="gap-12 pb-24 pt-16">
      <header className="flex flex-col gap-4">
        <p className="text-sm uppercase tracking-[0.3em] text-muted">Projects</p>
        <h1 className="text-4xl font-display tracking-tight sm:text-5xl">Work that bridges research and polish</h1>
        <p className="max-w-2xl text-lg text-muted">
          Case studies featuring ML adversarial research, FPGA-driven robotics, and data products for creative teams.
        </p>
      </header>
      <ProjectsGallery projects={projects} />
    </Grid>
  );
}

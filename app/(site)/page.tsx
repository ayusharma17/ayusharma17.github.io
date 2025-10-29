import dynamic from 'next/dynamic';
import Link from 'next/link';
import Grid from '@/components/Grid';
import HeroStack from '@/components/HeroStack';
import InView from '@/components/InView';
import { projects } from '@/lib/projects';

const CanvasHero = dynamic(() => import('@/webgl/CanvasHero'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0">
      <img
        src="/fallback-hero.svg"
        alt="Abstract gradient field"
        className="h-full w-full object-cover opacity-60"
      />
    </div>
  )
});

export default function HomePage() {
  return (
    <div className="relative isolate overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <CanvasHero />
      </div>
      <HeroStack />
      <Grid className="relative z-10 gap-20 pb-24">
        {/* Sections removed */}
      </Grid>
    </div>
  );
}

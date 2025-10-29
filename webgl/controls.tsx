'use client';

import { MutableRefObject, useEffect, useState } from 'react';
import type { HeroThreeContext, HeroUniforms } from './initThree';

const sliderConfig = [
  {
    key: 'u_contrast' as const,
    label: 'Contrast',
    min: 0.2,
    max: 1.5,
    step: 0.05
  },
  {
    key: 'u_intensity' as const,
    label: 'Intensity',
    min: 0.0,
    max: 1.2,
    step: 0.05
  },
  {
    key: 'u_hue' as const,
    label: 'Hue shift',
    min: -0.5,
    max: 0.5,
    step: 0.01
  }
];

type UniformKey = typeof sliderConfig[number]['key'];

type Props = {
  uniformsRef: MutableRefObject<HeroThreeContext | null>;
};

export default function HeroControls({ uniformsRef }: Props) {
  const [uniforms, setUniforms] = useState<HeroUniforms | null>(null);

  useEffect(() => {
    let frame: number | null = null;
    const watch = () => {
      const nextUniforms = uniformsRef.current?.uniforms ?? null;
      if (nextUniforms) {
        setUniforms(nextUniforms);
        return;
      }
      frame = requestAnimationFrame(watch);
    };
    watch();
    return () => {
      if (frame !== null) {
        cancelAnimationFrame(frame);
      }
    };
  }, [uniformsRef]);

  if (!uniforms) return null;

  const handleChange = (key: UniformKey, next: number) => {
    if (!uniforms) return;
    uniforms[key].value = next;
    setUniforms({ ...uniforms });
  };

  return (
    <div className="pointer-events-auto absolute bottom-6 left-6 flex w-72 flex-col gap-3 rounded-2xl border border-border-subtle bg-background/80 p-4 text-xs text-muted backdrop-blur">
      <p className="text-[0.65rem] uppercase tracking-[0.3em] text-muted">Dev Controls</p>
      {sliderConfig.map((config) => (
        <label key={config.key} className="flex flex-col gap-2">
          <span className="flex items-center justify-between">
            <span>{config.label}</span>
            <span className="font-mono text-[0.65rem] text-foreground">{uniforms[config.key].value.toFixed(2)}</span>
          </span>
          <input
            type="range"
            min={config.min}
            max={config.max}
            step={config.step}
            value={uniforms[config.key].value}
            onChange={(event) => handleChange(config.key, Number(event.target.value))}
          />
        </label>
      ))}
    </div>
  );
}

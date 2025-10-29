'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { createHeroContext, HeroThreeContext } from './initThree';
import { isMotionPaused, subscribeMotion } from '@/lib/motion';
import HeroControls from './controls';

function canUseWebGL() {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    );
  } catch (err) {
    return false;
  }
}

async function loadShaders() {
  const [vertexSource, fragmentSource] = await Promise.all([
    fetch(new URL('./shader.vert', import.meta.url)).then((res) => res.text()),
    fetch(new URL('./shader.frag', import.meta.url)).then((res) => res.text())
  ]);
  return { vertex: vertexSource, fragment: fragmentSource };
}

export default function CanvasHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<HeroThreeContext | null>(null);
  const frameRef = useRef<number>();
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const [supported, setSupported] = useState(true);
  const [devMode, setDevMode] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    setDevMode(params.get('dev') === '1');
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!canUseWebGL()) {
      setSupported(false);
      return;
    }

    let disposed = false;
    let context: HeroThreeContext | null = null;
    let lastTime = performance.now();
    let elapsed = 0;

    const stopLoop = () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = undefined;
      }
    };

    const startLoop = () => {
      if (!context) return;
      stopLoop();
      lastTime = performance.now();
      const tick = (now: number) => {
        if (!context) return;
        frameRef.current = requestAnimationFrame(tick);
        const delta = now - lastTime;
        lastTime = now;
        elapsed += delta;
        context.render(elapsed / 1000);
      };
      frameRef.current = requestAnimationFrame(tick);
    };

    const init = async () => {
      try {
        const shaders = await loadShaders();
        if (disposed) return;
        context = createHeroContext(canvas, shaders);
        contextRef.current = context;

        resizeObserverRef.current = new ResizeObserver(() => context?.resize());
        resizeObserverRef.current.observe(canvas);

        const handlePointer = (event: PointerEvent) => {
          if (!context) return;
          const rect = canvas.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = rect.bottom - event.clientY;
          context.uniforms.u_mouse.value.set(x, y);
        };

        const pointerListener = (event: PointerEvent) => {
          event.preventDefault();
          handlePointer(event);
        };

        canvas.addEventListener('pointermove', pointerListener, { passive: false });
        canvas.addEventListener('pointerdown', pointerListener, { passive: false });

        const handleVisibility = () => {
          if (!context) return;
          if (document.hidden || isMotionPaused()) {
            stopLoop();
          } else {
            startLoop();
          }
        };

        document.addEventListener('visibilitychange', handleVisibility);

        const unsubscribe = subscribeMotion((paused) => {
          if (paused) {
            stopLoop();
          } else if (!document.hidden) {
            startLoop();
          }
        });

        const handleResize = () => context?.resize();
        window.addEventListener('resize', handleResize);

        if (!isMotionPaused() && !document.hidden) {
          startLoop();
        }

        return () => {
          unsubscribe();
          document.removeEventListener('visibilitychange', handleVisibility);
          canvas.removeEventListener('pointermove', pointerListener);
          canvas.removeEventListener('pointerdown', pointerListener);
          window.removeEventListener('resize', handleResize);
        };
      } catch (error) {
        console.error('Failed to initialize hero shader', error);
        setSupported(false);
      }
    };

    const cleanupSubscriptionsPromise = init();

    return () => {
      disposed = true;
      stopLoop();
      cleanupSubscriptionsPromise.then((cleanup) => cleanup?.());
      resizeObserverRef.current?.disconnect();
      resizeObserverRef.current = null;
      contextRef.current?.dispose();
      contextRef.current = null;
    };
  }, []);

  if (!supported) {
    return (
      <div className="absolute inset-0">
        <img src="/fallback-hero.svg" alt="Static abstract gradient background" className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      <canvas
        ref={canvasRef}
        className={clsx('h-full w-full', 'pointer-events-auto')}
        role="presentation"
        aria-hidden
      />
      {devMode && <HeroControls uniformsRef={contextRef} />}
    </div>
  );
}

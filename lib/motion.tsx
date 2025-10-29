'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { gsap } from 'gsap';

type MotionSubscriber = (paused: boolean) => void;

const subscribers = new Set<MotionSubscriber>();
let prefersReduced = false;

if (typeof window !== 'undefined') {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  prefersReduced = mq.matches;
  gsap.globalTimeline.paused(prefersReduced);
  const handler = (event: MediaQueryListEvent) => {
    prefersReduced = event.matches;
    setMotionPaused(prefersReduced);
  };
  if (typeof mq.addEventListener === 'function') {
    mq.addEventListener('change', handler);
  } else if (typeof mq.addListener === 'function') {
    mq.addListener(handler);
  }
}

let pausedState = prefersReduced;

export function subscribeMotion(handler: MotionSubscriber) {
  subscribers.add(handler);
  handler(pausedState);
  return () => {
    subscribers.delete(handler);
  };
}

function emit(paused: boolean) {
  subscribers.forEach((fn) => fn(paused));
}

export function setMotionPaused(paused: boolean) {
  pausedState = paused;
  gsap.globalTimeline.paused(paused);
  emit(paused);
}

export function isMotionPaused() {
  return pausedState;
}

type MotionContextValue = {
  paused: boolean;
};

const MotionContext = createContext<MotionContextValue | null>(null);

export function MotionProvider({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState<boolean>(prefersReduced);

  useEffect(() => {
    const unsubscribe = subscribeMotion((value) => setPaused(value));
    return () => unsubscribe();
  }, []);

  const value = useMemo(
    () => ({
      paused
    }),
    [paused]
  );

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

export function useMotion() {
  const ctx = useContext(MotionContext);
  if (!ctx) {
    throw new Error('useMotion must be used within MotionProvider');
  }
  return ctx;
}

'use client';

import { useEffect, useRef } from 'react';

type InViewProps = React.PropsWithChildren<{
  delay?: number;
  className?: string;
  as?: React.ElementType;
}>;

export default function InView({ children, delay = 0, className, as }: InViewProps) {
  const Component = as ?? 'div';
  const ref = useRef<HTMLElement | SVGElement | null>(null);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-inview', 'true');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2
      }
    );

    const timeout = window.setTimeout(() => {
      observer.observe(target);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      observer.disconnect();
    };
  }, [delay]);

  return (
    <Component ref={ref as any} className={className} data-inview="false">
      {children}
    </Component>
  );
}

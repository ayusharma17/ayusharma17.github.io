'use client';

import clsx from 'clsx';
import type { PropsWithChildren } from 'react';

export default function Kbd({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <kbd
      className={clsx(
        'inline-flex min-w-[1.5rem] items-center justify-center rounded border border-border-subtle bg-surface-muted px-1.5 py-0.5 text-[0.7rem] font-mono uppercase tracking-wide text-muted',
        className
      )}
    >
      {children}
    </kbd>
  );
}

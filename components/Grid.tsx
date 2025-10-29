'use client';

import clsx from 'clsx';
import type { PropsWithChildren } from 'react';

type GridProps = PropsWithChildren<{
  className?: string;
}>;

export default function Grid({ children, className }: GridProps) {
  return (
    <div className={clsx('mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 sm:px-10 lg:px-16', className)}>
      {children}
    </div>
  );
}

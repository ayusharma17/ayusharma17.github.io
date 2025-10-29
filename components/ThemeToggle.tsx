'use client';

import { useEffect, useState } from 'react';
import { ThemeMode, useTheme } from '@/lib/theme';
import clsx from 'clsx';

const options: { label: string; value: ThemeMode }[] = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' }
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex items-center gap-2" role="group" aria-label="Theme mode">
      <span className="text-xs uppercase tracking-[0.18em] text-muted">Theme</span>
      <div className="relative flex rounded-full border border-border-subtle bg-surface-muted px-1 py-1">
        {options.map((option) => {
          const active = mounted ? theme === option.value : option.value === 'light';
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setTheme(option.value)}
              className={clsx(
                'min-w-[72px] rounded-full px-3 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
                active
                  ? 'bg-foreground text-background shadow-sm'
                  : 'text-muted hover:text-foreground focus-visible:bg-surface-hover'
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ThemeToggle;

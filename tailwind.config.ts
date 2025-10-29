import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './webgl/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
      },
      colors: {
        accent: 'var(--color-accent)'
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        grain: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '25%': { transform: 'translate(2%, -2%)' },
          '50%': { transform: 'translate(-2%, 1%)' },
          '75%': { transform: 'translate(1%, 2%)' }
        }
      },
      animation: {
        'fade-in': 'fade-in 240ms ease-out forwards',
        grain: 'grain 8s steps(6) infinite'
      }
    }
  },
  future: {
    hoverOnlyWhenSupported: true
  },
  plugins: []
};

export default config;

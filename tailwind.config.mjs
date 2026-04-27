/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Primary palette — from brand brief
        ink: {
          900: '#0A0A0A', // background primary (dark)
          800: '#121212', // near-black elevated
          700: '#1A1A1A', // card surface on dark
          600: '#232323', // hairline fill
        },
        paper: {
          50: '#FFFFFF',
          100: '#FAFAF8', // warm off-white (for light-mode editorial section)
          200: '#F4F2EC',
        },
        text: {
          light: '#F7F7F7',
          dark: '#1A1A1A',
          muted: '#8F8F8F',
          dim: '#4A4A4A',
        },
        // Brand blue gradient stops
        brand: {
          cyan: '#4FC3F7',
          azure: '#1976D2',
          azureDeep: '#0D47A1',
        },
        // Warm accent — amber, operational warmth
        amber: {
          accent: '#E8A44C',
          soft: '#F1C288',
        },
        // Signal colors for data chips
        signal: {
          up: '#4ADE80',
          down: '#F87171',
          neutral: '#8F8F8F',
        },
      },
      fontFamily: {
        display: ['"Manrope"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        // Editorial hero sizes
        'hero-sm': ['2.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'hero-md': ['3.75rem', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        'hero-lg': ['5.5rem', { lineHeight: '0.98', letterSpacing: '-0.04em' }],
      },
      letterSpacing: {
        tightest: '-0.045em',
        label: '0.14em',
      },
      maxWidth: {
        content: '72rem',
        prose: '44rem',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #4FC3F7 0%, #1976D2 100%)',
        'brand-gradient-soft': 'linear-gradient(135deg, rgba(79,195,247,0.18) 0%, rgba(25,118,210,0.18) 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.2, 0.9, 0.3, 1) both',
        'fade-in': 'fadeIn 0.9s ease both',
        'pulse-slow': 'pulse 3.6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 38s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

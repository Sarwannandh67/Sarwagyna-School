import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#fffefb',
        'canvas-soft': '#f8f4f0',
        ink: '#201515',
        'ink-soft': '#2f2a26',
        body: '#605d52',
        'body-mid': '#939084',
        mute: '#c5c0b1',
        primary: '#ff4f00',
        'on-primary': '#fffefb',
      },
      borderRadius: {
        DEFAULT: '12px',
        pill: '9999px',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;

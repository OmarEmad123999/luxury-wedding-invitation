/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Luxury palette
        obsidian:   '#0a0a0a',
        charcoal:   '#111111',
        'dark-surface': '#161616',
        ivory:      '#f5f0e8',
        'warm-white': '#faf7f2',
        champagne:  '#c9a96e',
        gold:       '#b8945a',
        'gold-light': '#d4b483',
        'gold-dim':  '#8a6a3a',
        beige:      '#e8dcc8',
        'beige-dim': '#c4b89a',
        muted:      '#6b6560',
        'muted-light': '#9a9390',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        serif:   ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:    ['"DM Sans"', '"Inter"', 'system-ui', 'sans-serif'],
        mono:    ['"DM Mono"', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
        display: ['clamp(3.5rem, 10vw, 9rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(2.5rem, 7vw, 6rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        hero: ['clamp(1rem, 2vw, 1.25rem)', { lineHeight: '1.6', letterSpacing: '0.25em' }],
      },
      letterSpacing: {
        widest2: '0.3em',
        widest3: '0.4em',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '100': '25rem',
        '120': '30rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'fade-in': 'fadeIn 1.2s ease forwards',
        'pulse-gold': 'pulseGold 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-18px)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGold: {
          '0%, 100%': { opacity: '0.6', boxShadow: '0 0 20px rgba(201,169,110,0.2)' },
          '50%':      { opacity: '1',   boxShadow: '0 0 40px rgba(201,169,110,0.5)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      backgroundImage: {
        'gold-gradient':    'linear-gradient(135deg, #b8945a 0%, #d4b483 40%, #c9a96e 60%, #8a6a3a 100%)',
        'dark-gradient':    'linear-gradient(180deg, #0a0a0a 0%, #111111 100%)',
        'shimmer-gold':     'linear-gradient(90deg, transparent 0%, rgba(201,169,110,0.3) 50%, transparent 100%)',
        'radial-glow':      'radial-gradient(ellipse at center, rgba(201,169,110,0.08) 0%, transparent 70%)',
        'vignette':         'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.8) 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'gold-sm': '0 0 15px rgba(201,169,110,0.15)',
        'gold-md': '0 0 30px rgba(201,169,110,0.25)',
        'gold-lg': '0 0 60px rgba(201,169,110,0.35)',
        'glass':   '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
        'glass-lg':'0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
        'inset-gold': 'inset 0 1px 0 rgba(201,169,110,0.2)',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'cinematic': 'cubic-bezier(0.77, 0, 0.175, 1)',
        'smooth': 'cubic-bezier(0.43, 0.13, 0.23, 0.96)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
        '1500': '1500ms',
        '2000': '2000ms',
      },
    },
  },
  plugins: [],
}

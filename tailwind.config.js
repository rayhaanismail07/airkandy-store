/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // AirKandy Brand Palette (matches live site + Woodmart light style)
        ak: {
          teal:       '#275C53',
          'teal-dark':'#1e4740',
          'teal-light':'#317569',
          gold:       '#E2BB53',
          'gold-dark':'#c9a43c',
          'gold-light':'#f0cd6a',
          warm:       '#F5F0EA',
          'warm-dark':'#EDE7DF',
          dark:       '#565656',
          'dark-soft':'#767676',
          white:      '#FFFFFF',
        },
        // Woodmart UI neutrals
        wd: {
          gray100: '#f7f7f7',
          gray200: '#f1f1f1',
          gray300: '#e0e0e0',
          gray400: '#bbb',
          gray500: '#999',
          gray600: '#767676',
          gray700: '#555',
          gray800: '#333',
          gray900: '#242424',
          border:  'rgba(0,0,0,0.09)',
        },
      },
      fontFamily: {
        sans:    ['Jost', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Jost', 'system-ui', 'sans-serif'],
        body:    ['Jost', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'wd-card':   '0 2px 12px rgba(0,0,0,0.08)',
        'wd-hover':  '0 8px 28px rgba(0,0,0,0.14)',
        'wd-header': '0 1px 8px rgba(0,0,0,0.1)',
        'wd-dropdown':'0 4px 20px rgba(0,0,0,0.12)',
        'ak-teal':   '0 4px 18px rgba(39,92,83,0.35)',
        'ak-gold':   '0 4px 18px rgba(226,187,83,0.35)',
      },
      borderRadius: {
        'wd': '2px',
        'wd-md': '4px',
        'wd-lg': '8px',
      },
      transitionTimingFunction: {
        'wd': 'cubic-bezier(0.19,1,0.22,1)',
      },
      animation: {
        'fade-in':    'fadeIn 0.35s ease-out',
        'slide-down': 'slideDown 0.35s cubic-bezier(0.19,1,0.22,1)',
        'slide-up':   'slideUp 0.35s cubic-bezier(0.19,1,0.22,1)',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-10px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'chatgpt-gray': '#515050',
        'chatgpt-sidebar': '#1f1e1e',
        'chatgpt-hover': '#2A2B32',
        'chatgpt-border': '#4E4F60',
        'chatgpt-input-bg': '#40414F',
        'chatgpt-bubble': '#343541',
      },
      animation: {
        bounce: 'bounce 1s infinite',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#fff',
            maxWidth: 'none',
            a: {
              color: '#60a5fa',
              '&:hover': {
                color: '#93c5fd',
              },
            },
            strong: {
              color: '#fff',
            },
            code: {
              color: '#fff',
              backgroundColor: '#1f2937',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: '#1f2937',
              color: '#fff',
              padding: '1em',
              borderRadius: '0.5rem',
              overflow: 'auto',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
              borderRadius: '0',
            },
            h1: {
              color: '#fff',
            },
            h2: {
              color: '#fff',
            },
            h3: {
              color: '#fff',
            },
            h4: {
              color: '#fff',
            },
            blockquote: {
              color: '#d1d5db',
              borderLeftColor: '#4b5563',
            },
            hr: {
              borderColor: '#4b5563',
            },
            ul: {
              listStyleType: 'disc',
            },
            ol: {
              listStyleType: 'decimal',
            },
            'ul, ol': {
              paddingLeft: '1.25em',
            },
            table: {
              borderColor: '#4b5563',
            },
            th: {
              color: '#fff',
              borderBottomColor: '#4b5563',
            },
            td: {
              borderBottomColor: '#4b5563',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
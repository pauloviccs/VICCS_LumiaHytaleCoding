/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        liquid: {
          bg: '#050510',
          base: 'rgba(255, 255, 255, 0.03)',
          border: 'rgba(255, 255, 255, 0.1)',
          primary: '#00f3ff', // Cyan
          accent: '#bc13fe',  // Electric Purple
          success: '#00ff9d',
          error: '#ff0055',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'liquid-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.01) 100%)',
        'aurora': 'radial-gradient(circle at 50% 50%, #bc13fe33 0%, transparent 50%), radial-gradient(circle at 80% 0%, #00f3ff33 0%, transparent 50%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 1, boxShadow: '0 0 20px rgba(0, 243, 255, 0.2)' },
          '50%': { opacity: .7, boxShadow: '0 0 10px rgba(0, 243, 255, 0.1)' },
        }
      }
    },
  },
  plugins: [],
}

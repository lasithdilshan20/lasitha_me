import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#0a0a0f',
          blue: '#00d4ff',
          green: '#39ff14',
          purple: '#8a2be2'
        }
      },
      backgroundImage: {
        'grid-neon': 'radial-gradient(rgba(0,212,255,0.1) 1px, transparent 1px)' ,
        'glass': 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))'
      },
      boxShadow: {
        neon: '0 0 10px rgba(0,212,255,0.8), 0 0 20px rgba(138,43,226,0.6)',
        glow: '0 0 20px rgba(57,255,20,0.6)',
      },
      backdropBlur: {
        xs: '2px'
      },
      keyframes: {
        glow: {
          '0%, 100%': { textShadow: '0 0 10px #00d4ff, 0 0 20px #8a2be2' },
          '50%': { textShadow: '0 0 20px #39ff14, 0 0 30px #00d4ff' },
        },
        float: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
          '100%': { transform: 'translateY(0px)' }
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 rgba(0,212,255,0.0)' },
          '50%': { boxShadow: '0 0 25px rgba(0,212,255,0.6)' }
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px,2px)' },
          '40%': { transform: 'translate(-2px,-2px)' },
          '60%': { transform: 'translate(2px,2px)' },
          '80%': { transform: 'translate(2px,-2px)' },
          '100%': { transform: 'translate(0)' }
        }
      },
      animation: {
        glow: 'glow 3s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2.5s ease-in-out infinite',
        glitch: 'glitch 1s steps(2, end) infinite'
      }
    },
  },
  plugins: [],
}
export default config

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#050508',
        deep: '#0a0a0f',
        'accent-violet': '#7B61FF',
        'accent-blue': '#0A84FF',
        'accent-green': '#30D158',
        'accent-pink': '#FF375F',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'sans-serif'],
      },
      backdropBlur: {
        glass: '24px',
        heavy: '60px',
      },
      borderRadius: {
        card: '24px',
        pill: '100px',
      },
      boxShadow: {
        'glow-violet': '0 20px 60px rgba(123, 97, 255, 0.35), 0 0 0 1px rgba(123, 97, 255, 0.15)',
        'glow-blue': '0 20px 60px rgba(10, 132, 255, 0.35), 0 0 0 1px rgba(10, 132, 255, 0.15)',
        'glow-green': '0 20px 60px rgba(48, 209, 88, 0.35), 0 0 0 1px rgba(48, 209, 88, 0.15)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config

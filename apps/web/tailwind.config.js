export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0B0F14',
        card: '#10161D',
        border: '#1E2937',
      },
      boxShadow: {
        soft: '0 6px 20px rgba(0,0,0,0.25)',
      },
      borderRadius: {
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
};

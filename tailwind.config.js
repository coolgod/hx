/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Spring
        'spring-bg': '#fde8f0',
        'spring-accent': '#e8799a',
        'spring-frame': '#fff0f5',
        'spring-pin': '#e8799a',
        'spring-rope': '#c9916d',
        'spring-title': '#ff007f',
        // Summer
        'summer-bg': '#e8f7f9',
        'summer-accent': '#2ab7ca',
        'summer-frame': '#f0faff',
        'summer-pin': '#fed766',
        'summer-rope': '#7ec8c8',
        'summer-title': '#00eeff',
        // Autumn
        'autumn-bg': '#3d1f00',
        'autumn-accent': '#e07b39',
        'autumn-frame': '#983b07',
        'autumn-pin': '#c0392b',
        'autumn-rope': '#8b5e3c',
        'autumn-title': '#ffcc44',
        // Winter
        'winter-bg': '#ddeeff',
        'winter-accent': '#8ab4d8',
        'winter-frame': '#f0f8ff',
        'winter-pin': '#8ab4d8',
        'winter-rope': '#aac4d8',
        'winter-title': '#c8eeff',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        scaleIn: {
          from: { transform: 'scale(0.88)', opacity: '0' },
          to:   { transform: 'scale(1)',    opacity: '1' },
        },
      },
      animation: {
        'fade-in':  'fadeIn 0.25s ease',
        'scale-in': 'scaleIn 0.25s cubic-bezier(0.34,1.56,0.64,1)',
      },
    },
  },
  plugins: [],
}

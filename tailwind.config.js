/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: '#ffffff',
        black: '#000000',
        pink: '#E2218F',
        green: '#8DC63F',
        yellow: {
          DEFAULT: '#FCB018',
          light: '#fff3cd',
          dark: '#856404'
        },
        text: '#1B3030',
        'background':'#eef5f5',
        'text-secondary': '#c7c7c7',
        danger: '#ce2c31',
        'danger-hover': '#ffcdce',
        'less': '#aeb3c3',
      }
    },
  },
  plugins: [],
}

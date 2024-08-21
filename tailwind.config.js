/** @type {import('tailwindcss').Config} */
import primeui from 'tailwindcss-primeui'
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
  content: ['./resources/**/*.edge', './resources/**/*.{js,ts,jsx,tsx,vue}'],
  darkMode: ['selector', '[class="app-dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
    },
  },
  plugins: [primeui],
}

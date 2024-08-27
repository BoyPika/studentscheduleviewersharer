import flowbitePlugin from 'flowbite/plugin'

import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#ECE0FF",
          100: "#D9C2FF",
          200: "#B78AFF",
          300: "#914DFF",
          400: "#6B0FFF",
          500: "#5100D4",
          600: "#4100A8",
          700: "#310080",
          800: "#210057",
          900: "#100029"
        }
      }
    }
  },

  plugins: [flowbitePlugin]
} as Config;
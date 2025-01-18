import type { Config } from "tailwindcss";
import daisyui from 'daisyui'

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [ "#010104"],
  },
  theme: {
    extend: {
      colors: {
        'text': '#ebe9fc',
        'background': '#010104',
        'primary': '#3a31d8',
        'secondary': '#020024',
        'accent': '#0600c2',
       },
    },
  },
  plugins: [daisyui],
} satisfies Config;

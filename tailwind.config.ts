import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary-color)",
        color0: "var(--color-0)",
        color20: "var(--color-20)",
        color60: "var(--color-60)",
        color80: "var(--color-80)",
        color100: "var(--color-100)",
        contrast: "var(--color-contrast)",
        contrasthover: "var(--color-contrast-hover)",
      },
    },
  },
  plugins: [],
};
export default config;

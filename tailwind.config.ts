import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#FAF8F5",
          50: "#FFFFFF",
          100: "#FAF8F5",
          200: "#F5F0E8",
        },
        cream: {
          DEFAULT: "#F3EFEA",
          50: "#FAF7F4",
          100: "#F3EFEA",
          200: "#E7DFD5",
          300: "#D9CEC0",
        },
        umber: {
          DEFAULT: "#241A14",
          light: "#3E3027",
          dark: "#17100C",
        },
        taupe: {
          DEFAULT: "#6B5E55",
          light: "#8C7E74",
          dark: "#4E433B",
        },
        sand: {
          DEFAULT: "#E5DDD5",
          light: "#EFE9E3",
          dark: "#D0C4B8",
        },
        gold: {
          DEFAULT: "#C59A45",
          light: "#F4EBD9",
          medium: "#D4AC59",
          dark: "#A37B2C",
          deep: "#785617",
        },
        sage: {
          DEFAULT: "#2E6F40",
          light: "#EAF3ED",
          dark: "#204F2E",
        },
        terracotta: {
          DEFAULT: "#B84A39",
          light: "#FBECE9",
          dark: "#8D3425",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Cinzel", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

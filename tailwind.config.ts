import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: '320px',    // Extra small phones (iPhone SE, older Android)
      sm: "375px",    // Standard mobile phones (iPhone 12/13/14 standard)
      md: "768px",    // Tablets (iPad, Android tablets)
      lg: "1200px",   // Laptops and desktops
      xl: "1440px",   // Large desktops
      "2xl": "1920px",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "2rem",
      },
    },
    extend: {
      fontFamily:{
        sans: ['var(--font-sans)'],
        serif: ['var(--font-serif)'],
      },
      animation:{
        'ping-large': "ping-large 1s ease-in-out infinite",
        'move-left': 'move-left 1s linear infinite',
        'move-right': 'move-right 1s linear infinite'
      },
        keyframes: {
          'ping-large' : {
            '75%, 100%': {
              transform: 'scale(3)',
              opacity: '0',
            }
          },
          'move-left': {
            '0%': {
              transform: 'translateX(0%)'
            },
            '100%': {
              transform: 'translateX(-50%)'
            }
          },
          'move-right': {
            '0%': {
              transform: 'translateX(-50%)'
            },
            '100%': {
              transform: 'translateX(0%)'
            }
          }
      }
    },
  },
  plugins: [],
};
export default config;

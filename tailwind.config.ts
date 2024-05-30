import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        fhd: "1920px", //  1080p screens are typically  1920x1080
      },
      colors: {
        "white-900": "#fff",
        "aqua-blue": "#45a1be",
        purple: "#e2b8e9",
        black: "#000",
        cornflowerblue: "#2a73cc",
        darkslategray: {
          100: "#49454f",
          200: "#474749",
          300: "#2d2f31",
          400: "#333F51",
          500: "#1E1E1E",
          550: "#2D2F31",
          600: "#2B2B2B",
          700: "#1D1D1D",
          800: "#05004E",
        },
        dimgray: {
          50: "#737791",
          100: "#6a6f73",
          200: "#636363",
          300: "#556987",
          400: "#5C6C75",
          500: "#2A3342",
          600: "#667085",
          700: "#8896AB",
          800: "#1F1F1F",
          900: "#151D48",
        },
        lightgray: "#d1d7dc",
        "greyscale-500": "#32363b",
        "primary-500": "#22c55e",
        "greyscales-gray-darker": "#262628",
        "m3-sys-dark-primary": "#d0bcff",
        "m3-sys-dark-on-primary": "#381e72",
        blueviolet: "#9747ff",
        "schemes-secondary": "#625b71",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "horizontal-slide": {
          "0%": { transform: "translateX(-40%)" },
          "100%": { transform: "translateX(0)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "horizontal-slide": "horizontal-slide 2s linear infinite",
      },
      fontFamily: {
        poppins: "Poppins",
        inter: "Inter",
        aladin: "Aladin",
        capriola: "Capriola",
        roboto: "Roboto",
        outfit: "Outfit",
        "readex-pro": "'Readex Pro'",
      },
      boxShadow: {
        "open-inscription":
          "0rem 0.25rem 6.25rem 0rem rgba(226, 184, 233, 0.2)",
        "custom-green": "0px 4px 100px 0px rgba(69, 161, 190, 0.2)",
        "custom-purple": "0px 4px 100px 0px rgba(226, 184, 233, 0.2)",
      },
      backgroundImage: {
        "profile-gradient":
          "linear-gradient(180deg, rgba(69,161,190,0.5) 0%, rgba(232,198,237,1) 100%)",
        "explore-button-gradient":
          "linear-gradient(to right, rgba(226, 184, 233, 0.5) 0%, rgba(69, 161, 190, 0.4) 20%,rgba(226, 184, 233, 0.4) 80%)",
        "open-inscription-gradient":
          "linear-gradient(180deg, rgba(232, 198, 237,0.5) 1%, rgba(218,236,242,1) 46%)",
        "course-hero-gradient":
          "linear-gradient(180.00deg, rgb(232, 198, 237),rgba(69, 161, 190, 0.3) 100%)",
        "home-certif-green-purple-gradient":
          "linear-gradient(180.00deg, rgba(69, 161, 190, 0.2) 0%,rgba(232, 198, 237, 0.8) 100%)",
        "mentor-green-gradient":
          "linear-gradient(180.00deg, rgba(69, 161, 190, 0.8),rgba(69, 161, 190, 0) 100%)",
        "course-import-gradient":
          "linear-gradient(180deg, rgba(69, 161, 190, 0.8),rgba(226, 184, 233, 0.8) 100%)",
        "sidebar-gradient":
          "linear-gradient(to bottom, rgba(69, 161, 190, 0.1) 20%, rgba(226, 184, 233, 0.1) 50%)",
        "mobile-sidebar-gradient":
          "linear-gradient(to bottom, rgba(69, 161, 190, 0.1) 45%, rgba(226, 184, 233, 0.1) 50%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;

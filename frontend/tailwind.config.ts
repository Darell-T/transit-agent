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
        // MTA Subway Line Colors
        mta: {
          // A/C/E - Blue
          ace: "#2850AD",
          // B/D/F/M - Orange
          bdfm: "#FF6319",
          // G - Light Green
          g: "#6CBE45",
          // J/Z - Brown
          jz: "#996633",
          // L - Gray
          l: "#A7A9AC",
          // N/Q/R/W - Yellow
          nqrw: "#FCCC0A",
          // 1/2/3 - Red
          "123": "#EE352E",
          // 4/5/6 - Green
          "456": "#00933C",
          // 7 - Purple
          "7": "#B933AD",
          // S - Dark Gray
          s: "#808183",
        },
        // App Theme Colors
        background: "#0a0a0a",
        surface: "#1a1a1a",
        "surface-light": "#2a2a2a",
        primary: "#ffffff",
        secondary: "#a1a1a1",
        accent: "#2850AD",
        success: "#22c55e",
        warning: "#eab308",
        danger: "#ef4444",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

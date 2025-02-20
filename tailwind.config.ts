import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        //Sage
        lamaSky: "#7EB979",
        lamaSkyLight: "#97C39A",
        //Pink-coral
        lamaPurple: "#E3A1A5",
        lamaPurpleLight: " #ED96BB",
        //blue
        lamaYellow: "#7DC1F2",
        lamaYellowLight: "#A9D4F5",
      }
    },
  },
  plugins: [],
};
export default config;

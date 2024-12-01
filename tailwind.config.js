/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainColor: {
          1: "var(--color)",
          2: "var(--color-hover)",
        },
      },
    },
  },
  plugins: [],
};

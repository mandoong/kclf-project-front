/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        pc: "1024px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};

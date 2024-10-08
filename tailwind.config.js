/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "dev-gradient": "linear-gradient(to right, #1E3A8A, #06B6D4)",
      },
    },
  },
  plugins: [],
};

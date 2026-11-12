
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-jakarta)", "sans-serif"],
      },
      colors: {
        ink: "#211b2e",
        lilac: "#7353f6",
        canvas: "#faf8f4",
      },
      boxShadow: {
        soft: "0 18px 45px rgba(33,27,46,.08)",
      },
    },
  },
  plugins: [],
};



/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FAF7F2",
        champagne: "#C8A96E",
        "champagne-light": "#E8D5A0",
        "champagne-dark": "#9A7A40",
        "sky-pearl": "#D4E8F5",
        "midnight": "#0A0F1E",
        "navy": "#0D1B3E",
        "burgundy": "#7A1430",
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        script: ["'Dancing Script'", "cursive"],
        body: ["'Cormorant Garamond'", "serif"],
        sans: ["'DM Sans'", "sans-serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-gold": "pulse-gold 2s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "spin-slow": "spin 8s linear infinite",
        "ping-slow": "ping 2s cubic-bezier(0,0,0.2,1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-gold": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
    },
  },
  plugins: [],
};

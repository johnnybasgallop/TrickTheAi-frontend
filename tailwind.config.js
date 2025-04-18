// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"],
  theme: {
    extend: {
      keyframes: {
        shake: {
          "10%, 90%": { transform: "translateX(-1px)" },
          "20%, 80%": { transform: "translateX(2px)" },
          "30%, 50%, 70%": { transform: "translateX(-4px)" },
          "40%, 60%": { transform: "translateX(4px)" },
        },
      },
      animation: {
        shake: "shake 0.5s ease-in-out",
      },
    },
  },
};

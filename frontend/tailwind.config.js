import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui
  ],
  daisyui: {
    themes: [{
      mytheme: {
        "primary": "#4ADE80",      // green-400
        "secondary": "#818CF8",    // indigo-400
        "accent": "#F472B6",       // pink-400
        "neutral": "#1E293B",      // slate-800
        "base-100": "#FFFFFF",     // white
        "info": "#38BDF8",         // sky-400
        "success": "#22C55E",      // green-500
        "warning": "#FBBF24",      // amber-400
        "error": "#EF4444",        // red-500
      },
    }, "retro", "coffee"],
  },
}
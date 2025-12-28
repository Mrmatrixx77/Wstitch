/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
colors: {
// Wstitch brand palette
'brand-gold': '#BFA43A', // primary gold
'brand-dark': '#0F1724', // deep navy for contrast
'brand-sand': '#F7F3EA', // light background accent
'brand-accent': '#D9B450' // secondary warm accent
},
fontFamily: {
sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system','"Segoe UI"','Roboto'],
}


    },
  },
}


import daisyui from 'daisyui';
import flowbite from 'flowbite/plugin'; // Import the flowbite plugin

/** @type {import('tailwindcss').Config} */
export default {
  content: [    './src/**/*.{js,jsx,ts,tsx}',],
  theme: {
    extend: {},
  },
  plugins: [
   daisyui,        flowbite
  ],
}


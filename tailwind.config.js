/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ['Lato', 'sans'],
        latobold: ['LatoBold', 'sans'],
        geist: ['Geist','sans'],
        hostgrotesk: ['HostGrotesk','sans'],
      },
      colors: {
        'primary': '#5B9BD5',
        'second': '#87CEEB',
        'third': '#D6EAF8',
        'four': '#F0F7FB',
        'five': '#AED6F1',
        'six': '#5DADE2',
      },
      keyframes: {
        wrapper: {
          '0%' : { opacity: '0' },
          '49.99%' : { opacity: '0.3' },
          '50%' : { opacity: '0.7' },
          '100%' : { opacity: '1' },
        },
      },
      animation: {
        wrapper: 'wrapper 1s ease-in-out',
      },
      gridTemplateColumns: {
        customized: 'repeat(auto-fill , minmax(280px,295px))',
        customizedAudience: 'repeat(auto-fill , minmax(310px,320px))',
      },
    },
    clipPath: {
      mypolygon: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)",
    },
  },
  plugins: [
    require('tailwind-clip-path'),
  ],
}
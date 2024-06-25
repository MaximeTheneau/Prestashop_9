/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.{html,js}',
    '../templates/*.tpl',
    './modules/**/*.tpl',
    './css/**/*.scss',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f5f6ec',
        'primary-opacity': 'rgba(205, 184, 127, 0.49)',
        'primary-gradient': 'radial-gradient(circle at 32% 12%, rgba(229, 229, 229,0.05) 0%, rgba(229, 229, 229,0.05) 50%,rgba(101, 101, 101,0.05) 50%, rgba(101, 101, 101,0.05) 100%),radial-gradient(circle at 49% 59%, rgba(113, 113, 113,0.05) 0%, rgba(113, 113, 113,0.05) 50%,rgba(240, 240, 240,0.05) 50%, rgba(240, 240, 240,0.05) 100%),radial-gradient(circle at 16% 86%, rgba(118, 118, 118,0.05) 0%, rgba(118, 118, 118,0.05) 50%,rgba(207, 207, 207,0.05) 50%, rgba(207, 207, 207,0.05) 100%),linear-gradient(252deg, rgba(248,133,4, 0.31),rgba(170,143,67, 0.85))',
        secondary: '#725f49',
        krea: '#d4dce7',
        white: '#fff',
        'white-opacity': 'rgba(255, 255, 255, 0.87)',
        blue: '#2B52B5',
        grey: 'rgb(126, 126, 126)',
        error: '#e22121',
        confirmation: '#21e2a1',
        glass: 'rgba(255,255,255,0.1)',
        'link-opacity': '#c6d5f363',
        link: '#0051AD',
        'font-color': '#0b0c0e',
        'font-color-opacity': '#ffffff73',
        'font-color-light': '#666769',
      },
      fontFamily: {
        primary: 'var(--font-principal)',
        secondary: 'var(--font-title)',
      },
      fontSize: {
        base: '1rem',
        lg: '1.25rem', // Example of custom font size
      },
      borderRadius: {
        sm: '0.2rem',
        md: '0.5rem',
      },
      boxShadow: {
        custom: '0 10px 20px rgba(160, 160, 160, 0.459)',
      },
      extend: {
        width: {
          general: '90%',
          'general-720': '84%',
          responsive: '98%',
          desktop: '94%',
        },
        padding: {
          card: '0.2rem',
        },
        textShadow: {
          white: '-1px 0 #0b0c0e, 0 1px #0b0c0e, 1px 0 #0b0c0e, 0 -1px #0b0c0e',
          black: '-1px 0 rgba(255, 255, 255, 0.87), 0 1px rgba(255, 255, 255, 0.87), 1px 0 rgba(255, 255, 255, 0.87), 0 -1px rgba(255, 255, 255, 0.87)',
        },
        backgroundImage: {
          'primary-gradient': 'radial-gradient(circle at 32% 12%, rgba(229, 229, 229,0.05) 0%, rgba(229, 229, 229,0.05) 50%,rgba(101, 101, 101,0.05) 50%, rgba(101, 101, 101,0.05) 100%),radial-gradient(circle at 49% 59%, rgba(113, 113, 113,0.05) 0%, rgba(113, 113, 113,0.05) 50%,rgba(240, 240, 240,0.05) 50%, rgba(240, 240, 240,0.05) 100%),radial-gradient(circle at 16% 86%, rgba(118, 118, 118,0.05) 0%, rgba(118, 118, 118,0.05) 50%,rgba(207, 207, 207,0.05) 50%, rgba(207, 207, 207,0.05) 100%),linear-gradient(252deg, rgba(248,133,4, 0.31),rgba(170,143,67, 0.85))',
        },
      },
    },
  },
  plugins: [],
};

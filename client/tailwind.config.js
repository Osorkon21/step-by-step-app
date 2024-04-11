/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}", // Adjust the path as necessary
],
  theme: {
    extend: {
      boxShadow: {
        'custom': 'rgba(0, 0, 0, 0.3) 0px 1px 5px 0px inset',
        'custom2': 'rgba(17, 17, 26, 0.1) 0px 4px 16px 0px inset, rgba(17, 17, 26, 0.05) 0px 8px 32px 0px',
      },
      colors: {
        textdark: '#5A5A5A',
        textlight: 'ffffff',
        sunshineyellow: '#FFD700',
        sunshineyellow2: '#FFFD37',
        skyblue: '#87CEEB',
        coralpink: '#F88379',
        mintgreen: '#98FF98',
        lavenderpurple: '#E6E6FA',



        lightest: '#eef5f9',
        lightestblur: '#eef5f982',
        light: '#d1eefb',
        lightblur: '#d1eefb4b',
        middle: '#bcdbe5', // light blue
        middleblur: '#dff5fd', // middle blue
        middledark: '#76d0e3',
        middledarkblur: '#76919c',
        dark: '#32c4e3',
        darkblur: '#32c2e37b',
        darker: 'teal',
        darkerblur: 'rgba(0, 128, 128, 0.055)',
        lightestgray: '#f5f5f5',
        lightgray: '#f9f9f9',
        gray: '#dcdcdc',
        orange: '#ed9f12',

        
        purple: '#162e3d',  // dark blue currently
        lightpurple: '#76919c', // light blue currently
      
      
      }
    },
  },
  plugins: [
    require('tailwindcss-react-aria-components')
  ],
}


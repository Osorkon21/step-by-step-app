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
        lightest: '#eef5f9',
        lightestblur: '#eef5f982',
        light: '#d1eefb',
        lightblur: '#d1eefb4b',
        middle: '#bcdbe5', // light blue
        middleblur: '#76919c', // middle blue
        middledark: '#76d0e3',
        middledarkblur: '#76919c',
        dark: '#32c4e3',
        darkblur: '#32c2e37b',
        darker: 'teal',
        darkerblur: 'rgba(0, 128, 128, 0.055)',
        
        purple: '#162e3d',  // dark blue currently
        lightpurple: '#76919c', // light blue currently
      
        mutedlight: '#eaeaea',
        mutedgray: '#dddddd',
        mutedpink: '#ecd9d9',
        mutedblue: '#d5e1ea',
        mutedgreen: '#e8f0d1',
      
        waterlight:'#eef5f9',
        waterpale: '#d1eefb',
        watermedium: '#bbeafb',
        wateraqua: '#76d0e3',
        waterteal: '#32c4e3',
        
        dreamslightest:'#ddfbff',
        dreamslightaqua: '#c7ebf0',
        dreamsgray: '#bfd5e2',
        dreamspurple: '#b1b5c8',
        dreamsmauve: '#b2abbf',
      
      }
    },
  },
  plugins: [
    require('tailwindcss-react-aria-components')
  ],
}


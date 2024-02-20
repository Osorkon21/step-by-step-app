/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}", // Adjust the path as necessary
],
  theme: {
    extend: {
      colors: {
        lightest: '#eef5f9',
        lightestblur: '#eef5f982',
        light: '#d1eefb',
        lightblur: '#d1eefb4b',
        middle: '#bbeafb',
        middleblur: '#bbeafb78',
        middledark: '#76d0e3',
        middledarkblur: '#76d1e37a',
        dark: '#32c4e3',
        darkblur: '#32c2e37b',
        darker: 'teal',
        darkerblur: 'rgba(0, 128, 128, 0.055)',
        
        purple: '#ad90c1',
        lightpurple: '#c7b7cf',
      
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


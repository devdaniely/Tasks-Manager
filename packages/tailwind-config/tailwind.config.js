/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/**/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff4e9',
          100: '#FBEBDB',
          200: '#FED2A7',
          300: '#F1B77E',
          400: '#EA933D',
          500: '#E57614',
          DEFAULT: '#E57614',
          600: '#D56400',
          700: '#BA5700',
          800: '#9E4A00',
          900: '#500000',
        },
        gray: {
          50: '#FCFDFF',
          75: '#F9F9FC',
          100: '#F3F5F9',
          150: '#EAEDF1',
          200: '#E4E7EB',
          300: '#CBD2D9',
          400: '#9AA5B1',
          500: '#7B8794',
          600: '#616E7C',
          700: '#3E4C59',
          800: '#323F4B',
          900: '#1F2933',
          hover: 'rgba(252, 253, 255, 0.5)',
          pspdf: '#f6f8fa',
        },
      },
      shadow: {
        glow: '0 0 15px 2px rgba(255, 165, 0, 0.5)',
      },
      boxShadow: {
        '3xl': '0 0 40px 0 rgba(0, 0, 0, 0.3)',
        even: 'rgba(0, 0, 0, 0.12) 0px 4px 15px',
        evenHover: 'rgba(0, 0, 0, 0.14) 0px 6px 24px',
        insetGlow: 'inset 0px 0px 5px 0px rgba(var(--pirros-black-rgb), 0.3)',
      },
      gridTemplateColumns: {
        'auto-fill-270': 'repeat(auto-fill, minmax(270px, 1fr))',
        'auto-fill-336': 'repeat(auto-fill, minmax(336px, 1fr))',
      },
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      function extractColorVars(colorObj, colorGroup = '') {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey];
          const newVars =
            typeof value === 'string'
              ? { [`--color${colorGroup}-${colorKey}`]: value }
              : extractColorVars(value, `-${colorKey}`);
          return { ...vars, ...newVars };
        }, {});
      }
      addBase({
        ':root': extractColorVars(theme('colors')),
      });
    },
  ],
  important: true,
};

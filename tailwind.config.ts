import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': "url('/public/bananas.jpg')",
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },

    variants: {
      backgroundColor: ['responsive', 'hover', 'focus', 'active'],
    },

    colors: {
      lightGreen: '#2eff74',
      mainGreen: '#2DE86B',
      darkGreen: '#15AD44',
      darkBlack: '#292828',
      mainBlack: '#353535',
      mainWhite: '#FFFFFF',
    },

    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },

    corePlugins: {
      preflight: false,
    },
  },
  plugins: [],
};
export default config;

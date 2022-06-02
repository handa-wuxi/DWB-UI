import { defineConfig } from 'vite-plugin-windicss';
import colors from 'windicss/colors';

export default defineConfig({
  darkMode: 'media',
  safelist: [
  ],
  attributify: {
    prefix: 'w:',
  },
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    colors: {
      gray: colors.coolGray,
      blue: colors.sky,
      red: colors.rose,
      pink: colors.fuchsia,
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    spacing: {
      128: '32rem',
      144: '36rem',
    },
    borderRadius: {
      '4xl': '2rem',
    },
  },
  extract: {
    // accepts globs and file paths relative to project root
    include: [
      'index.html',
      'src/**/*.{vue,html,jsx,tsx}',
    ],
    exclude: [
      'node_modules/**/*',
      '.git/**/*',
    ],
  },
});

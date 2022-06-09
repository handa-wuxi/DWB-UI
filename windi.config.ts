import { defineConfig } from 'vite-plugin-windicss';

export default defineConfig({
  darkMode: 'class',
  safelist: [
  ],
  attributify: {
    prefix: 'w:',
  },
  shortcuts: {
    'header-item': 'w-50px h-50px py-12px px-8px hover:bg-light-200 dark:hover:bg-dark-100',
  },
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
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

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import seoFiles from 'vite-plugin-seo-files';

export default defineConfig({
  plugins: [
    react(),
    seoFiles({
      siteUrl: 'https://smart-shadow.ru',
      generateSitemap: true,
      generateRobots: true,
    }),
  ],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) {
              return 'vendor-three';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-motion';
            }
            if (id.includes('react-dom') || id.includes('/react/')) {
              return 'vendor-react';
            }
          }
        },
      },
    },
  },
});
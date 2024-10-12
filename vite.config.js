import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';

export default defineConfig({
  server: {
    proxy: {
      '/api' : "http://gite-rihanna.great-site.net/"
    }
  },
  plugins: [
    react(),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240,
    }),
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    // تكوين Babel هنا إذا كنت تستخدم
    babel: {
      presets: ['@babel/preset-env']
    }
  },
});

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';
import {viteCommonjs} from '@originjs/vite-plugin-commonjs';

export default defineConfig({
  plugins: [vue(), viteCommonjs()],
  base: './',
  server: {
    port: 8080, // Match your previous dev server
    open: true,
  },
  build: {
    rollupOptions: {
      input: {
        index: 'src/pages/home/main.js', // Ensure this path is correct
        app: 'src/pages/app/main.js',
      },
    },
  },
});

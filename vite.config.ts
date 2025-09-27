import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  mode: 'development',
  build: {
    rollupOptions: {
      input: 'index.html',
      output: {preserveModules: false},
    },
  },
  plugins: [
    solid(),
  ],
});
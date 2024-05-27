// import { defineConfig } from "vite";

// export default defineConfig({
//   base: "./",
//   build: {
//     minify: false,
//   },
// });

import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  publicDir: 'public',
  root: './',
  build: {
    outDir: 'dist',
  },
  plugins: [
    eslint({
      cache: false,
      fix: true,
    }),
  ],
});

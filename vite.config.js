import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: './validate.js',
      name: 'LDAC-RoCrate-Profile',
      fileName: (format) => `LDAC-RoCrate-Profile.${format}.js`,
    },
  },
});

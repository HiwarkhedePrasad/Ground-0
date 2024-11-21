import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: './src', // Your source code directory
  build: {
    outDir: '../dist', // The output directory for the build
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      preserveEntrySignatures: 'strict'
    }
  },
  server: {
    // Ensures React Router works on refresh by serving index.html for unknown paths
    historyApiFallback: true
  }
});
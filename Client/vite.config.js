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
  optimizeDeps: {
    include: ['react-router-dom'],
    exclude: ['react-router'] // 👈 this prevents Vite from trying to bundle react-router directly
  }
});

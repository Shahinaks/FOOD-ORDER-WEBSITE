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
    // Enables fallback to index.html for client-side React Router routes
    historyApiFallback: true
  },
  resolve: {
    alias: {
      '@': '/src' // Optional: enables '@/components/Navbar' style imports
    }
  }
});
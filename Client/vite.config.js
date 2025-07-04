export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      preserveEntrySignatures: 'strict'
    }
  }
})
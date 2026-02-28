import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        // Split React into its own chunk — returning visitors get it from cache
        // even when app code changes
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
})

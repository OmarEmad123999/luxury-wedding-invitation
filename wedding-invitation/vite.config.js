import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  optimizeDeps: {
    include: ['gsap', 'framer-motion'],
  },

  build: {
    chunkSizeWarningLimit: 1800,
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ['framer-motion'],
          gsap:   ['gsap'],
        },
      },
    },
  },
})

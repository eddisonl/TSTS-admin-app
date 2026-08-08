import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'coreui': ['@coreui/react', '@coreui/coreui'],
          'react-router': ['react-router-dom'],
          'react-toastify': ['react-toastify'],
          'recharts': ['recharts'],
        }
      }
    }
  }
})

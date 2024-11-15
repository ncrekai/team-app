import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    manifest: true,
    rollupOptions: {
      input: './src/Main.jsx'
    }
  },
  server: {
    origin: 'http://localhost:5173',
    proxy: {
      '/api': {
<<<<<<< HEAD
        target: 'http://localhost:5000',
=======
        target: 'http://localhost:4000',
>>>>>>> 354f47d (Home, Nav, App modified)
        changeOrigin: true,
      },
    },
  }
})
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

  }
  // server: {
  //   origin: 'http://localhost:3000',
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:4000',
  //       changeOrigin: true,
  //     },
  //   },
  // }
})
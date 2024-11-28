import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@mui/material': path.resolve(__dirname, './node_modules/@mui/material'),
      '@mui/icons-material': path.resolve(__dirname, './node_modules/@mui/icons-material'),
    },
  },
  optimizeDeps: {
    include: ['@mui/material', '@mui/icons-material', 'react-router-dom'],
  },
  build: {
    manifest: true,
    rollupOptions: {
      input: './src/Main.jsx', 
    },
  },
});
  // server: {
  //   origin: 'http://localhost:3000',
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:4000',
  //       changeOrigin: true,
  //     },
  //   },
  // }

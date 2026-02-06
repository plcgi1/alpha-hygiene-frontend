import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
    allowedHosts: [
      'trickiest-anjelica-fustier.ngrok-free.dev',
      'localhost:5173',
      '0.0.0.0:5173',
      '127.0.0.1:5173',
      'trickiest-anjelica-fustier.ngrok-free.app',
    ]
  },
})

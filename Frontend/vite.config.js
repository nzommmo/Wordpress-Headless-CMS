import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    allowedHosts : ["4bc3-196-207-172-37.ngrok-free.app"],
    proxy: {
      '/api':{
        target: 'http://localhost/Wordpress-Headless-CMS',
        changeOrigin: true,
        rewrite: Path => Path.replace(/^\/api/, ''),
      }
    }
  }
})

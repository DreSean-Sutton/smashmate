import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(process.env.CLIENT_PORT),
    proxy: {
      '/api': process.env.SERVER_PORT
    }
  }
})

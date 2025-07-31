import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    global: 'globalThis', // penting untuk hindari override global
  },
  resolve: {
    alias: {
      crypto: 'node:crypto' // pastikan pake bawaan Node
    }
  }
})

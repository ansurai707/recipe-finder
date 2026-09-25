import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite config - keeps things simple, no extra setup needed
export default defineConfig({
  plugins: [react()]
})

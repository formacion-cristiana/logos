import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { SITE_BASE } from "./config/siteConfig.js";

export default defineConfig({
  base: SITE_BASE,
  build: {
  target: "safari15",
},
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
    },
  },
})
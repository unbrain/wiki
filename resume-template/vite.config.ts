import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  base: './',
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, './src')
    }
  },
  server: {
    port: 8124,
    host: true
  },
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096
  }
})

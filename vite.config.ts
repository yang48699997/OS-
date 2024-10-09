import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from "vite-plugin-electron";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'javaee-front'
  },
  plugins: [vue(),
      electron({
      entry: "./src/electron/main.ts",
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 8080,
    open: true
  }
})

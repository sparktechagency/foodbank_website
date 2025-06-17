import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "10.0.60.118",
    port: "3000",
  },
})
// 24.199.120.27 - live
// 172.0.1.108 local -Tayebur
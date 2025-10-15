import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const API_URL = process.env.VITE_API_URL || "http://10.20.30.177:8000";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  define: {
    'process.env.VITE_API_URL': JSON.stringify(API_URL)
  }
})

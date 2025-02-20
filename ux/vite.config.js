import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// Obtiene la IP local desde las variables de entorno o usa una IP por defecto
const API_URL = process.env.VITE_API_URL || "http://10.20.30.177:8000";

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify(API_URL),
  },
})


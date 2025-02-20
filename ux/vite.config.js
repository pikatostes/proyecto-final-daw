import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// Obtiene la IP local desde las variables de entorno o usa una IP por defecto
const API_URL = process.env.VITE_API_URL || "http://10.20.30.177:8000";

export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify(API_URL),
  },
=======
  server: {
    host: '0.0.0.0',
    port: 5173
  }
>>>>>>> 8829acdc65f948c75a6fbfd5366b86948bb9b779
})


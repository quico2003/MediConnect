import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '192.168.1.147', // Usa la misma IP que el backend
    port: 3000,
    open: true
  },
  build: {
    sourcemap: false,
    
  },
});

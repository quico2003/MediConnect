import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '9.223.1.159', // Esto solo aplica en modo desarrollo
    port: 3000,
    open: true
  },
  build: {
    sourcemap: false,
  },
});

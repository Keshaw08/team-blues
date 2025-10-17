import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 6250,
    proxy: {
      "/api": {
        target: "http://localhost:5200",
        changeOrigin: true,
      },
      "/events": {
        target: "http://localhost:5200",
        changeOrigin: true,
      },
    },
  },
});

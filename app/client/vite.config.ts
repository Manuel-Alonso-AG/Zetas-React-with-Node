import { defineConfig, loadEnv, type ConfigEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default ({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd(), "");

  return defineConfig({
    plugins: [react()],
    /* Alias me permite acceder a los archivos sin importaciones relativas */
    resolve: {
      alias: { "@": path.resolve(__dirname, "./src") },
    },
    server: {
      port: Number(env.VITE_PORT) || 5173,
      // necesaria para realizar fetch al backend
      proxy: {
        "/api": {
          target: env.VITE_API_URL || "http://localhost:3000",
          changeOrigin: true,
        },
      },
    },
  });
};
/*
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  /* Alias me permite acceder a los archivos sin importaciones relativas 
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  server: {
    port: 5173,
    // necesaria para realizar fetch al backend
    proxy: {
      "/api": {
        target: import.meta.env.VITE_API_URL,
        changeOrigin: true,
      },
    },
  },
});
*/

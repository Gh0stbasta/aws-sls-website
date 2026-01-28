import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Base path for deployment (can be adjusted for CloudFront)
  base: "/",

  // Build optimization
  build: {
    outDir: "dist",
    sourcemap: true,
    // Enable tree-shaking
    minify: "esbuild",
    target: "es2020",
    // Chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
        },
      },
    },
  },

  // Path aliases (optional, for cleaner imports)
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // Dev server configuration
  server: {
    port: 5173,
    host: true,
    // HMR configuration
    hmr: {
      overlay: true,
    },
  },

  // Preview server configuration
  preview: {
    port: 4173,
    host: true,
  },
});

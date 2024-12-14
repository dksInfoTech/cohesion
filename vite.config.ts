import { defineConfig } from "vite";

import react from "@vitejs/plugin-react-swc";
import svgr from "@svgr/rollup";

import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    react(),
    svgr(),
    nodePolyfills({
      protocolImports: true,
    }),
  ],
  preview: {
    port: 80,
    //port: 8080,
    strictPort: true,
  },
  server: {
    port: 80,
    //port: 8080,
    strictPort: true,
    host: true,
    //origin: "https://demo.argirotest.com.au",
    origin: "http://localhost:80",
  },
  build: {
    chunkSizeWarningLimit: 6000,
    rollupOptions: {
      // Suppressing the "EVAL" warning caused by an issue with @react-jvectormap & rollup
      // We'll address this once a proper fix is available
      onwarn(warning, warn) {
        if (warning.code === "EVAL") return;
        warn(warning);
      },
    },
  },
});

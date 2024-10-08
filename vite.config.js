import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  optimizeDeps: {
    include: ['yup'],
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://apis.halfchoice.in',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    port: 4000,
    hmr: {
      overlay: false
    },
  },
});

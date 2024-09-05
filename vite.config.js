import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import inject from '@rollup/plugin-inject';
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    inject({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
  ],
  server: {
    port: 4000,
  },
});

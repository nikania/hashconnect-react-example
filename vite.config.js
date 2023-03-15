import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// need polyfill for build (buffer)
// ussue with polyfill https://github.com/remorses/esbuild-plugins/issues/24
// https://github.com/vitejs/vite/issues/7384
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: "globalThis",
  },
  base: "/hashconnect-react-example/",
});

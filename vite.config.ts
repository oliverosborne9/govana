import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
  plugins: [
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
    react(),
  ],
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
  },
});

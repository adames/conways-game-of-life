// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["vt7shf-5173.csb.app", "vt7shf-5174.csb.app"],
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// `base` lets the atlas live under a sub-path of a portfolio site,
// e.g. VITE_BASE=/projects/neuron-atlas/ npm run build
export default defineConfig({
  base: process.env.VITE_BASE ?? "./",
  plugins: [react()],
  worker: { format: "es" },
});

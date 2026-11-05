import { execSync } from "node:child_process";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function gitCommit() {
  try {
    return execSync("git rev-parse --short HEAD", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
  } catch {
    return "unknown";
  }
}

// `base` lets the atlas live under a sub-path of a portfolio site,
// e.g. VITE_BASE=/projects/neuron-atlas/ npm run build
export default defineConfig({
  base: process.env.VITE_BASE ?? "./",
  plugins: [react()],
  worker: { format: "es" },
  define: {
    __BUILD_COMMIT__: JSON.stringify(gitCommit()),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)),
  },
  build: {
    rolldownOptions: {
      // three.js in its own chunk, so the 3D map's code stays cached across releases
      output: { codeSplitting: { groups: [{ name: "three", test: /[\\/]node_modules[\\/]three[\\/]/ }] } },
    },
  },
});

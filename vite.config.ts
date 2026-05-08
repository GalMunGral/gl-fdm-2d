import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  base: "/gl-fdm-2d/",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});
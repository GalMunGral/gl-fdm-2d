import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  base: "/fdm-2d/",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});
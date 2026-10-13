import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const tailwindPlugins = tailwindcss() as any[];

export default defineConfig({
  plugins: [react(), ...tailwindPlugins],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test-setup.ts",
  },
});
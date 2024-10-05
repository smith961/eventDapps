import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
 
export default defineConfig({
    // Add .JPG to the assetsInclude array
  assetsInclude: ['**/*.JPG', '**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.svg'],
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
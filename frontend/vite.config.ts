import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Vite config: two plugins.
// - react(): lets Vite understand JSX and enables fast refresh while you code.
// - tailwindcss(): scans your files for Tailwind classes and generates only the CSS you use.
export default defineConfig({
  plugins: [react(), tailwindcss()],
});

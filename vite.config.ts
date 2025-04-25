import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/Suffolk_CSMA/",
  plugins: [tailwindcss(), reactRouter()],
});

import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
    permissions: ["storage"],
    options_page: "entrypoints/options/index.html",
  },
  vite: () => ({
    build: {
      target: "esnext",
    },
    esbuild: {
      supported: {
        "top-level-await": true,
      },
    },
  }),
});

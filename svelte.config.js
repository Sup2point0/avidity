import adapter from "@sveltejs/adapter-static";
import { sveltePreprocess } from "svelte-preprocess";

import { mdsvex } from "mdsvex";


const config = {
  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: "404.html",
      precompress: false,
      strict: true,
    }),
    paths: {
      base: process.argv.includes("dev") ? "" : process.env.BASE_PATH
    },
    alias: {
      "#src": "./src/",
      "#parts": "./src/parts",
      "#styles": "./src/styles",
      "#scripts": "./src/scripts",
    },
    prerender: {
      handleHttpError: "warn",
    },
  },

  preprocess: [
    mdsvex({
      extensions: [".svelte", ".md", ".svx"],
    }),
    sveltePreprocess({
      scss: {
        prependData: `
          @use './src/styles/mixins/fonts' as *;
          @use './src/styles/mixins/ui' as *;
        `,
      }
    }),
  ],
  
  extensions: [".svelte", ".md", ".svx"],
};

export default config;

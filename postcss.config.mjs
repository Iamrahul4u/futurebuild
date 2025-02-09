/** @type {import('postcss-load-config').Config} */
import purgecss from "@fullhuman/postcss-purgecss";
import cssnano from "cssnano";

const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}, // Ensures better browser compatibility
    ...(process.env.NODE_ENV === "production"
      ? {
          [purgecss({
            content: [
              "./pages/**/*.tsx",
              "./components/**/*.tsx",
              "./app/**/*.tsx",
            ],
            defaultExtractor: (content) =>
              content.match(/[\w-/:]+(?<!:)/g) || [],
          })]: {},
        }
      : {}),
  },
};

export default config;

/** @type {import('postcss-load-config').Config} */
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import purgecss from "@fullhuman/postcss-purgecss";

const isProduction = process.env.NODE_ENV === "production";

const config = {
  plugins: [
    tailwindcss,
    autoprefixer,
    isProduction &&
      purgecss({
        content: [
          "./pages/**/*.tsx",
          "./components/**/*.tsx",
          "./app/**/*.tsx",
        ],
        defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
      }),
    isProduction && cssnano({ preset: "default" }),
  ].filter(Boolean), // Removes `false` values in dev mode
};

export default config;

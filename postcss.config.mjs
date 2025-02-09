/** @type {import('postcss-load-config').Config} */
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";

const isProduction = process.env.NODE_ENV === "production";

const config = {
  plugins: [
    tailwindcss,
    autoprefixer,
    isProduction && cssnano({ preset: "default" }), // Minifies CSS only in production
  ].filter(Boolean),
};

export default config;

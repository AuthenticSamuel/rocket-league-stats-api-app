import spirkopPrettierConfig from "@spirkop/prettier-config";

/**
 * @type {import("prettier").Config}
 */
const config = {
  ...spirkopPrettierConfig,
  plugins: [...spirkopPrettierConfig.plugins, "prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./src/styles/main.css",
};

export default config;

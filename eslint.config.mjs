import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    extends: [js.configs.recommended],
    languageOptions: {
      globals: globals.browser
    },
    rules: {
      indent: ["error", 2],
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "comma-dangle": ["error", "never"],
      "no-multiple-empty-lines": ["error", { max: 1 }],
      "space-in-parens": ["error", "never"],
      "object-curly-spacing": ["error", "always"],
      "keyword-spacing": ["error", { before: true, after: true }]
    }
  },

  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" }
  }
]);

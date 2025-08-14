import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      js: js,
      react: pluginReact
    },
    settings: {
      react: {
        version: "detect" // 👈 Esto quita el warning
      }
    },
    rules: {
      "react/prop-types": "warn", // Avisar si falta propTypes
      "react/react-in-jsx-scope": "off", // No necesario en React 17+
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-console": "off"
    }
  },
  pluginReact.configs.flat.recommended
]);

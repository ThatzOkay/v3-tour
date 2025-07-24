import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";

// Clean up global keys to avoid whitespace errors
const cleanGlobals = {};
for (const [key, value] of Object.entries(globals.browser)) {
  cleanGlobals[key.trim()] = value;
}

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
  },
  {
    languageOptions: {
      globals: cleanGlobals,
      ecmaVersion: 2020,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  {
    ignores: ["dist/", "demo", "demo/dist", "jest.config.js", "public", "tests/unit"],
  },
  {
    rules: {
      "vue/multi-word-component-names": "off",
    },
  },
];

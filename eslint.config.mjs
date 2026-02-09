// NOTE - [REF-02] Linting & Husky
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  // Use standard recommended rules for general JavaScript
  eslint.configs.recommended,

  // Use recommended rules for TypeScript specific code
  ...tseslint.configs.recommended,

  {
    // Apply these rules only to TypeScript files
    files: ["**/*.ts"],
    rules: {
      // Show a warning if 'any' type is used (better to use specific types)
      "@typescript-eslint/no-explicit-any": "warn",

      // Show an error if a variable is created but not used
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          // Ignore variables or arguments starting with an underscore (e.g., _req)
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      // Allow using console.log/error without warnings
      "no-console": "off",
    },
  },

  {
    // Tell ESLint to skip these folders (don't check them)
    ignores: ["dist/", "node_modules/", "public/"],
  },
];

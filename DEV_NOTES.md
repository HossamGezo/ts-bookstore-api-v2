# 📓 Project Development Notes

## [REF-01] Live Reload Setup

LiveReload was not working initially due to three main reasons:

1. **Middleware Placement**: The `connect-livereload` must be placed at the very top, immediately after `const app = express()`.

```typescript
const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(connectLivereload());
}
```

2. **Helmet Security**: Helmet's CSP blocks the script injection. We disabled CSP in development mode to allow LiveReload to work.

```typescript
app.use(
  helmet({
    contentSecurityPolicy: process.env.NODE_ENV !== "development",
  }),
);
```

3. **File Extensions**: We manually added extensions (`ejs`, `css`, `js`, `png`, `jpg`) to the watch list so the server knows which file changes should trigger a browser refresh.

```typescript
const liveReloadServer = livereload.createServer({
  exts: ["ejs", "css", "js", "png", "jpg"],
});
liveReloadServer.watch([
  path.join(process.cwd(), "public"),
  path.join(process.cwd(), "views"),
]);
```
## [REF-02] Linting & Husky Setup

### 1. Installation
To avoid dependency conflicts between ESLint 10 and TypeScript plugins, use version 9:
```bash
npm install --save-dev eslint@^9.19.0 @eslint/js@^9.19.0 typescript-eslint husky
```

### 2. ESLint Configuration (`eslint.config.mjs`)
The file uses the `.mjs` extension because the project is configured as an ES Module (`"type": "module"`). It defines rules for code analysis:
```javascript
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  // Standard JS recommended rules
  eslint.configs.recommended,
  // TypeScript specific recommended rules
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          // Ignore variables/args starting with underscore (e.g., _req)
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "no-console": "off",
    },
  },
  {
    // Folders to be ignored by the linter
    ignores: ["dist/", "node_modules/", "public/"],
  },
];
```

### 3. Scripts Setup (`package.json`)
Added scripts to handle linting and type checking without generating build files:
```json
"scripts": {
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
  "check-types": "tsc --noEmit",
  "prepare": "husky"
}
```
*Note: `--noEmit` ensures TypeScript checks for errors without creating `.js` files in the source directory.*

### 4. Husky Initialization
Initialize the Husky "gatekeeper" to manage Git hooks:
```bash
npx husky init
```

### 5. Pre-commit Hook Configuration
Modify the `.husky/pre-commit` file to enforce quality checks before every commit:
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Run formatting, linting, and type-checking
npm run format && npm run lint && npm run check-types
```
*If any of these commands fail, the commit is blocked until the code is fixed.*

# 📓 Project Development Notes

## [REF-01] Live Reload Setup

LiveReload was not working initially due to four main reasons:

1. **CommonJS inside ESM**: Since the project uses ES Modules (`"type": "module"`), we cannot use `require` directly. However, some libraries like `livereload` work better with CommonJS or need to be loaded conditionally. We used `createRequire` to bridge this gap.

```typescript
import { createRequire } from "module";
const require = createRequire(import.meta.url);
```

2. **Conditional Importing (Production Crash)**: Importing `livereload` at the top level caused the Docker container to crash in production because `livereload` is a `devDependency` and is not installed in the production image. We moved the `require` calls inside the development check.

```typescript
if (process.env.NODE_ENV === "development") {
  const livereload = require("livereload");
  const connectLivereload = require("connect-livereload");
  // ... rest of the setup
}
```

3. **Middleware Placement**: The `connect-livereload` middleware must be placed at the very top of the middleware stack, immediately after initializing the `express` app, to ensure it can inject the script into the HTML responses.

```typescript
const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(connectLivereload());
}
```

4. **Helmet Security & File Extensions**: Helmet's default Content Security Policy (CSP) blocks the injected script. We disabled CSP in development. Also, we manually added extensions (`ejs`, `css`, `js`, `png`, `jpg`) to the watch list.

```typescript
app.use(
  helmet({
    contentSecurityPolicy: process.env.NODE_ENV !== "development",
  }),
);

const liveReloadServer = livereload.createServer({
  exts: ["ejs", "css", "js", "png", "jpg"],
});
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
          // Ignore variables/args starting with an underscore (e.g., _req)
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

_Note: `--noEmit` ensures TypeScript checks for errors without creating `.js` files in the source directory._

### 4. Husky Initialization

Initialize the Husky "gatekeeper" to manage Git hooks:

```bash
npx husky init
```

### 5. Pre-commit Hook Configuration

Modify the `.husky/pre-commit` file to enforce quality checks before every commit:

```bash
# Run formatting, linting, and type-checking
npm run format && npm run lint && npm run check-types
```

_If any of these commands fail, the commit is blocked until the code is fixed._

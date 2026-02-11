// --- Libraries
import type {Application} from "express";
import path from "path";
// --- Enable CommonJS imports inside ESM
import {createRequire} from "module";

const require = createRequire(import.meta.url);

/**
 * // NOTE - [REF-01] Live Reload Configuration
 * @desc Setup LiveReload for development environment
 */
export const setupLiveReload = (app: Application) => {
  if (process.env.NODE_ENV === "development") {
    // Use require (CommonJS) to avoid production dependency issues in ESM
    const livereload = require("livereload");
    const connectLivereload = require("connect-livereload");

    const liveReloadServer = livereload.createServer({
      exts: ["ejs", "css", "js", "png", "jpg"],
      debug: false, // Set to true only if you need to debug connection issues
    });

    // Watch directories for changes
    liveReloadServer.watch([
      path.join(process.cwd(), "public"),
      path.join(process.cwd(), "views"),
    ]);

    // Inject livereload script into the response
    app.use(connectLivereload());
  }
};

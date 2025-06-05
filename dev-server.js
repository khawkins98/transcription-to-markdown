#!/usr/bin/env node

/**
 * Development Server with Hot Reloading
 * Watches for file changes and auto-refreshes the browser
 */

const liveServer = require("live-server");
const path = require("path");

// Configuration
const params = {
  port: 8000,
  host: "0.0.0.0",
  root: path.resolve(__dirname, "public"), // Serve from public directory
  open: true,
  file: "index.html",
  wait: 500, // Wait before reload (ms)
  mount: [["/node_modules", "./node_modules"]],
  logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
  middleware: [
    function (req, res, next) {
      // Add CORS headers for development
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );
      next();
    },
  ],
};

console.log("🚀 Starting development server...");
console.log(`📍 Server will be available at: http://localhost:${params.port}`);
console.log(`📁 Serving files from: ${params.root}`);
console.log("👀 Watching for file changes in public/...");
console.log("🔄 Auto-refresh enabled");
console.log("\n💡 Press Ctrl+C to stop the server\n");

// Start the server
liveServer.start(params);

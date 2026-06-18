import { createServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { extname, resolve } from "node:path";

const PORT = parseInt(process.env.PORT || "3000", 10);
const CLIENT_DIR = new URL("./dist/client", import.meta.url).pathname;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".map": "application/json",
};

const ssrHandler = (await import("./dist/server/server.js")).default;

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);

    // Try to serve static files first
    if (url.pathname !== "/" && !url.pathname.startsWith("/__")) {
      const filePath = resolve(CLIENT_DIR + url.pathname.replace(/^\//, ""));
      if (filePath.startsWith(CLIENT_DIR) && existsSync(filePath)) {
        const ext = extname(filePath);
        const contentType = MIME_TYPES[ext] || "application/octet-stream";
        const content = readFileSync(filePath);
        res.writeHead(200, { "Content-Type": contentType, "Cache-Control": "public, max-age=31536000, immutable" });
        res.end(content);
        return;
      }
    }

    // SSR: build the request for the TanStack handler
    const protocol = "http";
    const request = new Request(`${protocol}://${req.headers.host}${req.url}`, {
      method: req.method,
      headers: req.headers,
      body: req.method !== "GET" && req.method !== "HEAD" ? req : undefined,
    });

    const response = await ssrHandler.fetch(request, {}, {});

    res.writeHead(response.status, Object.fromEntries(response.headers.entries()));
    if (response.body) {
      const reader = response.body.getReader();
      const pump = () => {
        reader.read().then(({ done, value }) => {
          if (done) { res.end(); return; }
          res.write(value);
          pump();
        }).catch((err) => { console.error(err); res.end(); });
      };
      pump();
    } else {
      res.end();
    }
  } catch (err) {
    console.error("Server error:", err);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
});

server.listen(PORT, () => {
  console.log(`France Gems Portal running on http://localhost:${PORT}`);
});

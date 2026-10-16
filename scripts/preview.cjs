const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const directory = path.resolve(__dirname, "../build");
if (!fs.existsSync(path.join(directory, "index.html"))) {
  console.error("Build the portfolio first with npm run build.");
  process.exit(1);
}
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".ttf": "font/ttf",
  ".map": "application/json",
};
const server = http.createServer((request, response) => {
  let pathname;
  try {
    pathname = decodeURIComponent(
      new URL(request.url, "http://localhost").pathname,
    );
  } catch {
    response.writeHead(400);
    response.end("Bad request");
    return;
  }
  if (pathname === "/gallery") {
    response.writeHead(301, { Location: "/about#photo-journal" });
    response.end();
    return;
  }
  const base = path.resolve(directory, `.${pathname}`);
  if (base !== directory && !base.startsWith(directory + path.sep)) {
    response.writeHead(403);
    response.end();
    return;
  }
  const candidates = [base, `${base}.html`, path.join(base, "index.html")];
  let file = candidates.find(
    (candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile(),
  );
  let status = 200;
  if (!file) {
    status = 404;
    file = path.join(directory, "404.html");
  }
  response.writeHead(status, {
    "Content-Type":
      types[path.extname(file).toLowerCase()] || "application/octet-stream",
    "Content-Length": fs.statSync(file).size,
    "X-Content-Type-Options": "nosniff",
  });
  if (request.method === "HEAD") response.end();
  else fs.createReadStream(file).pipe(response);
});
const port = Number(process.env.PORTFOLIO_PREVIEW_PORT || 4173);
server.listen(port, "127.0.0.1", () =>
  console.log(`Portfolio preview: http://127.0.0.1:${port}`),
);

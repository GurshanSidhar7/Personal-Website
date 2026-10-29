/* Use the existing Babel/React toolchain to emit readable static HTML per route.
   The browser hydrates that HTML; no new runtime or rendering framework is needed. */
const fs = require("node:fs");
const path = require("node:path");
const babel = require("@babel/core");
const root = path.resolve(__dirname, "..");
const sourceRoot = path.join(root, "src") + path.sep;
const originalJs = require.extensions[".js"];
function compile(module, filename) {
  if (!filename.startsWith(sourceRoot)) return originalJs(module, filename);
  const result = babel.transformFileSync(filename, {
    babelrc: false,
    configFile: false,
    presets: [
      [require.resolve("@babel/preset-env"), { targets: { node: "current" } }],
      [require.resolve("@babel/preset-react"), { runtime: "automatic" }],
    ],
  });
  module._compile(result.code, filename);
}
require.extensions[".js"] = compile;
require.extensions[".jsx"] = compile;
require.extensions[".css"] = () => {};
const React = require("react");
const { renderToString } = require("react-dom/server");
const { MemoryRouter } = require("react-router-dom");
const { PortfolioContent } = require("../src/App");
const { projects } = require("../src/data/portfolio");
const { getPageMeta } = require("../src/components/RouteEffects");
const routes = [
  "/",
  "/experience",
  "/projects",
  ...projects.map((p) => `/projects/${p.slug}`),
  "/about",
  "/alttabtheory",
  "/contact-me",
  "/404",
];
const template = fs.readFileSync(path.join(root, "build/index.html"), "utf8");
const escape = (text) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
for (const route of routes) {
  const metadata = getPageMeta(route);
  const markup = renderToString(
    React.createElement(
      MemoryRouter,
      { initialEntries: [route] },
      React.createElement(PortfolioContent),
    ),
  );
  let html = template.replace(
    '<div id="root"></div>',
    `<div id="root">${markup}</div>`,
  );
  html = html.replace(
    /<title>.*?<\/title>/,
    `<title>${escape(metadata.title)}</title>`,
  );
  for (const [name, content] of Object.entries({
    description: metadata.description,
    "og:title": metadata.title,
    "og:description": metadata.description,
    "og:url": `https://gurshansidhar.com${route}`,
    "og:image": `https://gurshansidhar.com${metadata.image}`,
    "twitter:title": metadata.title,
    "twitter:description": metadata.description,
    "twitter:image": `https://gurshansidhar.com${metadata.image}`,
  })) {
    const key = name.startsWith("og:") ? "property" : "name";
    html = html.replace(
      new RegExp(`<meta ${key}="${name}" content="[^"]*"\\s*/?>`),
      `<meta ${key}="${name}" content="${escape(content)}"/>`,
    );
  }
  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="https://gurshansidhar.com${route}"/>`,
  );
  if (route === "/404")
    html = html.replace(
      'name="robots" content="index,follow"',
      'name="robots" content="noindex,follow"',
    );
  const destination = path.join(
    root,
    "build",
    route === "/" ? "index.html" : `${route.slice(1)}.html`,
  );
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, html);
}
const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
  routes
    .filter((r) => r !== "/404")
    .map((route) => `<url><loc>https://gurshansidhar.com${route}</loc></url>`)
    .join("") +
  "</urlset>\n";
fs.writeFileSync(path.join(root, "build/sitemap.xml"), sitemap);
console.log(`Pre-rendered ${routes.length} routes and generated sitemap.xml.`);

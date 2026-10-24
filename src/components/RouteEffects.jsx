import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { projects } from "../data/portfolio";

export function getPageMeta(pathname) {
  const project = projects.find(
    (item) => pathname === `/projects/${item.slug}`,
  );
  if (project)
    return {
      title: `${project.name} — Gurshan Sidhar`,
      description: project.summary,
      image: project.image,
    };
  const pages = {
    "/": [
      "Gurshan Sidhar — Software, Data & AI",
      "Computer Science at Wilfrid Laurier. Exploring software, data, AI, and quantitative finance through real projects and a curious approach.",
    ],
    "/experience": [
      "Experience — Gurshan Sidhar",
      "Data analytics at Yamaha Motor Canada, AI enablement at Jonas Software, and incoming Audit AI & Analytics at BMO. Explore Gurshan’s experience and education.",
    ],
    "/projects": [
      "Projects — Gurshan Sidhar",
      "Explore Equity Options Analytics, LuckyLease, CVLens, PokéPal, and the personal portfolio. Software, data, and AI projects by Gurshan Sidhar.",
    ],
    "/about": [
      "About — Gurshan Sidhar",
      "Meet Gurshan Sidhar, Computer Science student, builder, and photographer. A visual journal, personal interests, and the tools behind the work.",
    ],
    "/contact-me": [
      "Contact — Gurshan Sidhar",
      "Get in touch with Gurshan Sidhar about software, data, AI, and interesting ideas.",
    ],
  };
  const [title, description] = pages[pathname] || [
    "Page not found — Gurshan Sidhar",
    "This page could not be found. Explore Gurshan Sidhar’s work, experience, and personal projects.",
  ];
  return { title, description, image: "/social-card.png" };
}
export default function RouteEffects() {
  const location = useLocation();
  const previousPath = useRef(location.pathname);
  useEffect(() => {
    const meta = getPageMeta(location.pathname);
    document.title = meta.title;
    const values = {
      description: meta.description,
      "og:title": meta.title,
      "og:description": meta.description,
      "og:url": `https://gurshansidhar.com${location.pathname}`,
      "og:image": `https://gurshansidhar.com${meta.image}`,
      "twitter:title": meta.title,
      "twitter:description": meta.description,
      "twitter:image": `https://gurshansidhar.com${meta.image}`,
    };
    Object.entries(values).forEach(([name, content]) => {
      const element = document.head.querySelector(
        `meta[${name.startsWith("og:") ? "property" : "name"}="${name}"]`,
      );
      if (element) element.content = content;
    });
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute("href", `https://gurshansidhar.com${location.pathname}`);
    document
      .querySelector('meta[name="robots"]')
      ?.setAttribute(
        "content",
        meta.title.startsWith("Page not found")
          ? "noindex,follow"
          : "index,follow",
      );
    if (previousPath.current !== location.pathname) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.getElementById("main-content")?.focus({ preventScroll: true });
      previousPath.current = location.pathname;
    }
    if (location.hash) {
      const timer = setTimeout(
        () =>
          document
            .getElementById(location.hash.slice(1))
            ?.scrollIntoView({ block: "start", behavior: "instant" }),
        50,
      );
      return () => clearTimeout(timer);
    }
  }, [location.pathname, location.hash]);
  return null;
}

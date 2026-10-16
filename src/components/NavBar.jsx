import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { profile } from "../data/portfolio";
import { Arrow } from "./Primitives";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const trigger = useRef(null);
  const menu = useRef(null);
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
      if (event.key === "Tab") {
        const links = [...menu.current.querySelectorAll("a")];
        if (event.shiftKey && document.activeElement === trigger.current) {
          event.preventDefault();
          links.at(-1).focus();
        } else if (!event.shiftKey && document.activeElement === links.at(-1)) {
          event.preventDefault();
          trigger.current.focus();
        }
      }
    };
    const onOutside = (event) => {
      if (!event.target.closest(".site-header")) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onOutside);
    };
  }, [open]);
  return (
    <header className="site-header">
      <div className="header-inner container">
        <Link to="/" className="wordmark" aria-label="Gurshan Sidhar, home">
          <span>
            Gurshan Sidhar<span className="wordmark-period">.</span>
          </span>
        </Link>
        <button
          ref={trigger}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen(!open)}
        >
          <span>{open ? "Close" : "Menu"}</span>
          <span
            className={`menu-glyph ${open ? "is-open" : ""}`}
            aria-hidden="true"
          >
            <i />
            <i />
          </span>
        </button>
        <nav
          ref={menu}
          id="primary-navigation"
          className={`primary-navigation ${open ? "is-open" : ""}`}
          aria-label="Main navigation"
        >
          {[
            ["/", "Home"],
            ["/experience", "Experience"],
            ["/projects", "Projects"],
            ["/about", "About"],
          ].map(([path, label]) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              onClick={() => setOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          <a
            className="resume-link"
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume <Arrow diagonal />
          </a>
        </nav>
      </div>
    </header>
  );
}

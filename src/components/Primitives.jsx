import { Link } from "react-router-dom";
export function Arrow({ diagonal = false, left = false, ...props }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path
        d={
          diagonal
            ? "M6 18 18 6M6 6h12v12"
            : left
              ? "M20 12H4m7-7-7 7 7 7"
              : "M4 12h16m-7-7 7 7-7 7"
        }
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function Label({ children, className = "" }) {
  return (
    <p className={`eyebrow ${className}`}>
      <span aria-hidden="true" className="label-square" />
      {children}
    </p>
  );
}
export function ButtonLink({
  to,
  href,
  children,
  variant = "",
  external = false,
  ...props
}) {
  const classes = `button ${variant}`;
  return to ? (
    <Link to={to} className={classes} {...props}>
      {children}
      <Arrow />
    </Link>
  ) : (
    <a
      href={href}
      className={classes}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      {...props}
    >
      {children}
      <Arrow diagonal={external} />
    </a>
  );
}
export function TextLink({
  to,
  href,
  children,
  external = false,
  className = "",
}) {
  const content = (
    <>
      {children}
      <Arrow diagonal={external} />
    </>
  );
  return to ? (
    <Link className={`text-link ${className}`} to={to}>
      {content}
    </Link>
  ) : (
    <a
      className={`text-link ${className}`}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
    </a>
  );
}
export function Tags({ items }) {
  return (
    <ul className="tags" aria-label="Technologies">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

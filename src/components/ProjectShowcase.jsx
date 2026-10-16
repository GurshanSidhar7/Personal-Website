import { Link } from "react-router-dom";
import { Arrow, Tags, TextLink } from "./Primitives";
export default function ProjectShowcase({
  project,
  index = 0,
  compact = false,
}) {
  return (
    <article
      className={`project-showcase ${index % 2 ? "is-reversed" : ""} ${compact ? "is-compact" : ""}`}
    >
      <Link
        className={`project-visual tone-${project.color}`}
        to={`/projects/${project.slug}`}
        aria-label={`Explore ${project.name}`}
      >
        <div className="visual-meta">
          <span>{project.category}</span>
          <Arrow diagonal />
        </div>
        <img
          src={project.image}
          alt={project.imageAlt}
          width="1440"
          height="800"
          loading="lazy"
        />
        <span className="visual-caption">
          {project.name}
          <span>VIEW PROJECT ↗</span>
        </span>
      </Link>
      <div className="project-summary">
        <p className="eyebrow">{project.category}</p>
        <h2>
          <Link to={`/projects/${project.slug}`}>{project.name}</Link>
        </h2>
        <p>{project.summary}</p>
        <Tags items={project.stack.slice(0, compact ? 3 : 5)} />
        <div className="project-actions">
          <TextLink to={`/projects/${project.slug}`}>
            Explore the project
          </TextLink>
          {project.live && (
            <TextLink href={project.live} external>
              Live site
            </TextLink>
          )}
          <TextLink href={project.github} external>
            GitHub
          </TextLink>
        </div>
      </div>
    </article>
  );
}

import { useParams, Link } from "react-router-dom";
import { projects } from "../data/portfolio";
import { Arrow, ButtonLink, Label, Tags } from "../components/Primitives";
import NotFound from "./NotFound";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  if (!project) return <NotFound />;
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  return (
    <div className="container page-content case-study">
      <header className="page-heading">
        <Link to="/projects" className="back-link">
          <Arrow left /> Back to projects
        </Link>
        <Label>{project.category}</Label>
        <h1>
          {project.name}
          <span className="accent-period">.</span>
        </h1>
        <div className="case-intro">
          <p>{project.summary}</p>
          <div className="button-row">
            {project.live && (
              <ButtonLink href={project.live} external>
                Visit live project
              </ButtonLink>
            )}
            <ButtonLink href={project.github} external variant="button-outline">
              View source
            </ButtonLink>
          </div>
        </div>
      </header>
      <figure className={`case-visual tone-${project.color}`}>
        <img
          src={project.image}
          alt={project.imageAlt}
          width="1440"
          height="800"
          fetchPriority="high"
        />
        <figcaption>
          {project.name === "Personal Portfolio"
            ? "ARCHIVE / THE ORIGINAL PORTFOLIO"
            : "PRODUCT VIEW / " + project.name.toUpperCase()}
        </figcaption>
      </figure>
      <section className="case-overview section-space">
        <div>
          <Label>THE OVERVIEW</Label>
          <h2>
            What’s the <em>idea?</em>
          </h2>
        </div>
        <div>
          <p className="large-body">{project.description}</p>
          <Tags items={project.stack} />
        </div>
      </section>
      <section className="case-problem-solution">
        <article>
          <span className="mono accent-text">01 / THE QUESTION</span>
          <h2>The problem.</h2>
          <p>{project.problem}</p>
        </article>
        <article>
          <span className="mono accent-text">02 / THE RESPONSE</span>
          <h2>The approach.</h2>
          <p>{project.solution}</p>
        </article>
      </section>
      <section className="case-features section-space">
        <div className="section-heading">
          <div>
            <Label>INSIDE THE BUILD</Label>
            <h2>
              Details that <em>matter.</em>
            </h2>
          </div>
        </div>
        <div className="feature-grid">
          {project.features.map(([title, description], i) => (
            <article key={title}>
              <span className="mono">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="case-architecture">
        <Label>TECHNICAL FLOW / A HIGH-LEVEL VIEW</Label>
        <ol>
          {project.approach.map((step, i) => (
            <li key={step}>
              <span className="mono">0{i + 1}</span>
              <p>{step}</p>
              {i < project.approach.length - 1 && <Arrow />}
            </li>
          ))}
        </ol>
      </section>
      <Link to={`/projects/${next.slug}`} className="next-project">
        <div>
          <Label>KEEP EXPLORING / NEXT PROJECT</Label>
          <h2>{next.name}</h2>
        </div>
        <Arrow width="42" height="42" />
      </Link>
    </div>
  );
}

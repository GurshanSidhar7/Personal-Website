import ProjectShowcase from "../components/ProjectShowcase";
import { projects } from "../data/portfolio";

export default function Projects() {
  return (
    <div className="container page-content projects-page">
      <header className="page-heading">
        <h1>
          Ideas, made <em>real.</em>
        </h1>
        <div className="page-heading-bottom">
          <p>
            Experiments in intelligence, useful software, and making the
            complicated a little clearer.
          </p>
        </div>
      </header>
      <div className="project-archive">
        {projects.map((project, index) => (
          <ProjectShowcase key={project.slug} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}

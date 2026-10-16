import { experiences, profile } from "../data/portfolio";
import { Label, Tags, TextLink } from "../components/Primitives";

function EducationCard() {
  return (
    <aside
      className="education-card"
      aria-label="Education and selected coursework"
    >
      <Label>THE FOUNDATION</Label>
      <div className="education-content">
        <div className="education-summary">
          <h2>
            Wilfrid Laurier
            <br />
            <em>University.</em>
          </h2>
          <p className="degree">BSc Honours Computer Science</p>
          <p>Minor in Statistics · Co-op Program</p>
          <div className="education-details">
            <span>WATERLOO, ON</span>
            <span>SEP 2023 — AUG 2027</span>
          </div>
          <p className="education-club">Laurier Computing Society</p>
          <TextLink href={`mailto:${profile.academicEmail}`}>
            Academic contact
          </TextLink>
        </div>
        <section className="coursework" aria-labelledby="coursework-heading">
          <h3 id="coursework-heading">Selected coursework</h3>
          <ul>
            {[
              "Data Structures I & II",
              "Object Oriented Programming",
              "Microprocessors",
              "Advanced Calculus I, II & III",
              "Discrete Mathematics",
              "Linear Algebra",
              "Machine Learning",
            ].map((course) => (
              <li key={course}>{course}</li>
            ))}
          </ul>
        </section>
      </div>
    </aside>
  );
}

export default function Experience() {
  return (
    <div className="container page-content">
      <header className="page-heading experience-heading">
        <div>
          <Label>EXPERIENCE / THE PATH SO FAR</Label>
          <h1>
            Building on
            <br />
            <em>every chapter.</em>
          </h1>
          <div className="page-heading-bottom">
            <p>
              Learning how data informs decisions, how AI fits into real
              workflows, and how thoughtful software connects the two.
            </p>
          </div>
        </div>
        <EducationCard />
      </header>
      <div className="experience-layout">
        <section
          aria-label="Professional experience"
          className="experience-timeline"
        >
          {experiences.map((role, i) => (
            <article
              id={role.company.toLowerCase().replaceAll(" ", "-")}
              aria-label={`${role.company} ${role.status ? "Incoming role" : "experience"}`}
              className={`experience-entry ${role.status ? "is-incoming" : ""}`}
              key={role.company}
            >
              <div className="timeline-marker" aria-hidden="true">
                0{i + 1}
              </div>
              <div className="experience-meta">
                <span className="experience-date">{role.date}</span>
                {role.location && <span>{role.location}</span>}
                {role.status && (
                  <span className="incoming-badge">{role.status}</span>
                )}
              </div>
              <div className="experience-body">
                <p className="eyebrow">{role.team}</p>
                <h2>{role.company}</h2>
                <h3>{role.role}</h3>
                <p className="role-summary">{role.summary}</p>
                {role.highlights.length > 0 && (
                  <ul className="role-highlights">
                    {role.highlights.map((item) => (
                      <li key={item.result}>
                        <strong>{item.result}</strong> {item.method}
                      </li>
                    ))}
                  </ul>
                )}
                {role.stack.length > 0 && <Tags items={role.stack} />}
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}

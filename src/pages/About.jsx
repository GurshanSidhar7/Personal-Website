import PhotoJournal from "../components/PhotoJournal";
import { Label, TextLink } from "../components/Primitives";
import { profile, stackGroups } from "../data/portfolio";

export default function About() {
  return (
    <div className="container page-content about-page">
      <section className="about-hero">
        <div className="about-copy">
          <Label>A LITTLE ABOUT ME</Label>
          <h1>
            A curious mind.
            <br />A life <em>in motion.</em>
          </h1>
          <p className="large-body">
            Hey, I’m Gurshan. A Computer Science student at Wilfrid Laurier,
            minoring in Statistics. I like understanding how things work, then
            seeing what else they could become.
          </p>
          <p>
            My interests sit somewhere between AI, machine learning,
            quantitative finance, and creative software. Data analytics at
            Yamaha and AI enablement at Jonas have given me different ways to
            explore that space. Next up: Audit AI & Analytics at BMO in Winter
            2027.
          </p>
          <p>
            Outside of tech, you’ll find me behind a camera, on a snowboard,
            cooking something, watching a film, or getting lost in a game.
          </p>
          <TextLink to="/experience">More about my experience</TextLink>
        </div>
        <div className="about-profile">
          <figure className="about-portrait">
            <div className="portrait-mat">
              <img
                src="/media/gursh_speech.webp"
                alt="Gurshan Sidhar speaking into a microphone at a formal event"
                width="773"
                height="784"
                fetchPriority="high"
              />
            </div>
            <figcaption>
              <span>GURSHAN SIDHAR</span>
            </figcaption>
          </figure>
          <section
            className="profile-info"
            aria-label="Personal details and favourite films"
          >
            <dl className="profile-facts">
              <div>
                <dt>Education</dt>
                <dd>
                  Wilfrid Laurier · BSc Honours CS
                  <span>Minor in Statistics</span>
                </dd>
              </div>
              {profile.location && (
                <div>
                  <dt>Based in</dt>
                  <dd>{profile.location}</dd>
                </div>
              )}
              <div>
                <dt>Languages</dt>
                <dd>{profile.languages.join(", ")}</dd>
              </div>
              <div className="profile-email">
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </dd>
              </div>
            </dl>
            <div className="profile-films">
              <h2>
                <span className="film-dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                My Letterboxd top four
              </h2>
              <ol>
                {profile.favouriteFilms.map((film) => (
                  <li key={film}>{film}</li>
                ))}
              </ol>
            </div>
          </section>
        </div>
      </section>
      <section className="stack-section section-space">
        <div className="section-heading">
          <div>
            <Label>TOOLS I’VE WORKED WITH</Label>
            <h2>
              Tech <em>stack.</em>
            </h2>
          </div>
          <p>
            From coursework, projects,
            <br />
            and time on real teams.
          </p>
        </div>
        <div className="stack-index">
          {stackGroups.map((group, i) => (
            <article key={group.title}>
              <span className="mono accent-text">0{i + 1}</span>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <PhotoJournal />
    </div>
  );
}

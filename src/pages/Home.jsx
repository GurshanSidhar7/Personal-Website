import { ButtonLink } from "../components/Primitives";
import { profile } from "../data/portfolio";
import FollowTheWork from "../components/FollowTheWork";

export default function Home() {
  return (
    <>
      <section className="hero container" aria-labelledby="home-title">
        <div className="hero-copy">
          <h1 id="home-title">
            Curiosity,
            <br />
            put into
            <br />
            <em>practice.</em>
          </h1>
          <p className="hero-intro">
            I build at the intersection of software, data, and AI. Always
            learning. Always finding a better question.
          </p>
          <div className="button-row">
            <ButtonLink to="/experience">Explore my work</ButtonLink>
            <ButtonLink href={profile.linkedin} external variant="button-outline">
              Let’s connect
            </ButtonLink>
          </div>
          <div className="hero-meta">
            <span>WILFRID LAURIER UNIVERSITY</span>
            <span>COMPUTER SCIENCE / STATISTICS</span>
          </div>
        </div>
        <FollowTheWork />
      </section>
    </>
  );
}

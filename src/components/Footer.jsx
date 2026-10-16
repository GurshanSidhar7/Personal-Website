import { profile } from "../data/portfolio";
import { Arrow } from "./Primitives";

export default function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="container footer-line">
        <div className="footer-note">
          <h2>
            <a href={`mailto:${profile.email}`}>
              Have something <em>in mind?</em>
            </a>
          </h2>
          <p>Opportunities, collaborations, or a quick hello.</p>
        </div>
        <nav className="footer-links" aria-label="Footer links">
          <a href={`mailto:${profile.email}`}>
            Email <Arrow diagonal />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn <Arrow diagonal />
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub <Arrow diagonal />
          </a>
          <a href={profile.resume} target="_blank" rel="noopener noreferrer">
            Resume <Arrow diagonal />
          </a>
        </nav>
      </div>
    </footer>
  );
}

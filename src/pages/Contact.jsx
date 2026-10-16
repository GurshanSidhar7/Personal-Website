import { profile } from "../data/portfolio";
import { ButtonLink, Label, TextLink } from "../components/Primitives";
export default function Contact() {
  return (
    <section className="container contact-page page-content">
      <Label>LET’S START A CONVERSATION</Label>
      <h1>
        A good idea starts
        <br />
        <em>with hello.</em>
      </h1>
      <p className="large-body">
        Have a project, an opportunity, or an interesting question? I’d love to
        hear from you.
      </p>
      <ButtonLink href={`mailto:${profile.email}`}>Send me an email</ButtonLink>
      <div className="button-row">
        <TextLink href={profile.github} external>
          GitHub
        </TextLink>
        <TextLink href={profile.linkedin} external>
          LinkedIn
        </TextLink>
      </div>
    </section>
  );
}

import { ButtonLink, Label } from "../components/Primitives";
export default function NotFound() {
  return (
    <section className="container not-found">
      <Label>404 / A SMALL DETOUR</Label>
      <h1>
        This path is
        <br />
        <em>uncharted.</em>
      </h1>
      <p>
        The page you’re looking for isn’t here. There’s plenty to explore back
        at the beginning.
      </p>
      <ButtonLink to="/">Back to home</ButtonLink>
    </section>
  );
}

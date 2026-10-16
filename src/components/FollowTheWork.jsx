import { useRef, useState } from "react";
import { TextLink } from "./Primitives";
import { workStories } from "../data/workStories";

function AreaIcon({ index }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={
          [
            "M4 4v16h16M7 15l4-5 4 3 6-8",
            "M12 3v4m0 10v4M3 12h4m10 0h4M5.6 5.6l2.8 2.8m7.2 7.2 2.8 2.8m0-12.8-2.8 2.8m-7.2 7.2-2.8 2.8M9 9h6v6H9Z",
            "m8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18",
          ][index]
        }
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FollowTheWork() {
  const [selected, setSelected] = useState(0);
  const tabs = useRef([]);
  const story = workStories[selected];

  function onKeyDown(event, index) {
    let next;
    if (["ArrowRight", "ArrowDown"].includes(event.key))
      next = (index + 1) % workStories.length;
    if (["ArrowLeft", "ArrowUp"].includes(event.key))
      next = (index + workStories.length - 1) % workStories.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = workStories.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next].focus();
  }

  return (
    <section className="work-map" aria-labelledby="work-map-title">
      <div className="work-map-heading">
        <h2 id="work-map-title">Follow the work</h2>
        <p>Choose an area to explore.</p>
      </div>
      <div className="work-map-canvas">
        <svg
          className="work-map-curves"
          viewBox="0 0 600 330"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {workStories.map((area) => (
            <path key={area.id} d={area.curve} className="map-curve-base" />
          ))}
          <path key={story.id} d={story.curve} className="map-curve-active" />
          <path
            d="M31 34h14m-7-7v14M560 305h14m-7-7v14"
            className="map-registration"
          />
          <circle cx="310" cy="170" r="44" className="map-center-ring" />
          <circle cx="310" cy="170" r="4" className="map-center-dot" />
        </svg>
        <div
          className="work-map-areas"
          role="tablist"
          aria-label="Explore my work areas"
        >
          {workStories.map((area, index) => (
            <button
              key={area.id}
              ref={(element) => {
                tabs.current[index] = element;
              }}
              className={`work-map-node map-node-${index}`}
              type="button"
              role="tab"
              id={`work-area-${area.id}`}
              aria-label={area.name}
              aria-selected={index === selected}
              aria-controls="work-map-panel"
              tabIndex={index === selected ? 0 : -1}
              onClick={() => setSelected(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              <AreaIcon index={index} />
              <span>
                {area.name}
                <small>{area.company}</small>
              </span>
            </button>
          ))}
        </div>
      </div>
      <div
        className="work-map-detail"
        role="tabpanel"
        id="work-map-panel"
        aria-labelledby={`work-area-${story.id}`}
        tabIndex="0"
      >
        <div key={story.id} className="work-map-copy">
          <p className="work-map-context">{story.context}</p>
          <h3>{story.title}</h3>
          <p>{story.summary}</p>
          <TextLink to={story.to}>{story.link}</TextLink>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import { photos } from "../data/portfolio";
import { Arrow, Label } from "./Primitives";

function PrintCaption({ photo }) {
  return (
    <span className="polaroid-caption">
      <span className="polaroid-handwriting">{photo.title}</span>
    </span>
  );
}
function PhotoCaption({ photo, index }) {
  return (
    <div className="photo-caption">
      <span className="frame-number">
        {String(index + 1).padStart(2, "0")}
        <span> / {photos.length}</span>
      </span>
      <h3>{photo.title}</h3>
      <p>{photo.description}</p>
    </div>
  );
}

export default function PhotoJournal() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const dialog = useRef(null);
  const strip = useRef(null);
  const restoreFocus = useRef(null);
  const touch = useRef(null);
  const photo = photos[index];
  const previous = () =>
    setIndex((value) => (value - 1 + photos.length) % photos.length);
  const next = () => setIndex((value) => (value + 1) % photos.length);
  const close = () => setOpen(false);
  const openPhoto = () => {
    restoreFocus.current = document.activeElement;
    setOpen(true);
  };
  useEffect(() => {
    const element = dialog.current;
    if (!open) return;
    element.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = overflow;
      restoreFocus.current?.focus({ preventScroll: true });
    };
  }, [open]);
  useEffect(() => {
    const thumbnail = strip.current?.querySelector('[aria-pressed="true"]');
    if (thumbnail)
      strip.current.scrollTo({
        left:
          thumbnail.offsetLeft -
          strip.current.offsetLeft -
          strip.current.clientWidth / 2 +
          thumbnail.clientWidth / 2,
        behavior: "auto",
      });
  }, [index]);
  const keyboard = (event) => {
    if (event.key === "Tab" && event.currentTarget === dialog.current) {
      const controls = [
        ...dialog.current.querySelectorAll("button:not([disabled])"),
      ];
      const first = controls[0],
        last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
      return;
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      previous();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    }
    if (event.key === "Home") {
      event.preventDefault();
      setIndex(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      setIndex(photos.length - 1);
    }
  };
  const touchStart = (event) => {
    touch.current = {
      x: event.changedTouches[0].clientX,
      y: event.changedTouches[0].clientY,
    };
  };
  const touchEnd = (event) => {
    if (!touch.current) return;
    const dx = event.changedTouches[0].clientX - touch.current.x,
      dy = event.changedTouches[0].clientY - touch.current.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      if (dx < 0) next();
      else previous();
    }
    touch.current = null;
  };
  return (
    <section
      className="photo-journal section-space"
      id="photo-journal"
      aria-labelledby="journal-heading"
    >
      <div className="section-heading">
        <div>
          <Label>PHOTOGRAPHS BY ME</Label>
          <h2 id="journal-heading">
            Frame by <em>frame.</em>
          </h2>
        </div>
      </div>
      <div onKeyDown={keyboard} className="journal-viewer">
        <div
          className="journal-stage"
          onTouchStart={touchStart}
          onTouchEnd={touchEnd}
        >
          <button
            className="journal-photo"
            onClick={openPhoto}
            aria-label={`Enlarge ${photo.title}`}
          >
            <img
              key={photo.file}
              src={`/media/${photo.file}.webp`}
              alt={photo.alt}
              style={{ objectPosition: photo.position || "50% 50%" }}
              width="1200"
              height="900"
              loading="lazy"
            />
            <span className="enlarge-label">
              VIEW FULL FRAME <Arrow diagonal />
            </span>
          </button>
          <PrintCaption photo={photo} />
        </div>
        <aside className="journal-aside">
          <PhotoCaption photo={photo} index={index} />
          <div className="journal-controls">
            <button
              className="icon-button"
              onClick={previous}
              aria-label="Previous photograph"
            >
              <Arrow left />
            </button>
            <span className="mono">← EXPLORE →</span>
            <button
              className="icon-button"
              onClick={next}
              aria-label="Next photograph"
            >
              <Arrow />
            </button>
          </div>
          <p className="keyboard-hint">
            Use arrow keys to explore. Swipe on mobile.
          </p>
        </aside>
        <div className="filmstrip" ref={strip} aria-label="Choose a photograph">
          {photos.map((item, i) => (
            <button
              key={item.file}
              aria-label={`Show photograph ${i + 1}: ${item.title}`}
              aria-pressed={index === i}
              onClick={() => setIndex(i)}
            >
              <img
                src={`/media/${item.file}-thumb.webp`}
                alt=""
                style={{ objectPosition: item.position || "50% 50%" }}
                width="112"
                height="84"
                loading="lazy"
              />
              <span>{String(i + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        Photograph {index + 1} of {photos.length}: {photo.title}
      </p>
      <dialog
        className="photo-lightbox"
        ref={dialog}
        aria-labelledby="lightbox-title"
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={keyboard}
      >
        {open && (
          <>
            <div className="lightbox-header">
              <span id="lightbox-title" className="mono">
                FRAME BY FRAME / {String(index + 1).padStart(2, "0")} OF{" "}
                {photos.length}
              </span>
              <button
                onClick={close}
                className="lightbox-close"
                aria-label="Close photograph viewer"
              >
                Close <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="lightbox-content">
              <div
                className="lightbox-image"
                onTouchStart={touchStart}
                onTouchEnd={touchEnd}
              >
                <div className="lightbox-print">
                  <img
                    src={`/gallery_image/${photo.file}.${photo.file === "jellyfish" ? "JPG" : "jpg"}`}
                    alt={photo.alt}
                    width="1600"
                    height="1200"
                  />
                  <PrintCaption photo={photo} />
                </div>
              </div>
              <div className="lightbox-aside">
                <PhotoCaption photo={photo} index={index} />
                <div className="journal-controls">
                  <button
                    className="icon-button"
                    onClick={previous}
                    aria-label="Previous enlarged photograph"
                  >
                    <Arrow left />
                  </button>
                  <button
                    className="icon-button"
                    onClick={next}
                    aria-label="Next enlarged photograph"
                  >
                    <Arrow />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}

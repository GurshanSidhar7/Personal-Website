import { useRef, useState } from "react";
import { Arrow, Label } from "../components/Primitives";
import SocialIcon from "../components/SocialIcon";
import { profile } from "../data/portfolio";

export default function AltTabTheory() {
  const video = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);

  async function toggleVideo() {
    if (!video.current) return;
    if (playing) {
      video.current.pause();
      return;
    }
    try {
      await video.current.play();
      setVideoError(false);
    } catch {
      setVideoError(true);
    }
  }

  return (
    <div className="container page-content alttab-page">
      <section className="alttab-heading" aria-labelledby="alttab-title">
        <Label>A different side of my curiosity</Label>
        <h1 id="alttab-title">AltTab<em>Theory.</em></h1>
        <div className="alttab-introduction">
          <div>
            <p className="alttab-lead">Technology. Human behaviour. Bigger questions.</p>
            <p className="alttab-description">
              AltTabTheory is where I explore AI and emerging technology,
              the psychology behind how we think, and the philosophical questions
              they raise. Through short videos and conversations, I share what
              I’m learning, question assumptions, and invite other perspectives.
            </p>
          </div>
          <p className="alttab-signature">Same curiosity. A different window.</p>
        </div>
      </section>
      <section className="alttab-destinations" aria-label="AltTabTheory social profiles">
        <div className="alttab-platforms">
          <article className="alttab-platform" aria-labelledby="x-title">
            <div className="alttab-platform-header">
              <SocialIcon platform="x" />
              <h2 id="x-title">X</h2>
              <a
                className="alttab-account-link"
                href={profile.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="AltTabTheory on X (opens in a new tab)"
              >
                @alttabtheory <Arrow diagonal />
              </a>
            </div>
            <a
              className="alttab-media alttab-x-preview"
              href={profile.x}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit AltTabTheory on X (opens in a new tab)"
            >
              <div className="alttab-x-profile">
                <div className="alttab-x-banner" aria-hidden="true">
                  <span>AltTab<em>Theory.</em></span>
                </div>
                <div className="alttab-x-identity">
                  <span className="alttab-x-avatar">
                    <img
                      src="/media/alttab-avatar.jpg"
                      alt="Gurshan Sidhar’s profile avatar"
                      width="152"
                      height="152"
                      loading="lazy"
                    />
                  </span>
                </div>
                <div className="alttab-x-details">
                  <p className="alttab-x-name">AltTabTheory</p>
                  <p className="alttab-x-handle">@alttabtheory</p>
                  <p className="alttab-x-bio">
                    Technology, philosophy, psychology, and a lot of curiosity.
                    Asking better questions. Sharing what I’m learning.
                  </p>
                  <span className="alttab-x-topics">AI · Technology · Ideas</span>
                </div>
              </div>
            </a>
            <div className="alttab-platform-body">
              <p className="alttab-card-heading">Join the conversation.</p>
              <p>
                On X, I work through questions about AI, human behaviour, and
                philosophy in public. I share what I’m learning and open it up
                for discussion. Bring a question, challenge an assumption, or
                share a perspective I haven’t considered.
              </p>
            </div>
          </article>
          <article className="alttab-platform" aria-labelledby="instagram-title">
            <div className="alttab-platform-header">
              <SocialIcon platform="instagram" />
              <h2 id="instagram-title">Instagram</h2>
              <a
                className="alttab-account-link"
                href={profile.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="AltTabTheory on Instagram (opens in a new tab)"
              >
                @alttabtheory <Arrow diagonal />
              </a>
            </div>
            <div className="alttab-media alttab-video">
              <video
                ref={video}
                id="alttab-intro-video"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onEnded={() => setPlaying(false)}
                onError={() => { setVideoError(true); setPlaying(false); }}
                playsInline
                preload="none"
                poster="/media/alttab-introduction.jpg"
                aria-label="AltTabTheory introduction video"
                width="2160"
                height="3840"
              >
                <source src="/media/alttab-introduction.mp4" type="video/mp4" />
                <a href="https://www.instagram.com/p/DfAtpdqNbtZ/">
                  Watch the introduction on Instagram
                </a>
              </video>
              <button
                className="alttab-video-toggle"
                type="button"
                aria-controls="alttab-intro-video"
                onClick={toggleVideo}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  {playing ? <path d="M4 3h3v10H4zm5 0h3v10H9z" /> : <path d="m5 2 9 6-9 6z" />}
                </svg>
                {playing ? "Pause introduction" : "Play introduction"}
              </button>
              {videoError && (
                <a className="alttab-video-error" role="status" href="https://www.instagram.com/p/DfAtpdqNbtZ/" target="_blank" rel="noopener noreferrer">
                  Watch the introduction on Instagram <Arrow diagonal />
                </a>
              )}
            </div>
            <div className="alttab-platform-body">
              <p className="alttab-card-heading">Meet AltTabTheory.</p>
              <p>
                How is AI changing the way we live? Why do we think the way we
                do? On Instagram, I explore the connections between technology,
                psychology, and philosophy through short videos. Start with this
                introduction, then follow the questions that catch your curiosity.
              </p>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}

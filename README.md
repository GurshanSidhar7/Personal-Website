# Gurshan Sidhar — personal portfolio

An original editorial portfolio built with React 19, React Router 7 and Create React App. Warm paper, ink, vermilion, locally hosted Instrument Serif / Manrope / IBM Plex Mono, and an original interactive SVG scene form the visual system. All original photography, project assets, resume and meaningful content are preserved.

## Run locally

Use Node.js 22 LTS and npm. From this directory:

```sh
npm ci
npm start
```

The development app serves at http://localhost:3000. No API keys or environment file are required.

```sh
npm run lint
CI=true npm test -- --watchAll=false --runInBand
npm run build
npm run preview
```

The production preview serves at http://127.0.0.1:4173. Set `PORTFOLIO_PREVIEW_PORT` if a different port is needed. `npm run build` compiles the app, then pre-renders 11 HTML pages and creates `sitemap.xml`. Existing Babel dependencies perform build-time rendering; no framework or production dependency was added. No separate typecheck applies to this JavaScript project.

## Routes

| Route                                | Content                                                                                    |
| ------------------------------------ | ------------------------------------------------------------------------------------------ |
| `/`                                  | Concise introduction, Experience action, compact footer; new interaction pending selection |
| `/experience`                        | BMO incoming role, Yamaha, Jonas, education and coursework                                 |
| `/projects`                          | Spacious alternating showcases and direct live-site / source actions                       |
| `/projects/equity-options-analytics` | Equity Options Analytics case study                                                        |
| `/projects/lucky-lease`              | LuckyLease case study                                                                      |
| `/projects/cvlens`                   | CVLens case study                                                                          |
| `/projects/poke-pal`                 | Poke-Pal case study                                                                        |
| `/projects/portfolio-website`        | Portfolio case study and original design archive                                           |
| `/about`                             | Personal narrative, authentic portrait, 12-photo journal and categorized technical index   |
| `/gallery`                           | Compatibility redirect to `/about#photo-journal`                                           |
| `/contact-me`                        | Email and social contact actions                                                           |
| Unknown URL                          | Designed 404 with a path home                                                              |

The resume remains at `/Gurshan%20Sidhar%20Final%20Resume.pdf`.

## Design and interaction decisions

- **Hero direction:** the large fire illustration is removed. A concise professional introduction remains while the owner chooses the next functional interaction from [five proposed directions](docs/HERO-IDEAS.md). A reduced Fire Nation-inspired flame accompanies the header wordmark.

- **Project archive:** alternating visual/narrative layouts give screenshots breathing room; each project has a dedicated case study. The options screenshot is from the authentic live application. Screenshots are never passed off as newly built functionality.
- **Frame by frame:** a single focused viewer and filmstrip, styled as white Polaroid prints with locally hosted Permanent Marker captions. Native modal dialogs provide focus containment, Escape dismissal and focus restoration; arrow/Home/End keys and horizontal touch swipes support browsing. Enlargement loads the original full-resolution photograph. Music associations, music icons, external photo links and the contact sheet have been removed at the owner’s request.

- **Routes and metadata:** static HTML includes the page content, unique title/description, canonical, Open Graph and Twitter metadata. The client hydrates it for navigation and interactions. Unknown pages use noindex metadata. A Person structured-data record, custom favicon, social card and branded manifest replace CRA defaults.

## Content and maintenance

`src/data/portfolio.js` holds projects, experience, links, gallery captions and technical groups. Shared components and style tokens are under `src/components/` and `src/index.css`; the page layout system is in `src/App.css`. Fonts and license files are self-hosted in `public/fonts/`. Optimized, EXIF-corrected WebP copies and small thumbnails are in `public/media/`; every original stays at its original URL.

See [the content audit](docs/CONTENT-AUDIT.md) for a preservation checklist and factual conflicts, and [QA results](docs/QA.md) for verification details. In particular, the original resume describes options features beyond the currently verified implementation, and source documents contain multiple social handles. Those original documents/links are retained; neither issue is silently rewritten.

## Production deployment

The existing Vercel project deploys the GitHub repository’s `main` branch. Its project root is the repository root (`./`), where `package.json` and `vercel.json` live; `my-website` is the local checkout folder name, not a nested directory in GitHub.

`vercel.json` declares `npm run build`, the `build` output directory, clean URLs, and the legacy gallery redirect. The build also runs the `postbuild` script to pre-render every portfolio route. Static routes are emitted as `.html` files, and `404.html` handles unknown URLs. After pushing, confirm the commit’s Vercel status and test direct nested URLs on the production domain.

For another static host, serve `build/` with clean URL support (`/experience` → `/experience.html`, `/projects/cvlens` → `/projects/cvlens.html`). Configure `/gallery` → `/about#photo-journal`, and serve `404.html` with HTTP 404 for unknown paths. Preserve real files, fonts, PDFs and image routes. Do not rewrite every page to the home HTML: use the generated page files so content and social metadata remain correct.

The original Google Analytics configuration is retained. No tracking account or external service was changed.

Contact: [gurshansidhar7@gmail.com](mailto:gurshansidhar7@gmail.com) · [GitHub](https://github.com/GurshanSidhar7) · [LinkedIn](https://www.linkedin.com/in/gurshan-sidhar)

## Review refinements — 16 October 2026

The landing page is intentionally limited to the hero and interactive interests map. Decorative headings, repeated project/personal previews, the asterisk, next-chapter strip, webring and footer signature were removed at the owner’s request. Education now shares the Experience header; the duplicate resume CTA is removed. Projects no longer show filters or project counts, and the repeated outcome/repository sections are removed from case studies. LuckyLease, CVLens and Poke-Pal now include their owner-supplied live links. The About prose is simpler, the photography introduction is direct, and the skills section is called Tech Stack.

The earlier review used a name-only wordmark; the current header includes the owner-requested reduced flame mark. Five alternative directions are in [the visual comparison](docs/logo-directions.html) and [its preview](docs/previews/logo-directions.png). All original image files and the resume remain intact.

## Further review — 16 October 2026

The interests map is replaced by a minimalist Zuko-inspired fire study and a clear background summary. The main work CTA now opens Experience. The background grid is tighter, and the footer is reduced further with a short contact context line. Coursework shares the education area, and Tech Stack precedes Frame by Frame. The gallery now has a single view with thumbnails; every song association, music icon, music/original-file link, contact-sheet control and introductory paragraph has been removed. All 13 journal photographs and the portrait remain intact.

## Current review — 16 October 2026

Coursework is integrated inside the foundation card with a shared surface and internal divider. Dark Ryd and Dancing Trees use higher image placement within their print frames. Among the Trees is removed from the journal; its original image is retained. The journal now has 12 photos plus the separate About portrait. The large hero fire illustration is removed; an interactive replacement will be implemented after the owner selects a concept.

## Follow the Work and personal card — 16 October 2026

The home hero now has the owner-selected Follow the Work explorer. Choose Yamaha, Jonas or LuckyLease, then select Problem, Approach or Result to reveal a grounded explanation, relevant tools and a route to the actual work. Arrow keys and Home/End navigate stages, and reduced-motion preferences disable the finite connector/reveal animations. Story content lives in `src/data/workStories.js`; no new runtime dependencies are added.

The uploaded three-flame/spiral reference replaces the generic header mark, with matching SVG, PNG and ICO app icons. Below the About portrait, a compact card shows Laurier education, the verified email, English/French/Punjabi and the four owner-selected films. Residence remains omitted until confirmed; no location is inferred from employment or university.

## Minimalist map refinement — 16 October 2026

The boxed, staged work explorer is replaced by the earlier open, curved-line map. Three keyboard-accessible nodes—Data & analytics, Applied AI and Software—reveal one brief summary and a link. Yamaha and Jonas links now land directly on their experience entries. The header returns to a name-only wordmark. Grid cells are 64 px on desktop and 48 px on mobile; the combined space before Tech Stack is reduced to roughly 62/50 px. Experience dates are 13 px on desktop and 12 px on mobile.

Experience bullets lead with the documented outcome, followed by the method, with stronger visual emphasis. The owner confirmed that the HR automation saved time for a global team but had no measured figures. This is stated qualitatively; no percentages, ratios or hours saved are estimated or invented. The original resume PDF remains unchanged.

## Quiet footer refinement — 16 October 2026

The footer now shares the page background and uses a single inset divider. A small contact prompt and its context sit beside Email, LinkedIn, GitHub and Resume on desktop; mobile places the links directly underneath. The shaded band, second divider and separate copyright row are removed. Superseded footer CSS is consolidated into one responsive definition.

## Footer color and stationary grid — 16 October 2026

The owner-approved footer dimensions remain unchanged, with a warm stone background (`#e9e4da`). The grid now lives on a fixed, non-interactive `body::before` layer instead of relying on body background attachment. Grid spacing remains 64 px on desktop and 48 px on mobile.

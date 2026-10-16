# Portfolio content audit and preservation record

Audited 15 October 2026, before implementation.

## Original application

React 19, Create React App / react-scripts 5, React Router 7.3, plain CSS. No backend. Existing routes: `/`, `/projects`, `/gallery`, `/contact-me`. The last route was an unfinished heading. No separate career page existed. `App.test.js` still expected the unused CRA “Learn React” link. No existing source modifications were present inside the nested `my-website` Git repository when this work began. The parent repository tracks this directory separately; work remains in the nested checkout.

The rebuild retains the framework, dependency set, original analytics ID (`G-7XVNJEETLV`), public assets, and resume. The old cursor trail, purple backgrounds, and unused component styles are replaced. Shared navigation, project presentation, content, and gallery behavior are rebuilt.

## Projects

| Original entry           | Preserved content                                                                                                                                                                                                                                                          | New route                            |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| Lucky Lease              | Student/intern subletting; JWT authentication; listings and filtering; multiple Supabase Storage images; Socket.io chat; map; Gemini advisor with budget, location, amenities, lease duration, pros/cons and compatibility score; every original stack item and repository | `/projects/lucky-lease`              |
| CVLens                   | Group project; PDF/DOCX input; SpaCy extraction of contact, education, skills and experience; FastAPI REST service and JSON; Next.js frontend; Docker/Git; dataset of 200+ resumes from existing PDF                                                                       | `/projects/cvlens`                   |
| Poke-Pal / PokeMatch AI  | Personality questionnaire; custom Gemini backend; PokéAPI match, image, stats, abilities and explanation; every original stack item and repository                                                                                                                         | `/projects/poke-pal`                 |
| Portfolio Website        | Original React/HTML/CSS/JavaScript description and repository; original screenshot retained and explicitly identified as the previous design                                                                                                                               | `/projects/portfolio-website`        |
| Equity Options Analytics | Added from the user’s linked repository and verified live app; historical close, HV20/HV30, European dividend-adjusted Black–Scholes, four Greeks, Greek-versus-spot chart, and explicit implementation limits                                                             | `/projects/equity-options-analytics` |

Original project screenshots remain in `public/image/`. Optimized derivatives are in `public/media/`. The equity screenshot was captured from the actual public app; its values are a captured product view, not portfolio performance claims.

Repositories preserved verbatim:

- https://github.com/TaseskiCS/LuckyLease
- https://github.com/CVLens/CVLens
- https://github.com/GurshanSidhar7/Poke-Pal
- https://github.com/GurshanSidhar7/Personal-Website/tree/master?tab=readme-ov-file
- https://github.com/GurshanSidhar7/equity-options-analytics
- Live options app: https://equity-options-analytics-1.vercel.app/

## Experience and education

The original pages contained no career entries. `public/Gurshan Sidhar Final Resume.pdf` supplies:

- Yamaha Motor Canada Ltd., Data Analyst, May–September 2026, Toronto: demand models, competitor pricing, aggregate buyer analytics, executive FP&A dashboards, and Python pipelines combining sales and Statistics Canada data. All four meaningful highlights are migrated.
- Jonas Software / Constellation Software (TSX: CSU), AI Enablement Intern, September–December 2025, Toronto: Power Automate/n8n/LLM workflows; candidate, invoice and financial automation; AI Hub, SOPs, governance and workshops. All three highlights are migrated.
- Wilfrid Laurier University, Waterloo: BSc Computer Science, Statistics minor, co-op, September 2023–August 2027; Laurier Computing Society; Data Structures I/II, OOP, Microprocessors, Calculus I/II/III, Discrete Mathematics, Linear Algebra and Machine Learning. “Honours” is supplied by the user. The August 2027 date comes from the existing PDF, not an inferred graduation date.
- BMO, incoming Data Science Analyst, Audit AI & Analytics, Winter 2027: supplied by the user. No responsibilities, achievements, location or exact start date have been invented.

Languages, frameworks, libraries, and developer tools from the PDF are represented in the About technical index or relevant case studies. The old time-sensitive “second-year” wording is updated to “Computer Science student.” Personal interests in photography, gaming, cooking, films, snowboarding and music remain.

## Photography

All 14 original files in `public/gallery_image/` are untouched. The authentic speaking portrait (`gursh_speech.png`) is the About hero. The journal contains the ten original carousel photos, retaining their title, meaningful caption, and exact Spotify URL (one leading whitespace corrected), in original order:

1. `seigfried.jpg` — Late Night Runs
2. `bird_sun.jpg` — Ball of Fire
3. `dark_ryd.jpg` — Dark Ryd
4. `house.jpg` — Dancing Trees
5. `snowboard.jpg` — Snow Dunes
6. `late_night.jpg` — Passenger Perspective
7. `jellyfish.JPG` — Floating Away
8. `mountain.jpg` — Nature’s Roller Coaster
9. `sunflower.jpg` — Cotton Candy Skies
10. `yosemit.jpg` — Half Dome

Three additional original assets are now accessible in the journal: `tree_gurshan.jpg`, `mountain_sun.jpg`, `la_tree.jpg`. Their new descriptive titles/captions describe visible content and do not assert dates or locations. Every journal photo links to its original full-quality file. Optimized derivatives normalize EXIF orientation; originals retain their bytes and metadata.

All other original images and language icons remain in the public asset archive, including the old space artwork. Those legacy decorative assets are not used as the new hero artwork.

## Resume and other links

- Original PDF preserved byte-for-byte and reachable from header, footer, and Experience.
- GitHub: https://github.com/GurshanSidhar7
- Original in-app LinkedIn: https://www.linkedin.com/in/gurshan-sidhar
- Original README LinkedIn: https://www.linkedin.com/in/gurshan-sidhar-a1945428a/
- README email: gurshansidhar7@gmail.com
- Resume email: sidh5429@mylaurier.ca, linked from education.
- Laurier webring: https://wluring.xyz, plus both `/api/gurshan321/prev` and `/api/gurshan321/next` links.
- Every Spotify pairing is centralized in `src/data/portfolio.js`.
- Legacy `/gallery` forwards to `/about#photo-journal`; `/contact-me` becomes a functional contact page.

## Conflicts and owner follow-up

1. **Options scope:** the existing PDF describes live option chains, implied-volatility estimation, and volatility skew. The linked project README explicitly says these are not implemented; the live app marks Option Chain as planned. The case study follows the narrower verified scope. The original PDF is unchanged. Update the PDF separately when its project claims match the implementation.
2. **Social handles:** the source, README and PDF contain different LinkedIn handles. The original in-app link remains the main link; the README variant is retained in structured data and this audit. The PDF also prints `linkedin.com/in/gurshansidhar` and `github.com/gurshansidhar`; the original PDF is preserved. Confirm preferred profiles before changing these destinations. The application continues to use the existing `GurshanSidhar7` GitHub account.
3. No unprovided dates, role achievements, performance percentages, availability claims, or project usage counts were added.

## Link verification follow-up

Read-only checks returned 200 for all project repositories, the GitHub profile, the live options application, and ten Spotify tracks. CVLens redirects to `https://github.com/TaseskiCS/CVLens`; the portfolio repository redirects to its `main` branch. Original URLs are kept because redirects remain functional. LinkedIn blocks automated access with status 999. The original `wluring.xyz` domain fails DNS, including both ring navigation endpoints; restore or replace the ring service through a separate owner decision. See `link-checks.json` for exact responses.

## Owner review — 16 October 2026

The owner explicitly requested removal of the webring, footer signature, landing-page previews and decorative copy, project filters/counts, redundant resume CTA, and case-study outcome sections. Those removals supersede the earlier preservation constraint for that presentation. The original webring URLs and case-study outcome text remain in the audit/data history. All photographs, song pairings, project repositories, experience and education facts, and the original resume remain intact.

The homepage now uses the owner-selected interactive interests map, replacing the pixel-art scene. Education moves beside the Experience headline. The gallery becomes a Polaroid-style presentation with Permanent Marker lettering, and the About note is replaced by a direct photography introduction. The header uses a name-only wordmark pending a final logo choice; five directions are available in `logo-directions.html`. Live destinations supplied by the owner are https://luckylease.vercel.app/, https://cvlens.vercel.app/, and https://pokepal-g.vercel.app/.

## Further owner review — 16 October 2026

The owner requested complete removal of photo/song associations, music notes, original-file/music links, the contact sheet and gallery introduction. Spotify fields have been removed from the application data; prior pairings remain only in this historical audit record and the historical link-check output. All original image bytes and all 13 journal frames remain. The single viewer retains thumbnail selection, keyboard/touch navigation and an accessible original-resolution lightbox.

The owner also requested a denser background grid, a smaller footer with context, the primary work action pointing to Experience, coursework beside education, and Tech Stack before the photographs. The interactive interests map is replaced by a labeled, original minimalist fire study inspired by Zuko, with a short verifiable professional summary.

## Latest owner review — 16 October 2026

Among the Trees (`tree_gurshan`) is removed from the gallery at the owner’s request; the original and optimized assets remain untouched. The gallery now contains 12 entries. Dark Ryd and Dancing Trees have per-photo print/thumbnail positioning that moves their image content upward. Coursework is part of the foundation card rather than a separate card. A reduced Fire Nation-inspired mark is added to the header; the large hero fire study is removed. Five functional hero concepts are proposed in `HERO-IDEAS.md`, awaiting the owner’s selection before implementation.

## Follow the Work and personal details — 16 October 2026

The owner selected Follow the Work and supplied a spiral Fire Nation mark as visual reference. The new vector redraw follows its three tapered flames and inward spiral; it replaces the previous generic flame and matching app icons. The explorer summarizes existing verified Yamaha/Jonas contributions and the group-built LuckyLease marketplace without inventing metrics or individual ownership of the group project.

The About card uses Wilfrid Laurier education and `gurshansidhar7@gmail.com` from the existing profile. The owner confirmed English, French and Punjabi. Location was not confirmed and is omitted, with conditional support in the card. Carleton, Ottawa and the reference email are not copied. The owner supplied Perfect Blue, Moonlight, Parasite and the Punjabi film as favourites; the latter title is normalized to “Anhey Ghorhey Da Daan”, the spelling in the producer's [NFDC feature-film catalogue](https://www.nfdcindia.com/catalogue/NFDC%20-%20Feature%20Films%20Catalogue%202024.pdf). No Letterboxd profile, ratings or reviews are invented.

## Minimalist map and experience-copy review — 16 October 2026

The owner requested the earlier curved-line visual, removal of the header flame, a denser grid, less space above Tech Stack, larger experience dates and stronger XYZ-style bullets. The open three-node map replaces the boxed workflow explorer. It uses the verified Yamaha, Jonas and group-project examples, with a single concise summary and direct destination. The flame image is removed from the wordmark; prior reference assets remain archived.

The resume was re-read using PDFKit. All four Yamaha and three Jonas accomplishments are retained as outcome-led bullets with methods, with no new numerical performance claims. The owner additionally confirmed: “i dont have exact numbers but it saved a lot of time for a global HR team”. The Jonas HR bullet therefore states time saved for a global HR team without quantifying it. Monthly and annual forecast horizons are existing resume facts, not numerical improvement metrics. BMO remains incoming with no accomplishment bullets.

## Quiet footer review — 16 October 2026

The owner requested a smaller, more aesthetically restrained bottom section. The footer now uses one divider on the paper background, a smaller contact prompt with its existing context, and Email/LinkedIn/GitHub/Resume links. The duplicate full email display and separate copyright row are removed. All contact destinations remain functional and unchanged.

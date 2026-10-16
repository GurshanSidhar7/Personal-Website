# Verification record

Completed against the local production build on 16 October 2026 (America/Toronto).

## Automated checks

- `npm run lint`: passed, including `.js` and `.jsx`, with zero warnings allowed.
- `CI=true npm test -- --watchAll=false --runInBand`: 8 tests passed. Covers all project routes/actions, the unfiltered project list, the home Experience/LinkedIn actions, incoming role status, resume URL, complete photo inventory, arrow navigation, thumbnail selection, modal Tab/Shift+Tab wrapping and focus restoration, mobile menu Escape, missing pages, and the legacy gallery route.
- `npm run build`: passed. Generates 11 static HTML pages and a sitemap through the existing React/Babel toolchain. Production JavaScript is approximately 83.5 kB gzip and CSS approximately 9 kB gzip. Runtime dependencies are unchanged.
- `git diff --check`: passed.
- Compared all 28 original files under `public/gallery_image/`, `public/image/`, plus the resume against their Git versions: **zero modifications**. The original language SVG icons also remain in place.

## Browser verification

The reproducible script is `scripts/check-browser.cjs`; machine-readable results are in `qa-results.json`. Screenshots are in `previews/`.

The suite uses Chromium and checks production HTML served by `npm run preview`, not only the development server:

- Twelve routes at 1440, 1280, 768, 430, 375, and 320 px: 72 route/viewport checks. Includes all five case studies, contact, and both unknown page/project paths.
- Correct 200/404 statuses, route-specific canonical URLs, nonempty page headings, and no page-level horizontal overflow.
- axe WCAG 2 A/AA and WCAG 2.1 AA scans on the main desktop pages, options case study, contact, missing page, mobile Home/About, and the open gallery dialog.
- Complete project list, live-site actions, client navigation, direct nested refresh, and browser Back.
- Experience and LinkedIn actions, compact footer height, and coursework within the shared foundation card.
- Tech Stack precedes the photo viewer. Gallery wraparound, keyboard arrows, all 12 thumbnails, no contact-sheet/music/extra links, native dialog Tab wrapping, Escape, and focus restoration.
- Mobile menu open/close, Escape, navigation and automatic close.
- A real Chromium touch gesture advances the photo viewer.
- Legacy gallery redirect and journal anchor, original/optimized image URLs, fonts, resume, social image, favicon, and sitemap.
- A case study remains readable with JavaScript disabled.
- Runtime and hydration errors are monitored.

Automated accessibility scans do not establish exhaustive accessibility compliance. Testing used Chromium; Safari, Firefox, physical devices, screen-reader sessions, and Lighthouse/Core Web Vitals field measurements were not run. No production deployment was made or tested.

## External links

`link-checks.json` records historical read-only HTTP checks from the first rebuild; the Spotify pairings recorded there are no longer part of the site. Seventeen destinations returned 200 after following redirects: all five project repositories, the GitHub profile, the live options app, and all ten Spotify tracks. The CVLens repository and portfolio repository redirect to their current locations; original URLs remain intact.

LinkedIn returned its automated-access blocking response (999) for both source-document variants, so those profiles need manual verification. The original `wluring.xyz` domain and its previous/next endpoints failed DNS resolution. Their URLs remain documented in the original audit; the footer webring was removed at the owner’s request. Email deliverability was not tested or used to send messages.

The existing CRA toolchain prints a stale Browserslist database notice. Compilation, linting and tests pass. No dependency upgrade was needed for the rebuild.

## Repeat the browser suite

Start the production preview, then install optional QA dependencies outside the application:

```sh
npm run build
npm run preview
```

In another terminal, from `my-website`:

```sh
npm install --prefix /tmp/portfolio-qa --no-audit --no-fund playwright @axe-core/playwright
/tmp/portfolio-qa/node_modules/.bin/playwright install chromium
NODE_PATH=/tmp/portfolio-qa/node_modules node scripts/check-browser.cjs
```

`PORTFOLIO_PREVIEW_URL` selects another preview URL. `PORTFOLIO_BROWSER_PATH` can select an already installed Chromium executable. These tools are optional development checks and do not become application dependencies.

The owner-supplied LuckyLease, CVLens, and Poke-Pal deployment checks are recorded separately in `review-link-checks.json`. Photographs now have printed Polaroid frames with a self-hosted marker-style font. Logo directions are captured in `previews/logo-directions.png`.

Latest production run: 72 viewport/route checks, 10 accessibility scans including the open dialog, seven interaction groups, 62 local asset checks, and zero runtime/hydration errors. All three newly supplied live-site URLs returned HTTP 200. See `qa-results.json` and `review-link-checks.json`.

Final refinement verification: the simplified gallery and professional introduction pass 72 responsive route checks and ten accessibility scans, with zero runtime/hydration errors. The smaller desktop footer is checked below 125 px; coursework is checked beside education, and Tech Stack before Frame by Frame. All photo/song fields and gallery music/original-file links are removed.

Latest review verification: 12 photo entries after removing Among the Trees; higher Dark Ryd/Dancing Trees crops; coursework inside the foundation card; reduced flame header mark. Eight tests, 72 responsive route checks, ten accessibility scans, 63 local asset checks, and zero runtime/hydration errors passed. The large hero fire study is removed; the next interaction is awaiting concept selection.

## Follow the Work review — 16 October 2026

Lint, ten integration tests and the production build pass (11 pre-rendered routes). The browser suite covers 72 route/viewport combinations from 320 to 1440 px, ten axe scans, nine interaction groups and 63 local asset checks with no runtime/hydration errors. New checks cover keyboard stage selection, switching work examples, navigation to LuckyLease and the personal card's languages/four films. All nine example/stage states were also inspected at 1440, 768, 375 and 320 px. New header/app icons were rasterized from the reference-based SVG. Preview artifacts are in `previews/`; the application has no additional runtime dependencies. No deployment was performed.

## Curved map, spacing and experience review — 16 October 2026

The production build, lint and ten integration tests pass. Final browser results: 72 route/viewport checks, ten axe accessibility scans, nine interaction groups, 63 local asset checks and no runtime/hydration errors. Additional checks assert 64/48 px grid layers, a name-only header, a compact map below 625 px, experience dates of at least 12 px, and no more than 70 px between the personal card and Tech Stack. Keyboard navigation through all three map areas, direct Jonas anchor navigation, and the LuckyLease destination pass. The owner-confirmed qualitative global-HR time-saving statement is present in the production build. Original resume and photo files remain unchanged. Updated screenshots include the curved map, individual Yamaha/Jonas entries, and Tech Stack spacing. No deployment was performed.

## Quiet footer review — 16 October 2026

The production build passes with 11 pre-rendered routes. Browser validation passes 72 responsive route checks, ten axe scans, nine interaction groups and 63 local asset checks, with no runtime/hydration errors. The footer is checked at all six widths: desktop height is capped at 80 px (actual 74 px), mobile at 110 px. Tests verify the contact prompt and all four destination links, including the explicit email action. Visual previews are saved as `footer-1440.png`, `footer-375.png`, and `footer-320.png`. No new unit tests were added for this presentation-only change. No deployment was performed.

## Footer color and stationary grid — 16 October 2026

The production build and final browser suite pass: 72 responsive route checks, ten accessibility scans, nine interaction groups, 63 local assets, and zero runtime/hydration errors. Checks assert the fixed grid layer, the new warm stone footer background, and the unchanged footer height limits. A separate rendered-pixel comparison at 1440 px and a 375 px touch viewport confirms visible grid pixels remain identical after a 197 px scroll. Footer spacing, typography and destinations are unchanged. No deployment was performed.

## Stack/journal spacing and homepage label — 16 October 2026

Removed the homepage “GURSHAN SIDHAR · COMPUTER SCIENCE” eyebrow. Reduced Tech Stack bottom padding to 24 px desktop / 18 px mobile and Frame by Frame top padding to 32 px / 26 px. Production build passes with 11 pre-rendered routes. Targeted checks at 1440, 1280, 768, 430, 375 and 320 px confirm the removed label, no horizontal overflow, no runtime errors, and a 57 px desktop / 45 px mobile gap between the stack index and journal heading wrapper. Updated transition screenshots are in `previews/stack-to-journal-1440.png` and `previews/stack-to-journal-375.png`. No deployment was performed.

## GitHub/Vercel release preparation — 16 October 2026

The owner authorized pushing all portfolio changes to GitHub for production deployment. Final checks pass: lint, ten integration tests, a CI-mode production build with all 11 pre-rendered routes, 72 responsive route checks, ten accessibility scans, nine interaction groups and 63 local asset checks, with no runtime/hydration errors. The dependency lockfile matches package.json. Original resume and gallery files are unchanged. The remote main branch matched the starting commit before release. README deployment instructions now correctly identify the repository root, rather than the local checkout folder name, as the Vercel project root.

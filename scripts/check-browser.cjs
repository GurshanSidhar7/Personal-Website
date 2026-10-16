/* Optional QA tooling: see docs/QA.md for installation and invocation. */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");
const { default: AxeBuilder } = require("@axe-core/playwright");
const root = path.resolve(__dirname, "..");
const base = process.env.PORTFOLIO_PREVIEW_URL || "http://127.0.0.1:4173";
const widths = [1440, 1280, 768, 430, 375, 320];
const routes = [
  "/",
  "/experience",
  "/projects",
  "/about",
  "/contact-me",
  "/projects/equity-options-analytics",
  "/projects/lucky-lease",
  "/projects/cvlens",
  "/projects/poke-pal",
  "/projects/portfolio-website",
  "/missing",
  "/projects/missing",
];
const output = path.join(root, "docs/previews");
fs.mkdirSync(output, { recursive: true });
(async () => {
  const browser = await chromium.launch(
    process.env.PORTFOLIO_BROWSER_PATH
      ? { executablePath: process.env.PORTFOLIO_BROWSER_PATH }
      : {},
  );
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const runtimeErrors = [];
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  page.on("console", (message) => {
    if (
      message.type() === "error" &&
      /hydration|didn't match|did not match/i.test(message.text())
    )
      runtimeErrors.push(message.text());
  });
  const report = {
    generatedAt: new Date().toISOString(),
    base,
    viewportChecks: [],
    accessibility: [],
    interactions: [],
    assets: [],
    runtimeErrors,
  };
  const assets = new Set();
  for (const width of widths) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of routes) {
      const response = await page.goto(base + route, { waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);
      const heading = await page.locator("main h1").innerText();
      assert(heading.trim(), `${route}: missing page heading`);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      );
      assert(!overflow, `${route} overflows at ${width}px`);
      if (route === "/") {
        const grid = await page.evaluate(
          () => getComputedStyle(document.body, "::before").backgroundSize,
        );
        assert(
          grid
            .split(", ")
            .every(
              (layer) => layer === (width <= 700 ? "48px 48px" : "64px 64px"),
            ),
        );
        assert.equal(
          await page.evaluate(
            () => getComputedStyle(document.body, "::before").position,
          ),
          "fixed",
        );
        assert.equal(await page.locator(".wordmark img").count(), 0);
        assert((await page.locator(".work-map").boundingBox()).height < 625);
        const footer = page.getByRole("contentinfo");
        const footerSize = await footer.boundingBox();
        assert.equal(
          await footer.evaluate(
            (element) => getComputedStyle(element).backgroundColor,
          ),
          "rgb(233, 228, 218)",
        );
        assert(
          footerSize.height <= (width <= 700 ? 110 : 80),
          `Footer is too tall at ${width}px: ${footerSize.height}`,
        );
        assert.equal(await footer.getByRole("link").count(), 5);
        assert.equal(
          await footer
            .getByRole("link", { name: "Email", exact: true })
            .getAttribute("href"),
          "mailto:gurshansidhar7@gmail.com",
        );
      }
      if (route === "/experience") {
        const dateSizes = await page
          .locator(".experience-date")
          .evaluateAll((dates) =>
            dates.map((date) => parseFloat(getComputedStyle(date).fontSize)),
          );
        assert(dateSizes.every((size) => size >= 12));
        assert(
          (await page.locator(".role-highlights").allTextContents())
            .join(" ")
            .includes("Saved time for a global HR team"),
        );
      }
      if (route === "/about") {
        const gap = await page.evaluate(
          () =>
            document
              .querySelector(".stack-section .section-heading")
              .getBoundingClientRect().top -
            document.querySelector(".about-profile").getBoundingClientRect()
              .bottom,
        );
        assert(
          gap <= 70,
          `Excess space above Tech Stack at ${width}px: ${gap}`,
        );
      }
      assert.equal(response.status(), route.includes("missing") ? 404 : 200);
      const canonical = await page
        .locator('link[rel="canonical"]')
        .getAttribute("href");
      assert.equal(canonical, "https://gurshansidhar.com" + route);
      for (const src of await page
        .locator("main img")
        .evaluateAll((imgs) => imgs.map((img) => img.getAttribute("src"))))
        assets.add(src);
      report.viewportChecks.push({
        width,
        route,
        status: response.status(),
        overflow: false,
      });
      if (
        (width === 1440 &&
          [
            "/",
            "/projects",
            "/experience",
            "/about",
            "/projects/equity-options-analytics",
            "/contact-me",
            "/missing",
          ].includes(route)) ||
        (width === 375 && ["/", "/about"].includes(route))
      ) {
        const result = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze();
        const violations = result.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        }));
        report.accessibility.push({ width, route, violations });
        assert.deepEqual(
          violations,
          [],
          `${route} accessibility violations at ${width}px: ${JSON.stringify(violations)}`,
        );
      }
      if (
        width === 1440 &&
        ["/", "/projects", "/experience", "/about"].includes(route)
      )
        await page.screenshot({
          path: path.join(
            output,
            `${route === "/" ? "home" : route.slice(1)}-desktop.png`,
          ),
          fullPage: false,
        });
      if (width === 375 && route === "/") {
        await page.screenshot({
          path: path.join(output, "home-mobile.png"),
          fullPage: false,
        });
        await page
          .locator(".work-map")
          .screenshot({ path: path.join(output, "work-explorer-mobile.png") });
      }
    }
  }
  console.log(
    `Passed ${report.viewportChecks.length} responsive route checks and ${report.accessibility.length} accessibility scans.`,
  );
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base + "/projects");
  assert.equal(await page.locator(".project-showcase").count(), 5);
  assert.equal(
    await page.getByRole("group", { name: "Filter projects" }).count(),
    0,
  );
  assert.equal(
    await page.getByRole("link", { name: "Live site", exact: true }).count(),
    4,
  );
  await page.getByRole("link", { name: "Explore LuckyLease" }).click();
  assert(page.url().endsWith("/projects/lucky-lease"));
  await page.reload();
  assert((await page.locator("main h1").innerText()).includes("LuckyLease"));
  await page.goBack();
  assert(page.url().endsWith("/projects"));
  report.interactions.push(
    "Complete project list, live-site actions, client navigation, nested refresh and browser Back",
  );
  await page.goto(base + "/");
  const explorer = page.getByRole("region", { name: "Follow the work" });
  await explorer.getByRole("tab", { name: "Data & analytics" }).focus();
  await page.keyboard.press("ArrowRight");
  assert(
    (await explorer.getByRole("tabpanel").innerText()).includes(
      "JONAS · AI ENABLEMENT INTERN",
    ),
  );
  await explorer
    .getByRole("link", { name: "Explore my Jonas experience" })
    .click();
  assert(page.url().endsWith("/experience#jonas-software"));
  await page.waitForFunction(() => {
    const top = document
      .getElementById("jonas-software")
      .getBoundingClientRect().top;
    return top >= 90 && top < innerHeight - 100;
  });
  await page.goto(base + "/");
  await explorer.getByRole("tab", { name: "Software" }).click();
  await explorer
    .getByRole("link", { name: "Explore the LuckyLease project" })
    .click();
  assert(page.url().endsWith("/projects/lucky-lease"));
  await page.goto(base + "/");
  report.interactions.push(
    "Curved work map: keyboard area selection, anchored experience navigation, and project navigation",
  );
  assert.equal(
    await page
      .getByRole("link", { name: "Explore my work" })
      .getAttribute("href"),
    "/experience",
  );
  assert.equal(
    await page
      .getByRole("link", { name: "Let’s connect" })
      .getAttribute("href"),
    "https://www.linkedin.com/in/gurshan-sidhar",
  );
  const footerHeight = await page
    .locator(".site-footer")
    .evaluate((e) => e.getBoundingClientRect().height);
  assert(footerHeight <= 80, `Footer is too tall: ${footerHeight}`);
  await page.getByRole("link", { name: "Explore my work" }).click();
  assert(page.url().endsWith("/experience"));
  const academics = await page.locator(".education-card").evaluate((card) => {
    const foundation = card
      .querySelector(".education-summary")
      .getBoundingClientRect();
    const coursework = card
      .querySelector(".coursework")
      .getBoundingClientRect();
    const boundary = card.getBoundingClientRect();
    return {
      sideBySide: coursework.left > foundation.right,
      insideCard:
        coursework.right <= boundary.right &&
        coursework.bottom <= boundary.bottom,
    };
  });
  assert(academics.sideBySide && academics.insideCard);
  report.interactions.push(
    "Experience and LinkedIn actions, compact footer, and coursework integrated inside the foundation card",
  );
  await page.goto(base + "/about");
  const info = page.getByRole("region", {
    name: "Personal details and favourite films",
  });
  assert((await info.innerText()).includes("English, French, Punjabi"));
  assert.equal(await info.getByRole("listitem").count(), 4);
  assert((await info.innerText()).includes("Perfect Blue"));
  report.interactions.push(
    "About: verified personal info and four favourite films below the portrait",
  );
  const stackBeforeJournal = await page.evaluate(() =>
    [...document.querySelectorAll("main h2")].map((e) =>
      e.textContent.replace(/\s+/g, " ").trim(),
    ),
  );
  assert(
    stackBeforeJournal.indexOf("Tech stack.") <
      stackBeforeJournal.indexOf("Frame by frame."),
  );
  const journal = page.getByRole("region", { name: "Frame by frame." });
  await journal
    .getByRole("button", { name: "Previous photograph", exact: true })
    .click();
  assert.equal(
    await journal.locator(".journal-aside .photo-caption h3").innerText(),
    "Looking Up",
  );
  await journal
    .getByRole("button", { name: "Next photograph", exact: true })
    .click();
  assert.equal(
    await journal.locator(".journal-aside .photo-caption h3").innerText(),
    "Late Night Runs",
  );
  await page.keyboard.press("ArrowRight");
  assert.equal(
    await journal.locator(".journal-aside .photo-caption h3").innerText(),
    "Ball of Fire",
  );
  assert.equal(await journal.getByRole("link").count(), 0);
  assert.equal(
    await journal
      .getByRole("button", { name: "Contact sheet", exact: true })
      .count(),
    0,
  );
  assert.equal(
    await journal.getByRole("button", { name: /Show photograph/ }).count(),
    12,
  );
  await journal
    .getByRole("button", { name: "Show photograph 10: Half Dome", exact: true })
    .click();
  const photoButton = journal.getByRole("button", {
    name: "Enlarge Half Dome",
    exact: true,
  });
  await photoButton.click();
  const lightbox = page.getByRole("dialog");
  assert(await lightbox.isVisible());
  const lightboxAxe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  assert.deepEqual(
    lightboxAxe.violations.map((v) => v.id),
    [],
  );
  await page.keyboard.press("ArrowRight");
  assert.equal(await lightbox.locator("h3").innerText(), "The Last Light");
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press("Tab");
    assert(
      await page.evaluate(
        () => document.activeElement.closest("dialog") !== null,
      ),
      "Focus escaped native dialog",
    );
  }
  await page.keyboard.press("Escape");
  assert(!(await lightbox.isVisible()));
  assert(
    await page
      .locator(".journal-photo")
      .evaluate((e) => e === document.activeElement),
    "Photo trigger focus was not restored",
  );
  report.interactions.push(
    "12-frame photo viewer, wraparound, arrow keys, thumbnails, modal focus trap, Escape and focus restoration; no music links or contact sheet",
  );
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto(base + "/");
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  assert.equal(
    await page
      .getByRole("button", { name: "Close", exact: true })
      .getAttribute("aria-expanded"),
    "true",
  );
  await page.keyboard.press("Escape");
  assert.equal(
    await page
      .getByRole("button", { name: "Menu", exact: true })
      .getAttribute("aria-expanded"),
    "false",
  );
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "About", exact: true })
    .click();
  assert(page.url().endsWith("/about"));
  assert.equal(
    await page
      .getByRole("button", { name: "Menu", exact: true })
      .getAttribute("aria-expanded"),
    "false",
  );
  report.interactions.push(
    "Mobile menu, Escape, route selection and automatic close",
  );
  const galleryResponse = await context.request.get(base + "/gallery", {
    maxRedirects: 0,
  });
  assert.equal(galleryResponse.status(), 301);
  assert.equal(galleryResponse.headers().location, "/about#photo-journal");
  await page.goto(base + "/gallery");
  assert(page.url().endsWith("/about#photo-journal"));
  report.interactions.push("Legacy gallery HTTP redirect and journal anchor");
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 900 },
    isMobile: true,
    hasTouch: true,
    reducedMotion: "reduce",
  });
  const mobile = await mobileContext.newPage();
  await mobile.goto(base + "/about#photo-journal");
  await mobile.locator(".journal-stage").scrollIntoViewIfNeeded();
  const box = await mobile.locator(".journal-photo").boundingBox();
  const cdp = await mobileContext.newCDPSession(mobile);
  const y = box.y + box.height / 2;
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x: box.x + box.width * 0.8, y }],
  });
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchMove",
    touchPoints: [{ x: box.x + box.width * 0.25, y }],
  });
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  await mobile.waitForFunction(
    () =>
      document.querySelector(".journal-aside h3").textContent ===
      "Ball of Fire",
  );
  await mobileContext.close();
  report.interactions.push(
    "Actual touch input swipes to the next journal frame",
  );
  assets.add("/Gurshan%20Sidhar%20Final%20Resume.pdf");
  assets.add("/fonts/manrope.ttf");
  assets.add("/fonts/instrument-serif.ttf");
  assets.add("/fonts/instrument-serif-italic.ttf");
  assets.add("/fonts/ibm-plex-mono.ttf");
  assets.add("/fonts/permanent-marker.ttf");
  assets.add("/social-card.png");
  assets.add("/icon.svg");
  assets.add("/brand-mark.svg");
  assets.add("/sitemap.xml");
  for (const folder of ["gallery_image", "media"]) {
    for (const file of fs.readdirSync(path.join(root, "public", folder)))
      assets.add(`/${folder}/${encodeURIComponent(file)}`);
  }
  for (const asset of assets) {
    const response = await context.request.get(base + asset);
    assert.equal(response.status(), 200, asset);
    report.assets.push({ path: asset, status: response.status() });
  }
  const noJs = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await noJs.newPage();
  await staticPage.goto(base + "/projects/cvlens");
  assert((await staticPage.locator("main").innerText()).includes("SpaCy"));
  await noJs.close();
  report.interactions.push("Readable case-study HTML with JavaScript disabled");
  assert.deepEqual(runtimeErrors, []);
  fs.writeFileSync(
    path.join(root, "docs/qa-results.json"),
    JSON.stringify(report, null, 2) + "\n",
  );
  console.log(
    JSON.stringify({
      viewportChecks: report.viewportChecks.length,
      accessibilityScans: report.accessibility.length + 1,
      interactionGroups: report.interactions.length,
      localAssets: report.assets.length,
      runtimeErrors,
    }),
  );
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});

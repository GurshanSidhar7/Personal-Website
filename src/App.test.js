import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { PortfolioContent } from "./App";
import { photos, projects, profile } from "./data/portfolio";

function visit(path = "/") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <PortfolioContent />
    </MemoryRouter>,
  );
}

beforeAll(() => {
  window.scrollTo = jest.fn();
  Element.prototype.scrollTo = jest.fn();
  Element.prototype.scrollIntoView = jest.fn();
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute("open");
  };
});

test("all five projects retain valid case-study routes and repository actions", () => {
  for (const project of projects) {
    const { unmount } = visit(`/projects/${project.slug}`);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: new RegExp(project.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view source/i })).toHaveAttribute(
      "href",
      project.github,
    );
    expect(
      screen
        .queryAllByRole("link", { name: /visit live project/i })
        .map((link) => link.getAttribute("href")),
    ).toEqual(project.live ? [project.live] : []);
    expect(screen.queryByText("WHAT CAME OUT OF IT")).not.toBeInTheDocument();
    unmount();
  }
});

test("project index presents every project without filters or counts", () => {
  visit("/projects");
  for (const project of projects)
    expect(
      screen.getByRole("link", { name: `Explore ${project.name}` }),
    ).toBeInTheDocument();
  expect(
    screen.queryByRole("group", { name: "Filter projects" }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByText(/PROJECT ARCHIVE|FIVE PROJECTS/),
  ).not.toBeInTheDocument();
});

test("home directs work exploration to experience", () => {
  visit();
  expect(
    screen.getByRole("tablist", { name: "Explore my work areas" }),
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Explore my work" })).toHaveAttribute(
    "href",
    "/experience",
  );
  expect(screen.getByRole("link", { name: "Let’s connect" })).toHaveAttribute(
    "href",
    profile.linkedin,
  );
});

test("curved work map switches areas by keyboard and links to the relevant work", () => {
  visit();
  const explorer = screen.getByRole("region", { name: "Follow the work" });
  const data = within(explorer).getByRole("tab", { name: "Data & analytics" });
  expect(data).toHaveAttribute("aria-selected", "true");
  expect(within(explorer).getAllByRole("tab")).toHaveLength(3);
  expect(
    within(explorer).getByRole("link", {
      name: "Explore my Yamaha experience",
    }),
  ).toHaveAttribute("href", "/experience#yamaha-motor-canada");
  fireEvent.keyDown(data, { key: "ArrowRight" });
  expect(
    within(explorer).getByRole("tab", { name: "Applied AI" }),
  ).toHaveFocus();
  expect(within(explorer).getByRole("tabpanel")).toHaveTextContent(
    "JONAS · AI ENABLEMENT INTERN",
  );
  expect(
    within(explorer).getByRole("link", { name: "Explore my Jonas experience" }),
  ).toHaveAttribute("href", "/experience#jonas-software");
  fireEvent.click(within(explorer).getByRole("tab", { name: "Software" }));
  expect(
    within(explorer).getByRole("link", {
      name: /Explore the LuckyLease project/,
    }),
  ).toHaveAttribute("href", "/projects/lucky-lease");
  fireEvent.keyDown(within(explorer).getByRole("tab", { name: "Software" }), {
    key: "Home",
  });
  expect(within(explorer).getByRole("tabpanel")).toHaveTextContent(
    "Python pipelines",
  );
  expect(
    within(explorer).getByRole("tab", { name: "Data & analytics" }),
  ).toHaveAttribute("aria-selected", "true");
});

test("About info card uses verified personal details and the owner's four films", () => {
  visit("/about");
  const card = screen.getByRole("region", {
    name: "Personal details and favourite films",
  });
  expect(card).toHaveTextContent("Wilfrid Laurier · BSc Honours CS");
  expect(card).toHaveTextContent("English, French, Punjabi");
  expect(
    within(card).getByRole("link", { name: profile.email }),
  ).toHaveAttribute("href", `mailto:${profile.email}`);
  expect(within(card).getAllByRole("listitem")).toHaveLength(4);
  for (const film of profile.favouriteFilms)
    expect(within(card).getByText(film)).toBeInTheDocument();
  expect(card).not.toHaveTextContent("Carleton");
  expect(card).not.toHaveTextContent("Ottawa");
});

test("incoming BMO role is distinguished from completed experience and resume remains accessible", () => {
  visit("/experience");
  const bmo = screen.getByRole("article", { name: "BMO Incoming role" });
  expect(within(bmo).getByText("Incoming")).toBeInTheDocument();
  expect(within(bmo).getByText("Winter 2027")).toBeInTheDocument();
  expect(within(bmo).queryByRole("list")).not.toBeInTheDocument();
  expect(
    screen.queryByRole("link", { name: /View my resume/i }),
  ).not.toBeInTheDocument();
  expect(
    within(
      screen.getByRole("navigation", { name: "Main navigation" }),
    ).getByRole("link", { name: "Resume" }),
  ).toHaveAttribute("href", profile.resume);
});

test("the photo viewer preserves all frames and supports enlargement without music or extra browsing modes", () => {
  visit("/about");
  expect(photos).toHaveLength(12);
  const journal = screen.getByRole("region", { name: "Frame by frame." });
  fireEvent.click(
    within(journal).getByRole("button", { name: "Next photograph" }),
  );
  expect(
    within(journal).getByRole("heading", { name: "Ball of Fire" }),
  ).toBeInTheDocument();
  expect(within(journal).queryAllByRole("link")).toHaveLength(0);
  expect(
    within(journal).queryByRole("button", { name: "Contact sheet" }),
  ).not.toBeInTheDocument();
  fireEvent.keyDown(
    within(journal).getByRole("button", { name: "Next photograph" }),
    { key: "ArrowLeft" },
  );
  expect(
    within(journal).getByRole("heading", { name: "Late Night Runs" }),
  ).toBeInTheDocument();
  expect(
    within(journal).getAllByRole("button", { name: /Show photograph/ }),
  ).toHaveLength(12);
  fireEvent.click(
    screen.getByRole("button", { name: "Show photograph 10: Half Dome" }),
  );
  const trigger = screen.getByRole("button", { name: "Enlarge Half Dome" });
  trigger.focus();
  fireEvent.click(trigger);
  const lightbox = screen.getByRole("dialog");
  expect(
    within(lightbox).getByRole("heading", { name: "Half Dome" }),
  ).toBeInTheDocument();
  const closeButton = within(lightbox).getByRole("button", {
    name: "Close photograph viewer",
  });
  const lastButton = within(lightbox).getByRole("button", {
    name: "Next enlarged photograph",
  });
  lastButton.focus();
  fireEvent.keyDown(lastButton, { key: "Tab" });
  expect(closeButton).toHaveFocus();
  fireEvent.keyDown(closeButton, { key: "Tab", shiftKey: true });
  expect(lastButton).toHaveFocus();
  fireEvent.click(
    within(lightbox).getByRole("button", { name: "Close photograph viewer" }),
  );
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(trigger).toHaveFocus();
});

test("mobile menu supports Escape and restores the menu button focus", () => {
  visit();
  const menu = screen.getByRole("button", { name: "Menu" });
  fireEvent.click(menu);
  expect(menu).toHaveAttribute("aria-expanded", "true");
  fireEvent.keyDown(document, { key: "Escape" });
  expect(menu).toHaveAttribute("aria-expanded", "false");
  expect(menu).toHaveFocus();
});

test("unknown project and page routes show a useful recovery path", () => {
  for (const route of ["/projects/missing", "/missing"]) {
    const { unmount } = visit(route);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /This path is uncharted/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to home" })).toHaveAttribute(
      "href",
      "/",
    );
    unmount();
  }
});

test("legacy gallery links reach the journal on the About page", () => {
  visit("/gallery");
  expect(
    screen.getByRole("region", { name: "Frame by frame." }),
  ).toBeInTheDocument();
});

import { TabMirror } from "@/lib/types";

/**
 * The four mirrors on the home screen. Clicking any mirror routes to its
 * corresponding tab. Order here determines the carousel order.
 */
export const TABS: TabMirror[] = [
  {
    id: "application",
    title: "Application",
    description: "The essays for the Anthropic Fellows Program.",
    imagePath: "/photos/application.png",
    aura: "essay",
    route: "/application",
  },
  {
    id: "research",
    title: "Research",
    description:
      "Studies in language modeling, education policy, and bio-imaging.",
    imagePath: "/photos/ngram.jpg",
    aura: "certification",
    route: "/research",
  },
  {
    id: "projects",
    title: "Projects",
    description: "Things I'm working on.",
    imagePath: "/photos/aspera.jpg",
    aura: "project",
    route: "/projects",
  },
  {
    id: "about",
    title: "About",
    description: "Contact, links, and a short note.",
    imagePath: "/photos/resume.jpg",
    aura: "resume",
    route: "/about",
  },
];

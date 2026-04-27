import { ProjectEntry } from "@/lib/types";

/**
 * Project entries shown on /projects, in display order.
 */
export const projects: ProjectEntry[] = [
  {
    id: "aspera",
    title: "Aspera",
    role: "Solo Builder",
    affiliation: "Claude Builder Club Hackathon, University of Michigan",
    dates: "Spring 2026",
    summary: `An AI-powered well-being app that fuses eight personal data streams (sleep, activity, heart rate, screen time, calendar, journal entries, location, and biometric trends) into a single Claude-powered context window for longitudinal pattern detection. Includes a Chrome extension that adds a friction layer on apps tied to negative behavioral patterns — the model recognizes the user's trajectory and intervenes contextually rather than via static blocks or timers. Methodologically the closest analog I've built to the kind of longitudinal multi-source behavioral analysis the Societal Impacts team does at scale. Won 2nd place at the Claude Builder Club Hackathon.`,
    links: [
      // TODO: add GitHub repo link if public
      // TODO: add demo video or screenshots link if available
    ],
    tags: ["Claude API", "Behavioral Data", "Chrome Extension", "Hackathon"],
  },
  {
    id: "modus-ai",
    title: "Modus AI",
    role: "Co-founder",
    affiliation: "Built with Hermann Baur, Antonio Colón, and James Harvey",
    dates: "Spring 2026 — ongoing",
    summary: `A curriculum-anchored AI tutoring platform built around a Socratic constraint: the model refuses to provide direct answers, offering only scaffolded hints, questions, and explanations grounded exclusively in the student's actual course materials. Designed to combat the erosion of critical thinking that comes from AI tools that one-shot assignments. University pilot lined up. Pitched at a hackathon under the "Future of Education" theme.`,
    links: [
      // TODO: add landing page or pilot info link if public
    ],
    tags: ["EdTech", "Claude API", "Socratic Method", "Co-founded"],
  },
];

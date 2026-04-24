import { DocumentMeta } from "@/lib/types";

export const DOCUMENTS: DocumentMeta[] = [
  {
    id: "resume",
    title: "Resume",
    category: "resume",
    description: "Coursework, roles, and shipped work.",
    filename: "resume.md",
    pdfPath: "/documents/resume.pdf",
    imagePath: "/photos/resume.jpg",
    aura: "resume",
    tags: ["experience", "skills", "education", "work", "projects", "leadership"],
    lastUpdated: "2026-04-01",
    featured: true,
    detailText:
      "Three years at Michigan EECS, projects that shipped, a Google certificate, and research work. A living document — updated as the story unfolds.",
  },
  {
    id: "transcript",
    title: "Transcript",
    category: "transcript",
    description: "Coursework from the University of Michigan, EECS.",
    filename: "transcript.md",
    pdfPath: "/documents/transcript.pdf",
    imagePath: "/photos/transcript.jpg",
    aura: "transcript",
    tags: ["courses", "grades", "GPA", "education", "university of michigan"],
    lastUpdated: "2026-04-01",
    featured: true,
    detailText:
      "Unofficial record of coursework from the University of Michigan — CS, Cognitive Science, Philosophy, Business.",
  },
  {
    id: "project-aspera",
    title: "Aspera",
    category: "project",
    description:
      "2nd place at the Claude Builder Club Hackathon — AI life optimizer built on Claude.",
    filename: "project-aspera.md",
    imagePath: "/photos/aspera.jpg",
    aura: "project",
    tags: ["AI", "machine learning", "React Native", "mobile", "Claude", "hackathon", "leadership"],
    lastUpdated: "2026-04-01",
    featured: true,
    detailText:
      "Second place for Best Use of Claude at the UMich Claude Builder Club Hackathon. Aspera fuses eight personal data streams into Claude's context to identify keystone habits.",
  },
  {
    id: "project-ngram",
    title: "N-Gram Language Model",
    category: "project",
    description:
      "Research presentation in Washington D.C. — Python + ML for language modeling.",
    filename: "project-ngram.md",
    imagePath: "/photos/ngram.jpg",
    aura: "certification",
    tags: ["ML", "NLP", "Python", "research", "S-STEM"],
    lastUpdated: "2023-05-01",
    featured: true,
    detailText:
      "Presented at the national S-STEM Scholars meeting in Washington D.C. — an n-gram language model in Python. Found that grammatical quality of training data mattered more than model order.",
  },
  {
    id: "google-cert",
    title: "Google IT Automation",
    category: "certification",
    description:
      "Google professional certificate completed through Michigan Online.",
    filename: "google-cert.md",
    aura: "certification",
    tags: ["google", "python", "automation", "certificate", "IT", "michigan online"],
    lastUpdated: "2026-04-01",
    detailText:
      "Google IT Automation with Python — completed through Michigan Online. Python scripting, Git, cloud configuration, and automation.",
  },
  {
    id: "essay-anthropic",
    title: "Application Essay",
    category: "essay",
    description: "Why I'm here, and where I hope to go next.",
    filename: "essay-anthropic.md",
    aura: "essay",
    tags: ["AI safety", "Anthropic", "motivation", "goals", "career"],
    lastUpdated: "2026-04-01",
    featured: true,
    detailText: "The why behind the work. Currently being rewritten.",
  },
];

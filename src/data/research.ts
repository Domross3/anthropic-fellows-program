import { ResearchEntry } from "@/lib/types";

/**
 * Research entries shown on /research, in display order.
 */
export const research: ResearchEntry[] = [
  {
    id: "ai-romantic-partners-study",
    title: "Moral Framing and Acceptance of AI Romantic Partners",
    role: "Independent Researcher",
    affiliation: "PSYCH 303: Research Methods, University of Michigan",
    dates: "Fall 2025",
    summary: `Designed and ran a between-groups experimental study (N=29) testing whether moral framing of human reproduction as environmentally harmful would increase acceptance of AI romantic partners. Participants in the moral-threat condition read an article on environmental consequences of having children; the control condition read a neutral article. Acceptance was measured across four Likert items, analyzed with independent-samples t-tests. The manipulation didn't move attitudes — baseline resistance to AI partners was uniformly high — but the project was hands-on practice in hypothesis-driven design on AI-human dynamics and in reporting null results honestly. The closest thing in my background to the empirical work the Societal Impacts team does.`,
    tags: ["Empirical Study", "AI-Human Interaction", "Cognitive Science"],
  },
  {
    id: "fitzpatrick-yre-meta-analysis",
    title: "Single-Track Year-Round Education Meta-Analysis",
    role: "Undergraduate Research Assistant",
    affiliation:
      "University of Michigan UROP — co-authored with Dan Fitzpatrick (Research and Assessment Specialist)",
    dates: "2022–2023",
    summary: `Co-authored a Campbell-style meta-analysis on whether single-track year-round education (YRE) — same instructional days as traditional calendars but with shorter, more frequent breaks — improves K-12 academic outcomes in U.S. schools. Screened 319 records through PRISMA-style identification, screening, and eligibility stages, ultimately synthesizing 5 studies (2017–2022) in the quantitative analysis. Effect sizes were positive but statistically insignificant for the recent window (Cohen's d = +.44 math, +.67 reading), reinforcing prior findings that YRE has positive but modest effects on student achievement. Concluded that policy makers should regard YRE as a useful but limited instrument for academic outcomes.`,
    tags: ["Meta-Analysis", "Education Policy", "Statistical Synthesis"],
  },
  {
    id: "lubensky-ilastik",
    title: "ML for Biological Image Segmentation",
    role: "Undergraduate Research Assistant",
    affiliation:
      "Lubensky Lab, Department of Physics, University of Michigan",
    dates: "Summer 2023", // confirm: was this 2023 or 2024?
    summary: `Worked in Professor David Lubensky's theoretical and computational biological physics lab on improving an ilastik segmentation model for detecting fruit fly wing morphology, part of the lab's broader research on pattern formation and morphogenesis. Completed Google's Machine Learning Crash Course in parallel and applied core concepts — training/validation/test split design, model evaluation, feature selection, hyperparameter tuning — to refine the model's performance on the lab's image data. First applied ML work in a research pipeline.`,
    links: [
      {
        label: "Lubensky Lab",
        url: "https://lsa.umich.edu/physics/people/faculty/dkluben.html",
      },
      {
        label: "Google ML Crash Course",
        url: "https://developers.google.com/machine-learning/crash-course",
      },
    ],
    tags: ["ML", "Computer Vision", "Research Assistant"],
  },
  {
    id: "ngram-language-model",
    title: "N-Gram Statistical Language Model",
    role: "MaCSS Scholar",
    affiliation:
      "Michigan Math and Computational Sciences (MaCSS) Scholars Program — supervised by Nina White",
    dates: "2022", // confirm dates
    summary: `Built a Markov-matrix-based statistical language generator from scratch, trained on Beatles lyrics and Steinbeck text. Implementation covered the conceptual foundations of modern language modeling — token transition probabilities, sampling strategies, training data effects on output style — without using any prebuilt NLP libraries. Predates current LLM work but on the same conceptual lineage; the project was my first exposure to thinking about what language models actually learn from data and how training corpus choice shapes generation.`,
    tags: ["NLP", "Statistical Modeling", "From Scratch"],
  },
];

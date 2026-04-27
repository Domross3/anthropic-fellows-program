import { ApplicationQuestion } from "@/lib/types";

/**
 * Application essay responses for the Anthropic Fellows Program.
 * Questions are rendered grouped by `section`. Order in this array is
 * the order shown on /application.
 */
export const application: ApplicationQuestion[] = [
  {
    id: "motivation",
    section: "Motivation & Fit",
    question: "Why are you interested in participating in the Fellows program?",
    prompt: "1-2 paragraphs",
    answer: `AI is the most consequential thing happening right now, and the window to study its effects empirically while still shaping them is narrowing fast. The Collingridge dilemma is no longer abstract: either we understand how these systems are reshaping labor, cognition, and society now, or we regulate a system that's already locked in. The Societal Impacts track is one of the few places doing that work with both rigor and direct access to the systems themselves.

I came to college pre-med, pivoted to computational cognitive science after a class on how language models actually understand language, and added CS as a second major because I was tired of being a passive user of tools I didn't understand. I've been using these systems since GPT-3, and I've watched my own coursework move from "AI can't do this assignment" to "AI one-shots it" in three years. That shift, multiplied across every student and every industry, is what I want to study at scale, and specifically where it intersects with how people form beliefs and judge what's real. My long-term aim is to work on the incentive structures and governance around these systems, but I think the people who'll do that well in ten years are the ones doing the empirical research now, not reading about it. The Fellows program is the fastest path I've found into that work.`,
  },
  {
    id: "research-area",
    section: "Motivation & Fit",
    question:
      "With your selected team(s) in mind, tell us briefly about one or more research areas you're excited about right now, and why.",
    prompt: "1 paragraph",
    answer: `We're approaching a regime where AI-generated text is no longer just persuasive but reliably indistinguishable from individual human voice given a few samples to imitate, and where a growing share of "human" writing is itself co-produced with these models. Anthropic's persuasion work showed AI arguments are already competitive with human ones on shifting views, and the Economic Index reports that writing and editing tasks make up over 10% of Claude.ai usage. Together this points to a convergence problem: the baseline of what counts as "human" writing is drifting toward AI, while AI is drifting toward us. My background in cognitive science (specifically on how first impressions and source authenticity shape belief formation) makes me want to study this empirically: how does AI-content detection accuracy vary and evolve across age, education, and political cohorts, and what countermeasures (provenance signals, calibration training, content labeling) actually move the needle? The next two to three years will set the baseline for how a generation learns to discern truth from synthesis. After that, the comparison class is gone.`,
  },
  {
    id: "background",
    section: "Motivation & Fit",
    question:
      "Please share any relevant background and provide links where possible (e.g., research experience, coursework, self-directed study, past roles, relevant projects).",
    prompt: "1 paragraph (optional)",
    answer: `My most AI-relevant empirical work is a research methods study (N=29, between-groups, t-tests across four Likert measures) on whether moral framing of reproduction shifts acceptance of AI romantic partners; the manipulation didn't move attitudes, but the project taught me to design hypothesis-driven work on AI-human dynamics and report null results cleanly. As a freshman I worked on a meta-analysis with Dan Fitzpatrick on single-track year-round education and K-12 achievement, screening 319 records and synthesizing 5 studies (Cohen's d = +.44 math, +.67 reading), concluding that YRE has positive but modest effects on academic outcomes. I've also worked as a research assistant training image segmentation models in David Lubensky's lab. My coursework spans cognitive science (decision processes, cognitive evolution, cognitive psychology, critical reasoning) and philosophy (ethics, minds and machines, emerging technologies); the philosophy coursework has been my north star for choosing what to work on. On the applied side, Aspera is a behavioral well-being app that fuses eight personal data streams into a Claude-powered context window for longitudinal pattern detection, methodologically the closest analog I've found to Societal Impacts research, and Modus AI is a Socratic tutor my team and I built to make learning accessible without doing the thinking for the student, refusing to provide any answers but providing tutoring based exclusively on course materials.`,
  },
  {
    id: "offer-acceptance",
    section: "Motivation & Fit",
    question:
      "How likely are you to accept a full-time offer at Anthropic if you receive one after the Fellows program?",
    prompt: "Brief explanation with % estimate",
    answer: `95%. Anthropic is the lab whose research priorities (alignment, interpretability, societal impacts) most align with where I want to spend my career, and the Fellows program itself is selection evidence that the work and mentorship would be substantively better than the alternatives I've considered (other frontier labs, governance orgs, grad school). The remaining 5% accounts for fit uncertainty I can't assess until I've actually done the work.`,
  },
  {
    id: "continued-safety-interest",
    section: "Motivation & Fit",
    question:
      "How likely are you to be interested in continuing to work on AI safety/security after the Fellows program?",
    prompt: "Brief explanation with % estimate",
    answer: `~95%. The Collingridge logic that drew me to apply doesn't expire when the program ends. If anything, the case for empirical work on AI's societal effects gets stronger as deployment scales. Whether I continue at Anthropic, at another lab, in academic research, or in governance work that's downstream of technical research, the question of how these systems are reshaping epistemics, labor, and institutions is what I want to spend the next decade on. The 5% gap is honest uncertainty about whether I'll discover I'm better positioned to contribute somewhere adjacent (policy, applied governance, science communication) rather than empirical research itself, but the safety/security domain is locked in.`,
  },
];

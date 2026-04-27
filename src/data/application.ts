import { ApplicationSection } from "@/lib/types";

/**
 * Application essay sections. Bodies are preserved verbatim from
 * /documents/essay-anthropic.md (currently HTML-comment placeholders);
 * the user fills these in directly.
 */
export const APPLICATION_SECTIONS: ApplicationSection[] = [
  {
    id: "personal-statement",
    heading: "Personal Statement",
    body: "<!-- Paste or write your personal statement / application essay for Anthropic here -->",
  },
  {
    id: "why-anthropic",
    heading: "Why Anthropic",
    body: "<!-- What draws you to Anthropic specifically? AI safety mission, research, culture, etc. -->",
  },
  {
    id: "relevant-experience",
    heading: "Relevant Experience",
    body: "<!-- Highlight the experience most relevant to this application -->",
  },
  {
    id: "goals",
    heading: "Goals",
    body: "<!-- What do you hope to accomplish at Anthropic? -->",
  },
];

import { AboutData } from "@/lib/types";

/**
 * About-tab content. The user fills in the paragraph, resume URL, and
 * GitHub/LinkedIn URLs. Email and personal site are filled in already.
 */
export const ABOUT: AboutData = {
  paragraph:
    "I am currently studying at the University of Michigan with majors in computer science and cognitive science (focusing on computation and decision) with minors in business, philosophy, and entrepreneurship.",
  email: "michros@umich.edu",
  resumeUrl: "TODO: Google Drive resume URL",
  links: [
    { label: "GitHub", url: "https://github.com/Domross3" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/dom-ross/" },
    { label: "Personal site", url: "https://domross.vercel.app/" },
  ],
};

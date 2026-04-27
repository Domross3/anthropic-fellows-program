import { AboutData } from "@/lib/types";

/**
 * About-tab content. The user fills in the paragraph, resume URL, and
 * GitHub/LinkedIn URLs. Email and personal site are filled in already.
 */
export const ABOUT: AboutData = {
  paragraph: "TODO: about paragraph",
  email: "michros@umich.edu",
  resumeUrl: "TODO: Google Drive resume URL",
  links: [
    { label: "GitHub", url: "TODO: GitHub URL" },
    { label: "LinkedIn", url: "TODO: LinkedIn URL" },
    { label: "Personal site", url: "https://domross.vercel.app" },
  ],
};

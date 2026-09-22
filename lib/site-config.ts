export const siteConfig = {
  name: "Kensa",
  tagline: "See deeper. Ship safer",
  description:
    "Kensa reviews every pull request with codebase context - correctness, security, performance, and more - posted right on GitHub.",
  contactEmail: "mailtoankitkumar01@gmail.com",
  url: "https://kensa.ankithub.me",
  githubInstallPath: "/dashboard/github",
  signInPath: "/sign-in",
  dashboardPath: "/dashboard",
} as const;

export function getContactMailto(subject = "Kensa Team plan") {
  return `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(subject)}`;
}

import type { About, SocialLinks } from "@/content/types";
import { parseMarkdownToObject } from "@/lib/markdownParser";
import aboutMd from "./about.md?raw";

const parsed = parseMarkdownToObject(aboutMd);

export const socialLinks: SocialLinks = parsed.socialLinks;
export const heroText: string = parsed.heroText;
export const about: About = parsed.about;

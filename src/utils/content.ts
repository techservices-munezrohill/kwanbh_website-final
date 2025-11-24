import matter from "gray-matter";

export type PageContent = {
  title?: string;
  slug?: string;
  source?: "cms" | "google-doc-embed" | "google-doc-fetch";
  googleDocId?: string;
  heroImage?: string;
  body?: string;
};

// Vite will include these files in the bundle and expose raw content
const pageFiles = import.meta.glob("../content/pages/*.md", { as: "raw", eager: true });

export async function loadPage(slug: string): Promise<PageContent | null> {
  const key = Object.keys(pageFiles).find((k) => k.endsWith(`${slug}.md`));
  if (!key) return null;
  const raw = pageFiles[key] as string;
  const parsed = matter(raw);
  const data = parsed.data as PageContent;
  const content = parsed.content.trim();
  return {
    ...data,
    body: content,
  };
}
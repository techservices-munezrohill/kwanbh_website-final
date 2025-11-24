import matter from "gray-matter";
+ import groq from "groq";
+ import { sanity } from "./sanityClient";
 
 export type PageContent = {
   title?: string;
   slug?: string;
   source?: "cms" | "google-doc-embed" | "google-doc-fetch";
   googleDocId?: string;
   heroImage?: string;
   body?: string;
 };
 
 export type Publication = {
   title: string;
   slug: string;
   authors?: string;
   journal?: string;
   year?: string;
   abstract?: string;
   pdfUrl?: string;
   fullUrl?: string;
   featured?: boolean;
   cover?: string;
 };
 
 // Vite will include these files in the bundle and expose raw content
 const pageFiles = import.meta.glob("../content/pages/*.md", { as: "raw", eager: true });
 const publicationFiles = import.meta.glob("../content/publications/*.md", { as: "raw", eager: true });
 
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
 
 export async function loadPublications(): Promise<Publication[]> {
+   // Prefer Sanity when configured, otherwise fall back to local markdown entries
+   if (sanity) {
+     const query = groq`*[_type == "publication"] | order(year desc){
+       title,
+       "slug": slug.current,
+       authors,
+       journal,
+       year,
+       abstract,
+       pdfUrl,
+       fullUrl,
+       featured,
+       "cover": cover.asset->url
+     }`;
+     const res = await sanity.fetch(query);
+     const items = (res as Publication[]).filter((p) => p.title && p.slug);
+     return items;
+   }
+
   const entries: Publication[] = [];
   for (const key of Object.keys(publicationFiles)) {
     const raw = publicationFiles[key] as string;
     const parsed = matter(raw);
     const data = parsed.data as Publication;
     const content = parsed.content?.trim();
     entries.push({ ...data, abstract: content || data.abstract });
   }
   return entries
     .filter((p) => p.title && p.slug)
     .sort((a, b) => {
       const ay = parseInt(a.year || "0", 10);
       const by = parseInt(b.year || "0", 10);
       return by - ay;
     });
 }
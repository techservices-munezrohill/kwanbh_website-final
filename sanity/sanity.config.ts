import { defineConfig } from 'sanity';
import { visionTool } from '@sanity/vision';
import { deskTool } from 'sanity/desk';
import Iframe from 'sanity-plugin-iframe-pane';
import { schemaTypes } from './schemas';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID || '';
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.VITE_SANITY_DATASET || 'production';

// Resolve preview URL for documents
const resolvePreviewUrl = (doc: any) => {
-  const base = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:5173/';
+  // Use explicit env if provided; otherwise fallback to production site
+  const base = process.env.SANITY_STUDIO_PREVIEW_URL || 'https://brianmugunga.github.io/kwanbh-website/';
   const basePath = process.env.SANITY_STUDIO_PREVIEW_BASEPATH || '';
   const normalize = (url: string) => (url.endsWith('/') ? url : url + '/');
   const root = normalize(base) + (basePath ? basePath.replace(/^\//, '').replace(/\/$/, '') + '/' : '');
 
   if (doc?._type === 'homePage') return root; // homepage
   if (doc?._type === 'page') {
     const slug = doc?.slug?.current || '';
     return slug ? root + slug : root;
   }
   return root;
 };

// Add a split view with an iframe preview for supported types
const defaultDocumentNode = (S: any, { schemaType }: { schemaType: string }) => {
  if (['homePage', 'page'].includes(schemaType)) {
    return S.document().views([
      S.view.form(),
      S.view
        .component(Iframe)
        .options({
          url: (doc: any) => resolvePreviewUrl(doc),
          reload: { button: true },
          showDisplayUrl: true,
        })
        .title('Preview'),
    ]);
  }
  return S.document().views([S.view.form()]);
};

export default defineConfig({
  name: 'default',
  title: 'Kwan Website Studio',
  projectId,
  dataset,
  plugins: [
    deskTool({ defaultDocumentNode }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
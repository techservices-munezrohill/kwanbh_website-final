import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { loadPage, PageContent, loadPublications, Publication } from "../utils/content";

const Publications: React.FC = () => {
  const [page, setPage] = useState<PageContent | null>(null);
  const [items, setItems] = useState<Publication[]>([]);

  useEffect(() => {
    (async () => {
      const [loadedPage, loadedItems] = await Promise.all([
        loadPage("publications"),
        loadPublications(),
      ]);
      setPage(loadedPage);
      setItems(loadedItems);
    })();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{page?.title ?? "Publications"}</h1>
      {page?.source === "google-doc-embed" && page.googleDocId ? (
        <div className="aspect-video w-full mb-8">
          <iframe
            title="Publications"
            src={`https://docs.google.com/document/d/${page.googleDocId}/preview`}
            className="w-full h-full border-0"
            allow="clipboard-write"
          />
        </div>
      ) : (
        <div className="prose max-w-none mb-8">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{page?.body ?? "Browse selected publications below."}</ReactMarkdown>
        </div>
      )}

      <div className="space-y-6">
        {items.map((p) => (
          <article key={p.slug} className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold">{p.title}</h2>
            <p className="text-sm text-gray-600">
              {[p.authors, p.journal, p.year].filter(Boolean).join(" • ")}
            </p>
            {p.abstract && (
              <p className="mt-2 text-gray-800">{p.abstract}</p>
            )}
            <div className="mt-3 flex gap-4">
              {p.pdfUrl && (
                <a className="text-blue-600 hover:underline" href={p.pdfUrl} target="_blank" rel="noreferrer">
                  PDF
                </a>
              )}
              {p.fullUrl && (
                <a className="text-blue-600 hover:underline" href={p.fullUrl} target="_blank" rel="noreferrer">
                  Full text
                </a>
              )}
            </div>
          </article>
        ))}
        {items.length === 0 && (
          <p className="text-gray-600">No publications available yet.</p>
        )}
      </div>
    </div>
  );
};

export default Publications;